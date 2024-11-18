import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "O ID do centro é obrigatório" });
  }

  try {
    await prisma.centroDoacao.delete({
      where: { id },
    });

    return res.status(200).json({ message: "Centro excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir centro:", error);
    return res.status(500).json({ message: "Erro ao excluir o centro de doação" });
  }
}
