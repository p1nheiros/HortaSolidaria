import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { id, usuario, centro, item, valor, quantidade, status } = req.body;

  if (!id) {
    return res.status(400).json({ message: "O ID da doação é obrigatório." });
  }

  try {
    const doacaoExistente = await prisma.doacao.findUnique({
      where: { id },
    });

    if (!doacaoExistente) {
      return res.status(404).json({ message: "Doação não encontrada." });
    }

    const atualizacao = {
      ...(usuario && { idUsuario: usuario }),
      ...(centro && { idCentro: centro }),
      ...(item && { item }),
      ...(valor && { valor: parseFloat(valor) }),
      ...(quantidade && { quantidade: parseInt(quantidade, 10) }),
      ...(status && { status }),
    };

    const doacaoAtualizada = await prisma.doacao.update({
      where: { id },
      data: atualizacao,
    });

    return res.status(200).json(doacaoAtualizada);
  } catch (error) {
    console.error("Erro ao atualizar doação:", error);
    return res.status(500).json({ message: "Erro ao atualizar a doação." });
  }
}
