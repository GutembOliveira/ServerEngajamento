import { Button, Grid } from "@mui/material"

const students = [
    {
        id: 1,
        name: 'Guilherme'
    },
    {
        id: 2,
        name: 'Gutemberg'
    },
    {
        id: 3,
        name: 'João Gabriel'
    },
    {
        id: 4,
        name: 'Thalys'
    }
]

export default function Lobby(){
    return(
        <div>
            <h2>Alunos conectados</h2>

            <Grid container direction="column" spacing={2}>

            {
                students.map(student => (
                    <Grid item xs={4} key={student.id}>
                        <h4>{student.id} - {student.name}</h4>
                    </Grid>
                ))
            }

            <Button
            sx={{ marginTop: '1rem', width: '50%' }}
            variant="contained"
            >Iniciar questionário</Button>

            </Grid>
        </div>

    )
}