import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      // Consultas no banco de dados
      const totalDoacoes = await prisma.doacao.count();
      const centrosCadastrados = await prisma.centroDoacao.count();
      const usuariosAtivos = await prisma.usuario.count();
      const valorTotalDoado = await prisma.doacao.aggregate({
        _sum: {
          valor: true,
        },
      });
      // Resposta da API
      res.status(200).json({
        totalDoacoes,
        centrosCadastrados,
        usuariosAtivos,
        valorTotalDoado: valorTotalDoado._sum.valor || 0,
      });
    } catch (error) {
      console.error("Erro ao buscar dados do Dashboard:", error);
      res.status(500).json({ error: "Erro ao buscar os dados do Dashboard" });
    }
  } else {
    // Responde com método não permitido se não for GET
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
