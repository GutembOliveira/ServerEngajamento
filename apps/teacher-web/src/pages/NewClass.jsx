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

const saveClass = () => {
    console.log('SALVEI A TURMA');
}

export default function NewClass() {
    return (
        <div>
            <h2>Nova turma</h2>

            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <FormControl>
                        <FormLabel htmlFor="class-name">Nome da turma</FormLabel>
                        <OutlinedInput id="class-name" name="class-name" type="name" placeholder="Nome da turma" aria-describedby="nome-da-turma" required size="small" />
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
                        Ler planilha de alunos
                        <VisuallyHiddenInput
                            type="file"
                            onChange={(event) => console.log(event.target.files)}
                        />
                    </Button>
                </Grid>

                <Grid item xs={4}>
                    <Button 
                    variant="contained"
                    onClick={saveClass}>
                        Salvar Turma
                    </Button>
                </Grid>

            </Grid>

        </div>
    )
}

//Area pra subir planilha
//Botão pra salvar