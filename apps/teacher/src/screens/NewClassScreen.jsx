import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';

import { showErrorToast, showSuccessToast } from '../helpers/showToast';
import { pickDocumentAsync } from '../helpers/pickDocument';
import useClasses from '../hooks/useClasses';
import globalStyles from '../utils/globalStyles';

export default function NewClassScreen() {
  const [className, setClassName] = useState('');
  const [students, setStudents] = useState(null);
  const [fileName, setFileName] = useState(null);

  const { createNewClass } = useClasses();

  const handleUpload = async () => {
    const result = await pickDocumentAsync();

    if (!result) return;

    setStudents(result.data);
    setFileName(result.fileName);
  }

  const saveClass = async () => {
    if (!className || !students) {
      showErrorToast('Nome da turma e planilha de alunos são obrigatórios')
      return;
    }
    
    const savedStudents = students.map(([id, name, email]) => ({
      id,
      name,
      email
    }));

    createNewClass({
      name: className,
      students: savedStudents
    })
    .then(function (response) {
      showSuccessToast('Turma criada com sucesso')
      setClassName('');
      setStudents(null);
      setFileName(null);
    })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <TextInput label="Nome" placeholder="Nome da turma" value={className} onChangeText={setClassName} />
      <Text variant="titleSmall">{!fileName ? 'Planilha não lida' : fileName}</Text>
      <Button onPress={handleUpload}>Ler planilha de alunos</Button>
      <Button onPress={saveClass}>Salvar turma</Button>
    </SafeAreaView>
  )
}