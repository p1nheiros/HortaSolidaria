-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nivel" TEXT NOT NULL DEFAULT 'usuario',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CentroDoacao" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "itensAceitos" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CentroDoacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doacao" (
    "id" TEXT NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "idCentro" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "dataDoacao" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Doacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Doacao" ADD CONSTRAINT "Doacao_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doacao" ADD CONSTRAINT "Doacao_idCentro_fkey" FOREIGN KEY ("idCentro") REFERENCES "CentroDoacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
