import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { showErrorToast, showSuccessToast } from '../helpers/showToast';
import { pickDocumentAsync } from '../helpers/pickDocument';
import useClasses from '../hooks/useClasses';
import globalStyles from '../utils/globalStyles';

export default function NewClassScreen() {
  const [className, setClassName] = useState('');
  const [students, setStudents] = useState(null);
  const [fileName, setFileName] = useState(null);

  const { createNewClass } = useClasses();
  const theme = useTheme()

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
      <Text variant="titleSmall" theme={{ colors: theme.colors.onBackground }}>{!fileName ? 'Planilha não lida' : fileName}</Text>
      <TextInput label="Nome" placeholder="Nome da turma" value={className} onChangeText={setClassName} />
      <Button mode="contained" style={{ marginVertical: 10 }} onPress={handleUpload}>Ler planilha de alunos</Button>
      <Button mode="contained" style={{ marginVertical: 10 }} onPress={saveClass}>Salvar turma</Button>
    </SafeAreaView>
  )
}