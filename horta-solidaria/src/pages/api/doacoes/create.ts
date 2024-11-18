import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { idUsuario, idCentro, item, valor, quantidade, dataDoacao, status } = req.body;

  // Validação básica dos campos obrigatórios
  if (!idUsuario || !idCentro || !item || !quantidade || !dataDoacao) {
    return res.status(400).json({
      message: "Todos os campos obrigatórios devem ser preenchidos.",
    });
  }

  // Conversão e validação dos dados
  const quantidadeConvertida = parseInt(quantidade, 10);
  const valorConvertido = parseFloat(valor) || 0;
  const dataConvertida = new Date(dataDoacao);

  if (isNaN(quantidadeConvertida) || quantidadeConvertida <= 0) {
    return res.status(400).json({
      message: "A quantidade deve ser um número positivo.",
    });
  }

  if (isNaN(valorConvertido)) {
    return res.status(400).json({
      message: "O valor deve ser um número válido.",
    });
  }

  if (isNaN(dataConvertida.getTime())) {
    return res.status(400).json({
      message: "A data da doação deve ser válida.",
    });
  }

  try {
    // Criação da doação no banco de dados
    const novaDoacao = await prisma.doacao.create({
      data: {
        idUsuario,
        idCentro,
        item,
        valor: valorConvertido,
        quantidade: quantidadeConvertida,
        dataDoacao: dataConvertida,
        status: status || "pendente",
      },
    });

    return res.status(201).json(novaDoacao);
  } catch (error) {
    console.error("Erro ao criar doação:", error);
    return res.status(500).json({
      message: "Erro ao criar a doação.",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    });
  }
}
