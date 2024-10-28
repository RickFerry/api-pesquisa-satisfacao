import { createObjectCsvWriter } from 'csv-writer';

export const exportarParaCSV = async (data: any[]) => {
  const csvWriter = createObjectCsvWriter({
    path: 'preenchimentos.csv',
    header: [
      { id: 'publicoAlvo', title: 'Público Alvo' },
      { id: 'estrelas', title: 'Estrelas' },
      { id: 'email', title: 'Email' },
    ],
  });
  await csvWriter.writeRecords(data);
};
