import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box'
import { sizing } from '@material-ui/system';
import Container from '@material-ui/core/Container';
import { TabPanel } from '@material-ui/lab';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

function parseMove(move) {
    let coords = move.split(' ');
    let val = "";

    if (coords.length === 1) {
        val = "(" + (parseInt(coords[0]) + 1) + ")";
    }
    else if (coords.length === 2) {
        val = "(" + (parseInt(coords[0]) + 1) + ", " + (parseInt(coords[1]) + 1) + ")";
    }
    else {
        val = "(" + (parseInt(coords[0]) + 1) + ", " + (parseInt(coords[1]) + 1) + ", " + (parseInt(coords[2]) + 1) + ")";
    }

    return val;
}

function Historybar(props) {

    const _renderMoves = () => {
        // let grid = document.getElementById('moveList');
        // let moveList = props.board_hist;
        // let moveCount = 1;
        // for(let i = 0; i < moveList.length; i++) {
        //     if(i % 2 === 0) {
        //         // grid.appendChild(<Typography style={{width: '20px'}}>{moveCount}</Typography>);
        //     }
        //     let move = parseMove(moveList[i]);
        //     grid.appendChild(
        //         (<Button key={moveList[i]} style={{width: '150px', justifyContent: 'left'}}>
        //             {move}
        //         </Button>)
        //     );
        // }
        return props.board_hist.map((element, index) => {
            if(element === '-1') {
                return (
                    <p key={index} style={{width: '21px', display: 'flex', justifyContent: 'center'}}>
                        {((index / 3) + 1) + '.'}
                    </p>
                );
            }
            let val = parseMove(element);
            let moveIndex = index - Math.floor(index / 3) - 1;
            return (
                <Button key={element} style={{width: '139px', justifyContent: 'left'}} onClick={() => {props.changeMove(moveIndex + 1)}}>
                    {val}
                </Button>
            );
       })
    }

    const Panel = (p) => {
        return (<div hidden={p.value !== p.index}>
            <Paper id='p' style={{ maxHeight: '400px', maxWidth: '320px', display: 'flex', flexDirection: 'column-reverse', overflowY: 'scroll' }}>{p.children}</Paper>
        </div>);
    };

    const [index, setIndex] = useState(0);
    const onTabClicked = (event, index) => {
        setIndex(index);
    }
    const color_1 = props.player ? "rgb(3, 86, 141)" : "white";
    const color_2 = props.player ? "white" : "rgb(146, 7, 211)";

    return (
        <div>
            <Paper style={{ maxHeight: "50vh" }}>
                <Tabs
                    value={index}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={onTabClicked}
                >
                    <Tab label="History" />
                    <Tab label="Players" />
                </Tabs>
                <Panel value={index} index={0}>
                    <Grid container columns={2} id='moveList'>
                        {_renderMoves()}
                    </Grid>
                </Panel>
                <Panel value={index} index={1}>
                    <Card style={{ backgroundColor: color_1 }}>
                        <CardContent>
                            <Typography>
                                Player 1
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card style={{ backgroundColor: color_2 }}>
                        <CardContent>
                            <Typography>
                                Player 2
                            </Typography>
                        </CardContent>
                    </Card>
                </Panel>

            </Paper>
        </div>
    );



}

export default Historybar