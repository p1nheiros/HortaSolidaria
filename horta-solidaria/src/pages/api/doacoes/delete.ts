import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "ID da doação é obrigatório" });
  }

  try {
    await prisma.doacao.delete({
      where: { id },
    });
    return res.status(200).json({ message: "Doação excluída com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir doação:", error);
    return res.status(500).json({ message: "Erro ao excluir a doação" });
  }
}
