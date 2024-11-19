import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      senha,
      redirect: true,
      callbackUrl: "/dashboard",
    });

    if (res?.error) {
      alert("Erro ao fazer login: " + res.error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-green-600">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
            <Image
            src="/icon.svg"
            alt="Horta Solidária"
            width={52}
            height={52}
            />
          <h1 className="mt-3 text-2xl font-bold text-gray-700 mb-2">
            Horta Solidária
          </h1>
          <p className="text-sm text-gray-500 mb-6">Bem vindo(a) de volta</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-green-300"
              placeholder="exemplo@edu.unifil.br"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="senha" className="block text-sm text-gray-600 mb-1">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-green-300"
              placeholder="********"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Login
          </button>
        </form>
        <div className="flex items-center my-4">
          <hr className="w-full border-gray-300" />
          <span className="px-2 text-gray-400">ou</span>
          <hr className="w-full border-gray-300" />
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Ainda não tem uma conta?{" "}
            <Link href="/register" className="text-green-600 hover:text-green-500">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
