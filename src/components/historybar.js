import React from 'react'
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

class Historybar extends React.Component {

    _renderBoards() {
        return this.props.board_hist.map(element => {
            const string = '(' + element.l3 + ' , ' + element.l2 + ' , ' + element.l1 + ')'
            return (<ListItem >
                <ListItemText primary={string}>
                </ListItemText>
            </ListItem >)
        })
    }


    render() {

        return (
            <div>
            

            <Container maxWidth="sm">History</Container>

                <Paper style={{maxHeight: "50vh", overflow: 'auto' }}>
                    
                    <List>
                        {this._renderBoards()}
                    </List>
                </Paper>
            </div>
        );
    }


}

export default Historybar
