import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [notificacao, setNotificacao] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      setNotificacao("As senhas não coincidem.");
      return;
    }

    setCarregando(true);
    setNotificacao(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await res.json();

      if (res.ok) {
        setNotificacao("Cadastro realizado com sucesso! Redirecionando...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setNotificacao(data.message || "Erro ao registrar usuário.");
      }
    } catch (error) {
      console.error("Erro ao registrar:", error);
      setNotificacao("Erro ao registrar usuário. Tente novamente mais tarde.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-green-600">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <img
            src="/icon.svg"
            alt="Horta Solidária"
            className="w-16 h-16 mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-700 mb-2">
            Horta Solidária
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Crie uma conta para acessar o sistema
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          {notificacao && (
            <div
              className={`mb-4 text-sm text-center p-2 rounded-lg shadow-md ${
                notificacao.includes("sucesso")
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {notificacao}
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="nome" className="block text-sm text-gray-600 mb-1">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-green-300"
              placeholder="Seu nome completo"
              required
            />
          </div>
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
          <div className="mb-4">
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
          <div className="mb-4">
            <label
              htmlFor="confirmarSenha"
              className="block text-sm text-gray-600 mb-1"
            >
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmarSenha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-green-300"
              placeholder="********"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
            disabled={carregando}
          >
            {carregando ? "Cadastrando..." : "Registrar"}
          </button>
        </form>
        <div className="flex items-center my-4">
          <hr className="w-full border-gray-300" />
          <span className="px-2 text-gray-400">ou</span>
          <hr className="w-full border-gray-300" />
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Já tem uma conta?{" "}
            <a href="/login" className="text-green-600 hover:text-green-500">
              Entrar
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
