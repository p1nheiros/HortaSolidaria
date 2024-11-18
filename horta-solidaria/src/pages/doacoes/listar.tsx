import { useState, useEffect } from "react";
import Spinner from '../components/Spinner';

interface Doacao {
  id: string;
  usuario: string;
  centro: string;
  item: string;
  valor: number;
  quantidade: number;
  dataDoacao: string;
  status: string;
}

export default function ListarDoacoes() {
  const [doacoes, setDoacoes] = useState<Doacao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [notificacao, setNotificacao] = useState<string | null>(null);
  const [modalExclusao, setModalExclusao] = useState<{ id: string | null; usuario: string | null }>(
    { id: null, usuario: null }
  );
  const [editando, setEditando] = useState<string | null>(null);
  const [alteracoes, setAlteracoes] = useState<Partial<Doacao>>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const [doacoesRes, usuariosRes, centrosRes] = await Promise.all([
          fetch("/api/doacoes/list"),
          fetch("/api/usuarios/list"),
          fetch("/api/centros/list"),
        ]);

        const [doacoesData] = await Promise.all([
          doacoesRes.json(),
          usuariosRes.json(),
          centrosRes.json(),
        ]);

        setDoacoes(doacoesData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        exibirNotificacao("Erro ao carregar dados.");
      } finally {
        setCarregando(false);
      }
    }

    fetchData();
  }, []);

  const exibirNotificacao = (mensagem: string) => {
    setNotificacao(mensagem);
    setTimeout(() => setNotificacao(null), 3000);
  };

  const abrirModalExclusao = (id: string, usuario: string) => {
    setModalExclusao({ id, usuario });
  };

  const fecharModalExclusao = () => {
    setModalExclusao({ id: null, usuario: null });
  };

  const handleDelete = async () => {
    if (!modalExclusao.id) return;

    try {
      const res = await fetch(`/api/doacoes/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: modalExclusao.id }),
      });

      if (res.ok) {
        setDoacoes((prev) => prev.filter((doacao) => doacao.id !== modalExclusao.id));
        exibirNotificacao("Doação excluída com sucesso!");
      } else {
        exibirNotificacao("Erro ao excluir doação.");
      }
    } catch (error) {
      console.error("Erro ao excluir doação:", error);
      exibirNotificacao("Erro ao excluir doação.");
    } finally {
      fecharModalExclusao();
    }
  };

  const handleSave = async (id: string) => {
    const doacaoAlterada = { ...alteracoes, id };

    try {
      const res = await fetch("/api/doacoes/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doacaoAlterada),
      });

      if (res.ok) {
        setDoacoes((prev) =>
          prev.map((doacao) =>
            doacao.id === id ? { ...doacao, ...alteracoes } : doacao
          )
        );
        exibirNotificacao("Doação atualizada com sucesso!");
      } else {
        exibirNotificacao("Erro ao atualizar doação.");
      }
    } catch (error) {
      console.error("Erro ao atualizar doação:", error);
      exibirNotificacao("Erro ao atualizar doação.");
    } finally {
      setEditando(null);
      setAlteracoes({});
    }
  };

  const handleChange = (
    field: keyof Doacao,
    value: string | number
  ) => {
    setAlteracoes((prev) => ({ ...prev, [field]: value }));
  };

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r bg-gray-200 p-4">
      {notificacao && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 rounded shadow-md">
          {notificacao}
        </div>
      )}
      {modalExclusao.id && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-lg font-bold mb-4 text-gray-700">Excluir Doação</h2>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir a doação de <strong>{modalExclusao.usuario}</strong>?
            </p>
            <div className="flex justify-between">
              <button
                onClick={fecharModalExclusao}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Doações Cadastradas
        </h1>
        {doacoes.length === 0 ? (
          <p className="text-center text-gray-500">Nenhuma doação cadastrada.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 border-gray-300 p-4 text-left text-gray-600">Usuário</th>
                <th className="border-b-2 border-gray-300 p-4 text-left text-gray-600">Centro</th>
                <th className="border-b-2 border-gray-300 p-4 text-left text-gray-600">Item</th>
                <th className="border-b-2 border-gray-300 p-4 text-left text-gray-600">Valor</th>
                <th className="border-b-2 border-gray-300 p-4 text-left text-gray-600">Quantidade</th>
                <th className="border-b-2 border-gray-300 p-4 text-left text-gray-600">Data</th>
                <th className="border-b-2 border-gray-300 p-4 text-left text-gray-600">Status</th>
                <th className="border-b-2 border-gray-300 p-4 text-left text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody>
              {doacoes.map((doacao) => (
                <tr key={doacao.id} className="hover:bg-gray-100">
                  {editando === doacao.id ? (
                    <>
                      <td className="text-black border-b border-gray-300 p-4">
                        {doacao.usuario}
                      </td>
                      <td className="text-black border-b border-gray-300 p-4">
                        {doacao.centro}
                      </td>
                      <td className="text-black border-b border-gray-300 p-4">
                        {doacao.item}
                      </td>
                      <td className="text-black border-b border-gray-300 p-4">
                        <input
                          type="number"
                          value={alteracoes.valor ?? doacao.valor}
                          onChange={(e) =>
                            handleChange("valor", Number(e.target.value))
                          }
                          className="w-full px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="text-black border-b border-gray-300 p-4">
                        <input
                          type="number"
                          value={alteracoes.quantidade ?? doacao.quantidade}
                          onChange={(e) =>
                            handleChange("quantidade", Number(e.target.value))
                          }
                          className="w-full px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="text-black border-b border-gray-300 p-4">
                        {doacao.dataDoacao}
                      </td>
                      <td className="text-black border-b border-gray-300 p-4">
                        <select
                          value={alteracoes.status ?? doacao.status}
                          onChange={(e) => handleChange("status", e.target.value)}
                          className="w-full px-2 py-1 border rounded"
                        >
                          <option value="pendente">Pendente</option>
                          <option value="concluido">Concluído</option>
                          <option value="cancelado">Cancelado</option>
                        </select>
                      </td>
                      <td className="text-black border-b border-gray-300 p-4">
                        <button
                          onClick={() => handleSave(doacao.id)}
                          className="text-green-500 hover:text-green-700 mr-2"
                        >
                          Salvar
                        </button>
                        <button
                          onClick={() => setEditando(null)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          Cancelar
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="text-black border-b border-gray-300 p-4">{doacao.usuario}</td>
                      <td className="text-black border-b border-gray-300 p-4">{doacao.centro}</td>
                      <td className="text-black border-b border-gray-300 p-4">{doacao.item}</td>
                      <td className="text-black border-b border-gray-300 p-4">{doacao.valor}</td>
                      <td className="text-black border-b border-gray-300 p-4">{doacao.quantidade}</td>
                      <td className="text-black border-b border-gray-300 p-4">{doacao.dataDoacao}</td>
                      <td className="text-black border-b border-gray-300 p-4">{doacao.status}</td>
                      <td className="text-black border-b border-gray-300 p-4">
                        <button
                          onClick={() => setEditando(doacao.id)}
                          className="text-blue-500 hover:text-blue-700 mr-2"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => abrirModalExclusao(doacao.id, doacao.usuario)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Excluir
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
