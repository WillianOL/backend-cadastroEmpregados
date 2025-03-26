-- CreateTable
CREATE TABLE "Empregado" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "idade" TEXT NOT NULL,
    "dataAdicao" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,

    CONSTRAINT "Empregado_pkey" PRIMARY KEY ("id")
);
