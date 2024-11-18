import React, { useState } from "react";
import { FaChevronDown, FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react"; // Import do signOut

const Sidebar = () => {
  const [isDoacoesOpen, setIsDoacoesOpen] = useState(false);
  const [isCentrosOpen, setIsCentrosOpen] = useState(false);

  const toggleDoacoes = () => setIsDoacoesOpen(!isDoacoesOpen);
  const toggleCentros = () => setIsCentrosOpen(!isCentrosOpen);

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "/login" }); // Redireciona para a página de login
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
    }
  };  

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="rounded-b-lg flex items-center justify-between px-5 py-5 bg-gradient-to-br from-white to-green-200">
          <img className="h-11 w-10" src="/icon.svg" alt="icon.svg" />
          <h1 className="text-2xl text-black font-bold">Horta Solidária</h1>
        </div>

        <nav className="flex-1 px-4 py-6">
          <ul>
            {/* Dashboard */}
            <li>
              <a
                href="/dashboard"
                className="block py-2 px-3 rounded hover:bg-gray-700"
              >
                Dashboard
              </a>
            </li>

{/* Centros */}
<li>
              <button
                onClick={toggleCentros}
                className="w-full flex items-center justify-between py-2 px-3 rounded hover:bg-gray-700"
              >
                <span>Centros</span>
                <FaChevronDown
                  className={`transition-transform transform ${
                    isCentrosOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {isCentrosOpen && (
                <ul className="pl-4 mt-2 space-y-2">
                  <li>
                    <a
                      href="/centros/cadastrar"
                      className="block py-1 px-3 rounded hover:bg-gray-700"
                    >
                      Cadastrar Centros
                    </a>
                  </li>
                  <li>
                    <a
                      href="/centros/listar"
                      className="block py-1 px-3 rounded hover:bg-gray-700"
                    >
                      Centros Cadastrados
                    </a>
                  </li>
                </ul>
              )}
            </li>

            {/* Doações */}
            <li>
              <button
                onClick={toggleDoacoes}
                className="w-full flex items-center justify-between py-2 px-3 rounded hover:bg-gray-700"
              >
                <span>Doações</span>
                <FaChevronDown
                  className={`transition-transform transform ${
                    isDoacoesOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {isDoacoesOpen && (
                <ul className="pl-4 mt-2 space-y-2">
                  <li>
                    <a
                      href="/doacoes/cadastrar"
                      className="block py-1 px-3 rounded hover:bg-gray-700"
                    >
                      Realizar Doação
                    </a>
                  </li>
                  <li>
                    <a
                      href="/doacoes/listar"
                      className="block py-1 px-3 rounded hover:bg-gray-700"
                    >
                      Doações Realizadas
                    </a>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>

        {/* Logout */}
        <div className="px-4 py-3">
          <button
            onClick={handleLogout} // Chama a função de logout
            className="w-full flex items-center justify-center py-2 px-4 bg-red-600 rounded hover:bg-red-700"
          >
            <FaSignOutAlt className="mr-2" /> Sair
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
