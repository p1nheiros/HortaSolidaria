import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { nome, endereco, itensAceitos } = req.body;

  if (!nome || !endereco || !itensAceitos) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });
  }

  try {
    const novoCentro = await prisma.centroDoacao.create({
      data: {
        nome,
        endereco,
        itensAceitos,
      },
    });
    return res.status(201).json({ message: "Centro de doação criado com sucesso", centro: novoCentro });
  } catch (error) {
    console.error("Erro ao criar centro:", error);
    return res.status(500).json({ message: "Erro ao criar o centro de doação" });
  }
}
