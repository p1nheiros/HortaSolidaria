import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        senha: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        // Verifica se o usuário existe no banco
        const user = await prisma.usuario.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) {
          throw new Error("Usuário não encontrado!");
        }

        // Verifica se a senha está correta
        const isValid = await bcrypt.compare(
          credentials!.senha,
          user.senha
        );

        if (!isValid) {
          throw new Error("Senha inválida!");
        }

        return { id: user.id, email: user.email, nome: user.nome };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        nome: token.nome as string,
      };
      return session;
    },    
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.nome = user.nome;
      }
      return token;
    },    
  },
  secret: process.env.NEXTAUTH_SECRET,
});