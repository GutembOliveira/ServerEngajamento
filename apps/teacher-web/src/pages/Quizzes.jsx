import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, CardActionArea, CardActions, Typography, Grid, Button, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import quizImage from '../assets/quiz.jpeg';

const fabStyle = {
    position: 'absolute',
    bottom: 30,
    right: 30
};

const quizzes = [
    {
        id: 1,
        image: quizImage,
        name: 'Quiz',
        description: 'Quiz Teste'
    },
    {
        id: 2,
        image: quizImage,
        name: 'Quiz',
        description: 'Quiz Teste'
    },
    {
        id: 3,
        image: quizImage,
        name: 'Quiz',
        description: 'Quiz Teste'
    }
]

export default function Quizzes() {
    return (
        <div>
            <h2>Meus Quizzes</h2>

            <Grid container spacing={2}>

            {
                quizzes.map(quiz => (
                    <Grid item xs={4} key={quiz.id}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={quiz.image}
                                    alt="Quiz"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {quiz.name}
                                    </Typography>

                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {quiz.description}
                                    </Typography>

                                </CardContent>
                            </CardActionArea>

                            <CardActions>
                                <Button size="small" color="primary" component={Link} to='/lobby'>
                                    Iniciar Quiz
                                </Button>
                            </CardActions>
                        </Card>

                    </Grid>
                ))
            }
            </Grid>

            <Fab color="secondary" aria-label="novo quiz" sx={fabStyle} LinkComponent={Link} to='/quizzes/new'>
                <AddIcon />
            </Fab>

        </div>
    )
}