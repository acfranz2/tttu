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
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import TextField from '@material-ui/core/TextField'
import db from '../firebase.js';
import { doc, getDoc, updateDoc } from "firebase/firestore";

class Game_Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            btnDisabled: false,
            playDisabled: true,
            sbmtDisabled: true,
            type: null,
            player: null,
            mode: null,
            pathname: '/game_stage/',
            code: 0
        };

    }


    handleType = (event, newType) => {
        this.state.type = newType;
        if (this.state.type != null && this.state.mode != null && this.state.player != null) {
            this.state.playDisabled = false;
        }
        else {
            this.state.playDisabled = true;
        }
        this.forceUpdate();
    }

    handlePlayer = (event, newPlayer) => {
        this.state.player = newPlayer
        console.log(this.state.mode);
        if (this.state.type != null && this.state.mode != null && this.state.player != null) {
            this.state.playDisabled = false;
        }
        else {
            this.state.playDisabled = true;
        }
        this.forceUpdate();
    }

    handleMode = (event, newMode) => {

        this.state.mode = newMode;
        console.log(this.state.mode);

        if (newMode === 'online') {
            this.state.btnDisabled = true;
            this.state.player = 2;
            this.state.pathname = '/online_game_setup/';
        }
        else {
            this.state.btnDisabled = false;
            this.state.pathname = '/game_stage/';
        }

        if (this.state.type != null && this.state.mode != null && this.state.player != null) {
            this.state.playDisabled = false;
        }
        else {
            this.state.playDisabled = true;
        }

        this.forceUpdate();
    }

    handleTextFieldChange = (event) => {
        if (event.target.value != "") {
            this.state.sbmtDisabled = false;
        }
        else {
            this.state.sbmtDisabled = true;
        }
        this.state.code = event.target.value;
        console.log(this.state.code);
        this.forceUpdate();
    }

    handleSubmit = (event) => {
        getDoc(doc(db, "games", this.state.code)).then(docSnap => {
            if (docSnap.exists()) {
                const gameDoc = doc(db, 'games', this.state.code);
                updateDoc(gameDoc, {
                    players_online: docSnap.data().players_online + 1
                });
                this.props.history.push({
                    pathname: '/game_stage/:' + this.state.code, state: {
                        type: docSnap.data().type_of_game,
                        player: 2,
                        mode: docSnap.data().game_mode,
                        gamekey: this.state.code,
                        players_online: docSnap.data().players_online + 1,
                        myturn : false
                    }
                })
            } else {
                console.log("No such document!");
            }
        })
    }

    render() {
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
                                    value={this.state.mode}
                                    exclusive
                                    onChange={this.handleMode}
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
                                    value={this.state.type}
                                    exclusive
                                    onChange={this.handleType}
                                    aria-label="text alignment">
                                    <ToggleButton
                                        color="primary"
                                        value="Classic" >
                                        Classic
                                    </ToggleButton>
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
                                    value={this.state.player}
                                    exclusive
                                    onChange={this.handlePlayer}
                                    aria-label="text alignment">
                                    <ToggleButton
                                        color="primary"
                                        value="1"
                                        disabled={this.state.btnDisabled}>
                                        1 Player
                                    </ToggleButton>
                                    <ToggleButton
                                        color="primary"
                                        value="2"
                                        disabled={this.state.btnDisabled}>
                                        2 Players
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                            <Grid item>
                                <Link
                                    to={this.state.playDisabled ? '#' : {
                                        pathname: this.state.pathname, state: {
                                            type: this.state.type,
                                            player: this.state.player,
                                            mode: this.state.mode,
                                            gamekey: "",
                                            players_online: 0
                                        }
                                    }}
                                    style={{ textDecoration: 'none' }} disabled={this.state.playDisabled}>
                                    <Button
                                        endIcon={<SportsEsportsIcon />}
                                        color="secondary"
                                        disabled={this.playDisabled}>
                                        Play
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                        <header className='heading'>
                            <Typography variant="h3">
                                Friend already created a game? Enter Game Code:
                            </Typography>
                        </header>
                        <Grid container direction={'column'} spacing={1} justifyContent="center">
                            <Grid item>
                                <TextField value={this.state.code} id="outlined-basic" label="gamecode" variant="outlined" justifyContent="center" onChange={this.handleTextFieldChange} />
                            </Grid>
                            <Grid item>
                                <Button variant="contained" disabled={this.state.sbmtDisabled} onClick={this.handleSubmit}>Submit</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </Container >
        );
    }
}

