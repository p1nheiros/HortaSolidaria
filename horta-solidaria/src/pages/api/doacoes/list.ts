import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  try {
    const doacoes = await prisma.doacao.findMany({
      include: {
        Usuario: { select: { nome: true } },
        Centro: { select: { nome: true } },
      },
    });

    const resposta = doacoes.map((doacao) => ({
      id: doacao.id,
      usuario: doacao.Usuario.nome,
      centro: doacao.Centro.nome,
      item: doacao.item,
      valor: doacao.valor,
      quantidade: doacao.quantidade,
      dataDoacao: doacao.dataDoacao.toISOString().split("T")[0],
      status: doacao.status,
    }));

    return res.status(200).json(resposta);
  } catch (error) {
    console.error("Erro ao listar doações:", error);
    return res.status(500).json({ message: "Erro ao listar doações." });
  }
}
