import { Button, FormControl, FormLabel, Grid, OutlinedInput } from "@mui/material";
import Dropzone from '../components/Dropzone';
import { Save } from '@mui/icons-material';

const saveQuiz = () => {
    console.log('SALVEI O QUIZ');
}

export default function NewQuiz() {
    return (
        <div>
            <h2>Novo questionário</h2>

            <Grid container direction="column" spacing={3}>
                <Grid item xs={4}>
                    <FormControl>
                        <FormLabel htmlFor="class-name">Nome do questionário</FormLabel>
                        <OutlinedInput id="class-name" name="class-name" type="name" placeholder="Nome do questionário" aria-describedby="nome-da-turma" required size="small" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <Dropzone />
                </Grid>

                <Grid item xs={4}>
                    <Button
                        variant="contained"
                        startIcon={<Save/>}
                        onClick={saveQuiz}>
                        Salvar Questionário
                    </Button>
                </Grid>

            </Grid>

        </div>
    )
}
