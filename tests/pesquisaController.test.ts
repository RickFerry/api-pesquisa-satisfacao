import request from 'supertest';
import app from '../src/app';

describe('Teste de criação de pesquisa', () => {
  it('Deve criar uma nova pesquisa', async () => {
    const res = await request(app).post('/pesquisas').send({
      publicoAlvo: 'Geeks',
      estrelas: 5,
      email: 'exemplo@teste.com',
    });
    expect(res.statusCode).toEqual(201);
  });
});

describe('Teste de preenchimento de pesquisa', () => {
    it('Deve preencher uma pesquisa existente', async () => {
      const novaPesquisa = await request(app).post('/pesquisas').send({
        publicoAlvo: 'Minimalistas',
        estrelas: 4,
        email: 'teste@minimal.com',
      });
  
      const resposta = await request(app).post('/pesquisas/responder').send({
        pesquisaId: novaPesquisa.body.id,
        conteudo: 'Ótima qualidade!',
      });
  
      expect(resposta.statusCode).toEqual(201);
      expect(resposta.body).toHaveProperty('conteudo', 'Ótima qualidade!');
    });
  });
  