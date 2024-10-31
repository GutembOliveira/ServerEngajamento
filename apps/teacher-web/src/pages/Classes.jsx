import { Card, CardContent, CardMedia, CardActionArea, Typography, Grid, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import classImage from '../assets/class.jpeg';
import { Link } from 'react-router-dom';

const fabStyle = {
    position: 'absolute',
    bottom: 30,
    right: 30
};

const classes = [
    {
        id: 1,
        image: classImage,
        name: 'Turma',
        description: 'Turma Teste'
    },
    {
        id: 2,
        image: classImage,
        name: 'Turma',
        description: 'Turma Teste'
    },
    {
        id: 3,
        image: classImage,
        name: 'Turma',
        description: 'Turma Teste'
    }
]


export default function Classes(){
    return(
        <div>
            <h2>Minhas turmas</h2>

            <Grid container spacing={2}>

                {
                    classes.map(classObject => (
                        <Grid item xs={4} key={classObject.id}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={classObject.image}
                                        alt="Turma"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            { classObject.name }
                                        </Typography>

                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            { classObject.description }
                                        </Typography>

                                    </CardContent>
                                </CardActionArea>
                            </Card>

                        </Grid>
                    ))
                }
            </Grid>

            <Fab color="secondary" aria-label="novo quiz" sx={fabStyle} LinkComponent={Link} to='/classes/new'>
                <AddIcon />
            </Fab>
        </div>
    )
}