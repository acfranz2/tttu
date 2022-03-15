import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { ThemeProvider, createTheme } from '@material-ui/core';

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

const title = createTheme({
    typography: {
        fontFamily: "Rowdies"
    }
});

const buttons = createTheme({
    typography: {
        fontSize: 20,
    },
});

export default function Home() {
    return (
        <Container>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", minHeight: "100vh"}}>
                
                <ThemeProvider theme={title}>
                    <Typography variant="h1" align="center">
                        TicTacToeUltra
                    </Typography>
                </ThemeProvider>
                <ThemeProvider theme={buttons}>
                    <Box textAlign='center' padding={10} style={{}}>
                        <Grid container direction={'column'} spacing={2} justifyContent="center">
                            <Grid item>
                                <Link to="/game_settings" style={{ textDecoration: 'none' }}>
                                    <Button
                                        endIcon={<SportsEsportsIcon />}
                                        color="secondary"
                                        style={{maxWidth: "220px", maxHeight: "40px", minWidth: "220px", minHeight: "40px", fontWeight: 600}} 
                                        >
                                        Play
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Button
                                    endIcon={<HelpIcon />}
                                    color="primary" 
                                    style={{maxWidth: "220px", maxHeight: "40px", minWidth: "220px", minHeight: "40px", fontWeight: 600}} 
                                    >
                                    How To Play
                                </Button>
                            </Grid>

                        </Grid>
                    </Box>
                </ThemeProvider>
            </div>
        </Container >
    )
}

