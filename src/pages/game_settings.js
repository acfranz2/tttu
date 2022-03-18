import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../home.css'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import ToggleButton from '@material-ui/lab/ToggleButton';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import HelpIcon from '@material-ui/icons/Help';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';


export function game_settings_page() {

    const [btnDisabled, setBtnDisabled] = React.useState(true);
    const [playDisabled, setPlayDisabled] = React.useState(true);

    const [type, setType] = React.useState(null);

    const handleType = (event, newType) => {
        setType(newType);
        if(newType === null) {
            setPlayDisabled(true);
        }
        else {
            setPlayDisabled(false);
        }
    }

    const [player, setPlayer] = React.useState('');

    const handlePlayer = (event, newPlayer) => {
        setPlayer(newPlayer);
    }


    const [mode, setMode] = React.useState('');

    const handleMode = (event, newMode) => {
        setMode(newMode);
        if (newMode === 'online') {
            setBtnDisabled(true);
            setPlayer('');
        }
        else
            setBtnDisabled(false);
    }

    return (
        <Container>
            <div>
                <header className='heading'>
                    <Typography variant="h2">
                        Game Setttings
                    </Typography>
                </header>

                <Box textAlign='center' m={5}>
                    <Grid container direction={'column'} spacing={1} justifyContent="center">
                        <Grid item >
                            <ToggleButtonGroup
                                value={mode}
                                exclusive
                                onChange={handleMode}
                                aria-label="text alignment">
                                <ToggleButton
                                    color="primary"
                                    value="local" >
                                    Local
                                </ToggleButton>
                                <ToggleButton
                                    color="primary"
                                    value="online" >
                                    Online
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                        <Grid item >

                            <ToggleButtonGroup
                                value={type}
                                exclusive
                                onChange={handleType}
                                aria-label="text alignment">
                                <ToggleButton
                                    color="primary"
                                    value="Ultimate" >
                                    Ultimate
                                </ToggleButton>
                                <ToggleButton
                                    color="primary"
                                    value="Ultra" >
                                    Ultra
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                        <Grid item >

                            <ToggleButtonGroup
                                value={player}
                                exclusive
                                onChange={handlePlayer}
                                aria-label="text alignment">
                                <ToggleButton
                                    color="primary"
                                    value="1 Player"
                                    disabled={btnDisabled}>
                                    1 Player
                                </ToggleButton>
                                <ToggleButton
                                    color="primary"
                                    value="2 Players"
                                    disabled={btnDisabled}>
                                    2 Players
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                        <Grid item>
                            <Link to={playDisabled ? '#' : {pathname: "/game_stage", state: {type}}} style={{ textDecoration: 'none' }} disabled={playDisabled}>
                                <Button
                                    endIcon={<SportsEsportsIcon />}
                                    color="secondary" 
                                    disabled={playDisabled}>
                                    Play
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </Container >
    );
}

export default game_settings_page
