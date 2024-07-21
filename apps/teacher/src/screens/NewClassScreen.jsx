import { useState } from 'react';
import { Dimensions, SafeAreaView, Text, View } from 'react-native';
import { Button, TextInput, Icon, useTheme } from 'react-native-paper';
import { showErrorToast, showSuccessToast } from '../helpers/showToast';
import { pickDocumentAsync } from '../helpers/pickDocument';
import useClasses from '../hooks/useClasses';
import globalStyles from '../utils/globalStyles';

export default function NewClassScreen() {
  const [className, setClassName] = useState('');
  const [students, setStudents] = useState(null);
  const [fileName, setFileName] = useState(null);

  const { createNewClass } = useClasses();
  const theme = useTheme();

  const handleUpload = async () => {
    const result = await pickDocumentAsync();

    if (!result) return;

    setStudents(result.data);
    setFileName(result.fileName);
  }

  const saveClass = async () => {
    if (!className || !students) {
      showErrorToast('Nome da turma e planilha de alunos são obrigatórios');
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
      showSuccessToast('Turma criada com sucesso');
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
      {
        !students ? (
          <View style={{ marginBottom: 20, padding: 10, borderWidth: 1, borderColor: theme.colors.outline, borderStyle: 'dashed'}}>
            <Icon
              source="file-outline"
              size={150}
              color={theme.colors.onSurface}
            />
            <Text style={{ textAlign: 'center' }}>Planilha não lida</Text>
          </View>
        )
          :
          (
            <View style={{ marginBottom: 20, padding: 10, borderWidth: 2, borderColor: theme.colors.primary, borderStyle: 'solid'}}>
              <Icon
                source="file-excel"
                size={150}
                color={theme.colors.primary}
              />
              <Text style={{ textAlign: 'center' }}>{fileName}</Text>
            </View>
          )
      }

      <TextInput 
      label="Nome" 
      placeholder="Nome do questionário" 
      value={className} 
      onChangeText={setClassName} 
      style={{ width: Dimensions.get('window').width * 0.5 }}/>

      <Button mode="contained" style={{ marginVertical: 10 }} onPress={handleUpload}>Ler planilha de questões</Button>
      
      <Button mode="contained" style={{ marginVertical: 10 }} onPress={saveClass}>Salvar Turma</Button>
    </SafeAreaView>
  );
}