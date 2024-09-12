import { Button, Container, Grid } from "@mui/material"
import { Link } from "react-router-dom"

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
        <Container sx={{ textAlign: 'center'}} >
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
            sx={{ margin: '1rem auto', width: '50%' }}
            variant="contained"
            LinkComponent={Link}
            to="/question">
                Iniciar questionário
            </Button>

            </Grid>
        </Container >

    )
}