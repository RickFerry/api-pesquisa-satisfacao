import { Router } from 'express';
import { criarPesquisa, atualizarPesquisa, preencherPesquisa, listarPreenchimentosPorPublico, exportarPreenchimentosCSV } from '../controllers/pesquisaController';

const router = Router();

router.post('/', criarPesquisa);
router.put('/:id', atualizarPesquisa);
router.post('/responder', preencherPesquisa);
router.get('/preenchimentos', listarPreenchimentosPorPublico);
router.get('/exportar-csv', exportarPreenchimentosCSV);

export default router;
