import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box'
import { sizing } from '@material-ui/system';
import Container from '@material-ui/core/Container';
import { TabPanel } from '@material-ui/lab';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { FixedSizeList } from 'react-window';

function Historybar(props) {

    const _renderBoards = () => {
        return props.board_hist.map(element => {
            let coords = element.split(' ');
            let val = "";
            if(coords.length === 2) {
                val = "(" + (parseInt(coords[0]) + 1) + ", " + (parseInt(coords[1]) + 1) + ")"
            }
            else {
                val = "(" + (parseInt(coords[0]) + 1) + ", " + (parseInt(coords[1]) + 1) + ", " + (parseInt(coords[2]) + 1) + ")"
            }
            return (<ListItem key={element}>
                <ListItemText primary={val}>
                </ListItemText>
            </ListItem >)
        })
    }

    const Panel = (p) => (
        <div hidden={p.value !== p.index}>
            <Paper>{p.children}</Paper>
        </div>
    )

    const [index, setIndex] = useState(0);
    const onTabClicked = (event, index) => {
        setIndex(index);
    }
    const color_1 = props.player ? "rgb(3, 86, 141)" : "white";
    const color_2 = props.player ? "white" : "rgb(146, 7, 211)";

    return (
        <div style={{width: "320px"}}>
            <div>
                <Tabs
                    value={index}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={onTabClicked}
                    centered
                >
                    <Tab label="History" />
                    <Tab label="Players" />
                </Tabs>
            </div>
            <div>
                <Panel value={index} index={0}>
                    <List height={400} width={300} itemSize={46} itemCount={200}>
                        {_renderMove()}
                    </List>
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
            </div>
        </div>
    );



}

export default Historybar
