import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { id, nome, endereco, itensAceitos } = req.body;

  if (!id || !nome || !endereco || !itensAceitos) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });
  }

  try {
    const centroAtualizado = await prisma.centroDoacao.update({
      where: { id },
      data: {
        nome,
        endereco,
        itensAceitos,
      },
    });

    return res.status(200).json({ message: "Centro atualizado com sucesso", centro: centroAtualizado });
  } catch (error) {
    console.error("Erro ao atualizar centro:", error);
    return res.status(500).json({ message: "Erro ao atualizar o centro de doação" });
  }
}
