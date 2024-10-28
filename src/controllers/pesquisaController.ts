import { Request, Response } from 'express';
import prisma from '../models/prismaClient';

export const criarPesquisa = async (req: Request, res: Response) => {
  const { publicoAlvo, estrelas, email } = req.body;
  const novaPesquisa = await prisma.pesquisa.create({
    data: { publicoAlvo, estrelas, email },
  });
  res.status(201).json(novaPesquisa);
};

export const atualizarPesquisa = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { publicoAlvo, estrelas, email } = req.body;
  
    const pesquisaExistente = await prisma.pesquisa.findUnique({ where: { id: Number(id) } });
    if (!pesquisaExistente) {
      return res.status(404).json({ error: 'Pesquisa não encontrada' });
    }
  
    const pesquisaAtualizada = await prisma.pesquisa.update({
      where: { id: Number(id) },
      data: { publicoAlvo, estrelas, email },
    });
  
    res.json(pesquisaAtualizada);
  };
  
  export const preencherPesquisa = async (req: Request, res: Response) => {
    const { pesquisaId, conteudo } = req.body;
  
    const pesquisa = await prisma.pesquisa.findUnique({ where: { id: Number(pesquisaId) } });
    if (!pesquisa) {
      return res.status(404).json({ error: 'Pesquisa não encontrada' });
    }
  
    const resposta = await prisma.resposta.create({
      data: { conteudo, pesquisaId: pesquisa.id },
    });
  
    res.status(201).json(resposta);
  };
  
  export const listarPreenchimentosPorPublico = async (req: Request, res: Response) => {
    const { publicoAlvo, ordem } = req.query;
  
    const preenchimentos = await prisma.pesquisa.findMany({
      where: { publicoAlvo: String(publicoAlvo) },
      include: { respostas: true },
      orderBy: { estrelas: ordem === 'desc' ? 'desc' : 'asc' },
    });
  
    res.json(preenchimentos);
  };
  
  import { exportarParaCSV } from '../utils/csvExporter';

export const exportarPreenchimentosCSV = async (req: Request, res: Response) => {
  const preenchimentos = await prisma.pesquisa.findMany({ include: { respostas: true } });

  await exportarParaCSV(preenchimentos);
  res.download('preenchimentos.csv');
};
