import React, { useEffect, useState } from "react";
import Spinner from './components/Spinner'
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState({
    totalDoacoes: 0,
    centrosCadastrados: 0,
    usuariosAtivos: 0,
    valorTotalDoado: 0, // Certifique-se que é inicializado como 0
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/dashboard/data");
      const data = await res.json();
      setDashboardData(data);
    };
    fetchData();
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Spinner />
      </div>
    );
  }
  

  const data = {
    labels: ["Doações", "Centros", "Usuários"],
    datasets: [
      {
        label: "Dados do Sistema",
        data: [
          dashboardData.totalDoacoes,
          dashboardData.centrosCadastrados,
          dashboardData.usuariosAtivos,
        ],
        backgroundColor: ["#4CAF50", "#2196F3", "#FFC107"],
        borderColor: ["#388E3C", "#1976D2", "#FFA000"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Resumo do Sistema",
      },
    },
  };

  return (
    <div className="h-full bg-gray-100">
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-black text-2xl font-bold mb-4">
          Bem-vindo(a), {session?.user?.nome || "Usuário"}!
        </h1>

        {/* Blocos de Resumo */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700">Total de Doações</h3>
            <p className="text-2xl font-bold text-green-600">
              {dashboardData.totalDoacoes}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700">Centros Cadastrados</h3>
            <p className="text-2xl font-bold text-blue-600">
              {dashboardData.centrosCadastrados}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700">Usuários Ativos</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {dashboardData.usuariosAtivos}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700">Total de Valor Doado</h3>
            <p className="text-2xl font-bold text-purple-600">
              R${" "}
              {(dashboardData.valorTotalDoado || 0).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>

        {/* Gráfico */}
        <div className=" bg-white shadow rounded-lg p-6 w-4/5 mx-auto">
          <h2 className="text-gray-700 text-xl font-semibold mb-4">Resumo do Sistema</h2>
          <Bar data={data} options={options} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
