import { Button, FormControl, FormLabel, Grid, OutlinedInput } from "@mui/material";
import Dropzone from "../components/Dropzone";
import { Save } from '@mui/icons-material';

const saveClass = () => {
    console.log('SALVEI A TURMA');
}

export default function NewClass() {
    return (
        <div>
            <h2>Nova turma</h2>

            <Grid container direction="column" spacing={3}>
                <Grid item xs={4}>
                    <FormControl>
                        <FormLabel htmlFor="class-name">Nome da turma</FormLabel>
                        <OutlinedInput id="class-name" name="class-name" type="name" placeholder="Nome da turma" aria-describedby="nome-da-turma" required size="small" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                   <Dropzone />
                </Grid>

                <Grid item xs={4}>
                    <Button 
                    variant="contained"
                    startIcon={<Save/>}
                    onClick={saveClass}>
                        Salvar Turma
                    </Button>
                </Grid>

            </Grid>

        </div>
    )
}
