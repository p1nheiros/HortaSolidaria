import { useEffect, useState } from "react";
import Spinner from '../components/Spinner';

interface CentroDoacao {
  id: string;
  nome: string;
  endereco: string;
  itensAceitos: string[];
}

export default function ListarCentros() {
  const [centros, setCentros] = useState<CentroDoacao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [notificacao, setNotificacao] = useState<string | null>(null);
  const [modalExclusao, setModalExclusao] = useState<{ id: string | null; nome: string | null }>({
    id: null,
    nome: null,
  });
  const [editando, setEditando] = useState<string | null>(null);
  const [alteracoes, setAlteracoes] = useState<Partial<CentroDoacao>>({});

  useEffect(() => {
    async function fetchCentros() {
      try {
        const res = await fetch("/api/centros/list");
        const data = await res.json();
        setCentros(data);
      } catch (error) {
        console.error("Erro ao buscar centros:", error);
      } finally {
        setCarregando(false);
      }
    }
    fetchCentros();
  }, []);

  const exibirNotificacao = (mensagem: string) => {
    setNotificacao(mensagem);
    setTimeout(() => setNotificacao(null), 3000);
  };

  const abrirModalExclusao = (id: string, nome: string) => {
    setModalExclusao({ id, nome });
  };

  const fecharModalExclusao = () => {
    setModalExclusao({ id: null, nome: null });
  };

  const handleDelete = async () => {
    if (!modalExclusao.id) return;

    try {
      const res = await fetch("/api/centros/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: modalExclusao.id }),
      });

      if (res.ok) {
        setCentros((prev) => prev.filter((centro) => centro.id !== modalExclusao.id));
        exibirNotificacao("Centro excluído com sucesso!");
      } else {
        exibirNotificacao("Erro ao excluir o centro.");
      }
    } catch (error) {
      console.error("Erro ao excluir centro:", error);
      exibirNotificacao("Erro ao excluir o centro.");
    } finally {
      fecharModalExclusao();
    }
  };

  const handleSave = async (id: string) => {
    const centroAlterado = {
      id,
      nome: alteracoes.nome ?? centros.find((c) => c.id === id)?.nome,
      endereco: alteracoes.endereco ?? centros.find((c) => c.id === id)?.endereco,
      itensAceitos: alteracoes.itensAceitos ?? centros.find((c) => c.id === id)?.itensAceitos,
    };

    try {
      const res = await fetch("/api/centros/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(centroAlterado),
      });

      if (res.ok) {
        setCentros((prev) =>
          prev.map((centro) =>
            centro.id === id
              ? { ...centro, ...alteracoes }
              : centro
          )
        );
        exibirNotificacao("Centro atualizado com sucesso!");
      } else {
        exibirNotificacao("Erro ao salvar alterações.");
      }
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      exibirNotificacao("Erro ao salvar alterações.");
    } finally {
      setEditando(null);
      setAlteracoes({});
    }
  };

  const handleCancel = () => {
    setEditando(null);
    setAlteracoes({});
  };

  const handleChange = (
    field: keyof CentroDoacao,
    value: string | string[],
    id: string
  ) => {
    if (id === editando) {
      setAlteracoes((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleAddItem = () => {
    setAlteracoes((prev) => ({
      ...prev,
      itensAceitos: [...(prev.itensAceitos || []), ""],
    }));
  };

  const handleRemoveItem = (index: number) => {
    setAlteracoes((prev) => ({
      ...prev,
      itensAceitos: (prev.itensAceitos || []).filter((_, i) => i !== index),
    }));
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
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-md">
          {notificacao}
        </div>
      )}
      {modalExclusao.id && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-lg font-bold mb-4 text-gray-700">Excluir Centro</h2>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir o centro <strong>{modalExclusao.nome}</strong>?
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
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Centros de Doação Cadastrados
        </h1>
        {centros.length === 0 ? (
          <p className="text-center text-gray-500">
            Nenhum centro de doação cadastrado.
          </p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 border-gray-300 p-4 text-left text-gray-600">Nome</th>
                <th className="border-b-2 border-gray-300 p-4 text-left text-gray-600">Endereço</th>
                <th className="border-b-2 border-gray-300 p-4 text-left text-gray-600">Itens Aceitos</th>
                <th className="border-b-2 border-gray-300 p-4 text-left text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody>
              {centros.map((centro) => (
                <tr key={centro.id} className="hover:bg-gray-100">
                  <td className="text-black border-b border-gray-300 p-4">
                    {editando === centro.id ? (
                      <input
                        type="text"
                        value={alteracoes.nome ?? centro.nome}
                        onChange={(e) => handleChange("nome", e.target.value, centro.id)}
                        className="w-full px-2 py-1 border rounded"
                      />
                    ) : (
                      centro.nome
                    )}
                  </td>
                  <td className="text-black border-b border-gray-300 p-4">
                    {editando === centro.id ? (
                      <input
                        type="text"
                        value={alteracoes.endereco ?? centro.endereco}
                        onChange={(e) => handleChange("endereco", e.target.value, centro.id)}
                        className="w-full px-2 py-1 border rounded"
                      />
                    ) : (
                      centro.endereco
                    )}
                  </td>
                  <td className="text-black border-b border-gray-300 p-4">
                    {editando === centro.id ? (
                      <div>
                        {(alteracoes.itensAceitos || centro.itensAceitos).map((item, index) => (
                          <div key={index} className="flex items-center mb-2">
                            <input
                              type="text"
                              value={item}
                              onChange={(e) =>
                                handleChange(
                                  "itensAceitos",
                                  (alteracoes.itensAceitos || centro.itensAceitos).map((i, iIndex) =>
                                    iIndex === index ? e.target.value : i
                                  ),
                                  centro.id
                                )
                              }
                              className="w-full px-2 py-1 border rounded mr-2"
                            />
                            <button
                              onClick={() => handleRemoveItem(index)}
                              className="px-2 py-1 text-red-500 hover:text-red-700"
                            >
                              Remover
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={handleAddItem}
                          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2"
                        >
                          Adicionar Item
                        </button>
                      </div>
                    ) : (
                      centro.itensAceitos.join(", ")
                    )}
                  </td>
                  <td className="border-b border-gray-300 p-4">
                    {editando === centro.id ? (
                      <>
                        <button
                          onClick={() => handleSave(centro.id)}
                          className="text-green-500 hover:text-green-700 mr-2"
                        >
                          Salvar
                        </button>
                        <button
                          onClick={handleCancel}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setEditando(centro.id)}
                          className="text-blue-500 hover:text-blue-700 mr-2"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => abrirModalExclusao(centro.id, centro.nome)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Excluir
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
