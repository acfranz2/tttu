import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import HelpIcon from '@material-ui/icons/Help';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default function Home() {
    return (
        <Container>
            <div>
                <header className='heading'>
                    <Typography variant="h1">
                        TicTacToeUltra
                    </Typography>
                </header>

                {/* <AppBar>
                        <Toolbar>
                            <IconButton>
                                <MenuIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar> */}

                <Box textAlign='center' >
                    <Grid container direction={'column'} spacing="4" justify="center">
                        <Grid item>
                            <Link to="/game_settings" style={{ textDecoration: 'none' }}>
                                <Button
                                    endIcon={<SportsEsportsIcon />}
                                    color="secondary" >
                                    Play
                                </Button>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Button
                                endIcon={<HelpIcon />}
                                color="primary" >
                                How To Play
                            </Button>
                        </Grid>

                    </Grid>
                </Box>
            </div>
        </Container >
    )
}

