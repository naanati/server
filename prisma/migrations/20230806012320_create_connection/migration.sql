-- CreateTable
CREATE TABLE "Posto" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "unidade" TEXT NOT NULL,

    CONSTRAINT "Posto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medicamentos" (
    "id" TEXT NOT NULL,
    "postoId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "quantidade" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Medicamentos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Posto_cpf_key" ON "Posto"("cpf");

-- AddForeignKey
ALTER TABLE "Medicamentos" ADD CONSTRAINT "Medicamentos_postoId_fkey" FOREIGN KEY ("postoId") REFERENCES "Posto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
