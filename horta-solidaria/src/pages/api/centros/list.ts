import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  try {
    const centros = await prisma.centroDoacao.findMany({
      select: {
        id: true,
        nome: true,
        itensAceitos: true,
      },
    });
    return res.status(200).json(centros);
  } catch (error) {
    console.error("Erro ao listar centros:", error);
    return res.status(500).json({ message: "Erro ao listar centros." });
  }
}
