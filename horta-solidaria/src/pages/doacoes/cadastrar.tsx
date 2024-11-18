import { useState, useEffect } from "react";

interface Usuario {
  id: string;
  nome: string;
}

interface CentroDoacao {
  id: string;
  nome: string;
  endereco: string;
  itensAceitos: string[];
}

export default function CadastrarDoacao() {
  const [formData, setFormData] = useState({
    idUsuario: "",
    idCentro: "",
    item: "",
    valor: "",
    quantidade: "",
    dataDoacao: "",
    status: "pendente",
  });
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [centros, setCentros] = useState<CentroDoacao[]>([]);
  const [itensCentro, setItensCentro] = useState<string[]>([]);
  const [notificacao, setNotificacao] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const res = await fetch("/api/usuarios/list");
        const data = await res.json();
        setUsuarios(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    }

    async function fetchCentros() {
      try {
        const res = await fetch("/api/centros/list");
        const data = await res.json();
        setCentros(data);
      } catch (error) {
        console.error("Erro ao buscar centros:", error);
      }
    }

    fetchUsuarios();
    fetchCentros();
  }, []);

  useEffect(() => {
    const centroSelecionado = centros.find((centro) => centro.id === formData.idCentro);
    setItensCentro(Array.isArray(centroSelecionado?.itensAceitos) ? centroSelecionado.itensAceitos : []);
  }, [formData.idCentro, centros]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const exibirNotificacao = (mensagem: string) => {
    setNotificacao(mensagem);
    setTimeout(() => setNotificacao(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/doacoes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        exibirNotificacao(`Erro: ${errorData.message}`);
        return;
      }

      exibirNotificacao("Doação cadastrada com sucesso!");
      setFormData({
        idUsuario: "",
        idCentro: "",
        item: "",
        valor: "",
        quantidade: "",
        dataDoacao: "",
        status: "pendente",
      });
    } catch (error) {
      console.error("Erro ao cadastrar doação:", error);
      exibirNotificacao("Erro ao cadastrar doação.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r bg-gray-200 flex items-center justify-center">
      {notificacao && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 rounded shadow-md border border-gray-300">
          {notificacao}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">
          Cadastrar Doação
        </h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Usuário</label>
          <select
            name="idUsuario"
            value={formData.idUsuario}
            onChange={handleChange}
            required
            className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          >
            <option className="text-gray-400" value="">Selecione um usuário</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Centro</label>
          <select
            name="idCentro"
            value={formData.idCentro}
            onChange={handleChange}
            required
            className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          >
            <option className="text-gray-400" value="">Selecione um centro</option>
            {centros.map((centro) => (
              <option key={centro.id} value={centro.id}>
                {centro.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Item</label>
          <select
            name="item"
            value={formData.item}
            onChange={handleChange}
            required
            className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          >
            <option className="text-gray-400" value="">Selecione um item</option>
            {itensCentro.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Valor</label>
          <input
            type="number"
            name="valor"
            value={formData.valor}
            onChange={handleChange}
            required
            className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            placeholder="Valor da doação"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Quantidade</label>
          <input
            type="number"
            name="quantidade"
            value={formData.quantidade}
            onChange={handleChange}
            required
            className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            placeholder="Quantidade"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Data da Doação</label>
          <input
            type="date"
            name="dataDoacao"
            value={formData.dataDoacao}
            onChange={handleChange}
            required
            className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
