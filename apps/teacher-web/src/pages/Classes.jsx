import { Card, CardContent, CardMedia, CardActionArea, Typography, Grid, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import classImage from '../assets/class.jpeg';
import { Link } from 'react-router-dom';

const fabStyle = {
    position: 'absolute',
    bottom: 30,
    right: 30
};

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

            <Fab color="secondary" aria-label="novo quiz" sx={fabStyle} LinkComponent={Link} to='/classes/new'>
                <AddIcon />
            </Fab>
        </div>
    )
}