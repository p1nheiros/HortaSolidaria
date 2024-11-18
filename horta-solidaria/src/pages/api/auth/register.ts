import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Método não permitido!" });
    }

    const { nome, email, senha } = req.body;

    // Validação básica
    if (!nome || !email || !senha) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
    }

    // Verifica se o usuário já existe
    const existingUser = await prisma.usuario.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Usuário já existe!" });
    }

    // Criptografa a senha
    const hashedSenha = await bcrypt.hash(senha, 10);

    // Cria o usuário (sem atribuir a variável)
    await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: hashedSenha,
      },
    });

    return res.status(201).json({ message: "Usuário criado com sucesso!" });
  } catch (error: unknown) {
    console.error("Erro ao registrar usuário:", error);

    if (typeof error === "object" && error !== null && "code" in error) {
      const prismaError = error as { code: string };
      if (prismaError.code === "P2002") {
        return res.status(409).json({ message: "Email já está em uso!" });
      }
    }

    return res.status(500).json({ message: "Erro ao criar usuário. Tente novamente mais tarde." });
  } finally {
    await prisma.$disconnect();
  }
}
