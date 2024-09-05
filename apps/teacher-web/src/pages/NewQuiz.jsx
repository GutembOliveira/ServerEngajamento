import { Button, FormControl, FormHelperText, FormLabel, Grid, Input, InputLabel, OutlinedInput, styled } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const saveQuiz = () => {
    console.log('SALVEI O QUIZ');
}

export default function NewQuiz() {
    return (
        <div>
            <h2>Novo questionário</h2>

            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <FormControl>
                        <FormLabel htmlFor="class-name">Nome do questionário</FormLabel>
                        <OutlinedInput id="class-name" name="class-name" type="name" placeholder="Nome do questionário" aria-describedby="nome-da-turma" required size="small" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        Ler planilha de questões
                        <VisuallyHiddenInput
                            type="file"
                            onChange={(event) => console.log(event.target.files)}
                        />
                    </Button>
                </Grid>

                <Grid item xs={4}>
                    <Button 
                    variant="contained"
                    onClick={saveQuiz}>
                        Salvar Questionário
                    </Button>
                </Grid>

            </Grid>

        </div>
    )
}