// export function game_settings_page() {


//     const [btnDisabled, setBtnDisabled] = React.useState(true);
//     const [playDisabled, setPlayDisabled] = React.useState(true);


//     var pathname = '/game_stage/' + pathname;


//     const [type, setType] = React.useState(null);

//     const handleType = (event, newType) => {
//         setType(newType);
//         if (newType === null) {
//             setPlayDisabled(true);
//         }
//         else {
//             setPlayDisabled(false);
//         }
//     }

//     const [player, setPlayer] = React.useState('');

//     const handlePlayer = (event, newPlayer) => {
//         setPlayer(newPlayer);
//     }


//     const [mode, setMode] = React.useState('');

//     const handleMode = (event, newMode) => {
//         setMode(newMode);
//         if (newMode === 'online') {
//             setBtnDisabled(true);
//             setPlayer('');
//         }
//         else
//             setBtnDisabled(false);
//     }

//     return (
//         <Container>
//             <div>
//                 <header className='heading'>
//                     <Typography variant="h2">
//                         Game Setttings
//                     </Typography>
//                 </header>

//                 <Box textAlign='center' m={5}>
//                     <Grid container direction={'column'} spacing={1} justifyContent="center">
//                         <Grid item >
//                             <ToggleButtonGroup
//                                 value={mode}
//                                 exclusive
//                                 onChange={handleMode}
//                                 aria-label="text alignment">
//                                 <ToggleButton
//                                     color="primary"
//                                     value="local" >
//                                     Local
//                                 </ToggleButton>
//                                 <ToggleButton
//                                     color="primary"
//                                     value="online" >
//                                     Online
//                                 </ToggleButton>
//                             </ToggleButtonGroup>
//                         </Grid>
//                         <Grid item >

//                             <ToggleButtonGroup
//                                 value={type}
//                                 exclusive
//                                 onChange={handleType}
//                                 aria-label="text alignment">
//                                 <ToggleButton
//                                     color="primary"
//                                     value="Classic" >
//                                     Classic
//                                 </ToggleButton>
//                                 <ToggleButton
//                                     color="primary"
//                                     value="Ultimate" >
//                                     Ultimate
//                                 </ToggleButton>
//                                 <ToggleButton
//                                     color="primary"
//                                     value="Ultra" >
//                                     Ultra
//                                 </ToggleButton>
//                             </ToggleButtonGroup>
//                         </Grid>
//                         <Grid item >

//                             <ToggleButtonGroup
//                                 value={player}
//                                 exclusive
//                                 onChange={handlePlayer}
//                                 aria-label="text alignment">
//                                 <ToggleButton
//                                     color="primary"
//                                     value="1 Player"
//                                     disabled={btnDisabled}>
//                                     1 Player
//                                 </ToggleButton>
//                                 <ToggleButton
//                                     color="primary"
//                                     value="2 Players"
//                                     disabled={btnDisabled}>
//                                     2 Players
//                                 </ToggleButton>
//                             </ToggleButtonGroup>
//                         </Grid>
//                         <Grid item>
//                             <Link to={playDisabled ? '#' : { pathname: pathname, state: { type } }} style={{ textDecoration: 'none' }} disabled={playDisabled}>
//                                 <Button
//                                     endIcon={<SportsEsportsIcon />}
//                                     color="secondary"
//                                     disabled={playDisabled}>
//                                     Play
//                                 </Button>
//                             </Link>
//                         </Grid>
//                     </Grid>
//                 </Box>
//             </div>
//         </Container >
//     );
// }

export default Game_Settings
