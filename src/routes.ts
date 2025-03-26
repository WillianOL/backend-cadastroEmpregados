import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const allRoutes = express.Router();
const prismaClient = new PrismaClient();

type Empregado = {
  nome: string;
  idade: string;
  cargo: string;
  dataAdicao: string;
  id: number;
};

// C
allRoutes.post('/empregados', async (req: Request, res: Response) => {
  const { nome, cargo, dataAdicao, idade }: Empregado = req.body;
  const empregado = await prismaClient.empregado.create({
    data: {
      nome,
      cargo,
      dataAdicao,
      idade,
    },
  });
  res.status(201).json(empregado);
});

// R
allRoutes.get('/empregados', async (req: Request, res: Response) => {
  const empregado = await prismaClient.empregado.findMany();
  res.status(200).json(empregado);
});

// U
allRoutes.put('/empregados', async (req: Request, res: Response) => {
  const { nome, id, cargo, idade }: Empregado = req.body;

  if (!id) {
    res.status(400).json({ error: 'ID é obrigatório' });
  }

  const empregadoExiste = await prismaClient.empregado.findUnique({
    where: {
      id,
    },
  });

  if (!empregadoExiste) {
    res.status(404).json({ error: 'Empregado não existe' });
  }

  const empregado = await prismaClient.empregado.update({
    where: {
      id,
    },
    data: {
      nome,
      cargo,
      idade,
    },
  });
  res.status(200).json(empregado);
});

// D
allRoutes.delete('/empregados/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const intId = parseInt(id);

  if (!intId) {
    res.status(400).json({ error: 'ID é obrigatório' });
  }

  const empregadoExiste = await prismaClient.empregado.findUnique({
    where: {
      id: intId,
    },
  });

  if (!empregadoExiste) {
    res.status(404).json({ error: 'Empregado não existe' });
  }

  await prismaClient.empregado.delete({ where: { id: intId } });

  res.status(200).send('Empregado deletado');
});

export { allRoutes };
