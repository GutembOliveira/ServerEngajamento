import { Card, CardContent, CardMedia, CardActionArea, Typography, Grid } from '@mui/material';

import classImage from '../assets/class.jpeg';

export default function Classes(){
    return(
        <div>
            <h2>Minhas turmas</h2>

            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={classImage}
                                alt="Turma"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Turma
                                </Typography>

                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Turma Teste
                                </Typography>

                            </CardContent>
                        </CardActionArea>
                    </Card>

                </Grid>

                <Grid item xs={4}>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={classImage}
                                alt="Turma"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Turma
                                </Typography>

                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Turma Teste
                                </Typography>

                            </CardContent>
                        </CardActionArea>
                    </Card>

                </Grid>

                <Grid item xs={4}>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={classImage}
                                alt="Turma"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Turma
                                </Typography>

                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Turma Teste
                                </Typography>

                            </CardContent>
                        </CardActionArea>
                    </Card>

                </Grid>

            </Grid>
        </div>
    )
}