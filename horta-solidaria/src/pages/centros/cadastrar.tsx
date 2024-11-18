import { useState } from "react";
import { useRouter } from "next/router";

export default function CadastrarCentro() {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [itensAceitos, setItensAceitos] = useState<string[]>([""]);
  const [mensagem, setMensagem] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/centros/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          endereco,
          itensAceitos: itensAceitos.filter((item) => item.trim() !== ""),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMensagem("Centro de doação criado com sucesso!");
        setNome("");
        setEndereco("");
        setItensAceitos([""]);
        setTimeout(() => router.push("/centros/listar"), 2000);
      } else {
        setMensagem(data.message || "Erro ao criar centro");
      }
    } catch (error) {
      console.error("Erro ao criar centro:", error);
      setMensagem("Erro ao criar centro");
    }
  };

  const handleAddItem = () => {
    setItensAceitos([...itensAceitos, ""]);
  };

  const handleRemoveItem = (index: number) => {
    setItensAceitos(itensAceitos.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, value: string) => {
    const newItens = [...itensAceitos];
    newItens[index] = value;
    setItensAceitos(newItens);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Cadastrar Centro de Doação
        </h2>
        {mensagem && (
          <p
            className={`text-sm mb-4 ${
              mensagem.includes("sucesso")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {mensagem}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Nome do centro"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Endereço</label>
            <input
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Endereço completo"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">
              Itens Aceitos
            </label>
            {itensAceitos.map((item, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleItemChange(index, e.target.value)}
                  className="text-black flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ex: alimentos, roupas"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddItem}
              className="text-green-500 hover:text-green-700 mt-2"
            >
              + Adicionar Item
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
