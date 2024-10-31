import { getDocumentAsync } from 'expo-document-picker';
import { readAsStringAsync } from 'expo-file-system';
import { read, utils } from 'xlsx';

export const pickDocumentAsync = async () => {
  try {
    let result = await getDocumentAsync({
      type: [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
        "application/vnd.oasis.opendocument.spreadsheet"
      ]
    });

    const temp = await readAsStringAsync(result.assets[0].uri, {
      encoding: 'base64'
    });

    const workbook = read(temp, { type: 'base64' });

    const wsName = workbook.SheetNames[0];
    const ws = workbook.Sheets[wsName];

    //Array de objetos
    //const data = utils.sheet_to_json(ws);

    //Array de arrays
    const data = utils.sheet_to_json(ws, { header: 1 });

    return {
      fileName: result.assets[0].name,
      data
    };

  } catch (e) {
    console.log('Error:', e);
  }
}