import { SafeAreaView, Text } from 'react-native';
import { useState } from 'react';
import { showErrorToast, showSuccessToast } from '../helpers/showToast';
import { pickDocumentAsync } from '../helpers/pickDocument';
import useClasses from '../hooks/useClasses';
import globalStyles from '../utils/globalStyles';
import Button from '../components/Button';
import Input from '../components/Input';
import theme from '../theme';

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
      <Input onChangeText={setClassName} value={className} placeholder="Nome da turma" />
      <Text style={globalStyles.text}>{!fileName ? 'Planilha não lida' : fileName}</Text>
      <Button text="Ler planilha de alunos" onPress={handleUpload} />
      <Button text="Salvar turma" onPress={saveClass} />
    </SafeAreaView>
  )
}