import { Card, CardContent, CardMedia, CardActionArea, CardActions, Typography, Grid, Button } from '@mui/material';

import quizImage from '../assets/quiz.jpeg';

export default function Quizzes() {
    return (
        <div>
            <h2>Meus Quizzes</h2>

            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={quizImage}
                                alt="Quiz"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Quiz
                                </Typography>

                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Quiz Teste
                                </Typography>

                            </CardContent>
                        </CardActionArea>

                        <CardActions>
                            <Button size="small" color="primary">
                                Iniciar Quiz
                            </Button>
                        </CardActions>
                    </Card>

                </Grid>

                <Grid item xs={4}>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={quizImage}
                                alt="Quiz"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Quiz
                                </Typography>

                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Quiz Teste
                                </Typography>

                            </CardContent>
                        </CardActionArea>

                        <CardActions>
                            <Button size="small" color="primary">
                                Iniciar Quiz
                            </Button>
                        </CardActions>
                    </Card>

                </Grid>

                <Grid item xs={4}>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={quizImage}
                                alt="Quiz"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Quiz
                                </Typography>

                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Quiz Teste
                                </Typography>

                            </CardContent>
                        </CardActionArea>

                        <CardActions>
                            <Button size="small" color="primary">
                                Iniciar Quiz
                            </Button>
                        </CardActions>
                    </Card>

                </Grid>

            </Grid>

        </div>
    )
}