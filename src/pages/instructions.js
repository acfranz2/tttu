import React from 'react'
import { Typography, Container, AppBar, Tabs, Tab} from '@material-ui/core'
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`wrapped-tabpanel-${index}`}
        aria-labelledby={`wrapped-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};


export default function Instructions() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Terminology" />
                    <Tab label="How To Play" />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Container>
                    <Typography variant="h1">
                        Terminology
                    </Typography>
                    <img></img>
                    <Typography variant="h3">
                        L1 Board
                    </Typography>
                    <img></img>
                    <Typography variant="h3">
                        L2 Board
                    </Typography>
                    <img></img>
                    <Typography variant="h3">
                        L3 Board
                    </Typography>
                    <img></img>
                    <Typography variant="h3">
                        Cell
                    </Typography>
                    <img></img>
                    <Typography variant="h3">
                        Won Game
                    </Typography>
                    <img></img>
                    <Typography variant="h3">
                        Drawn Game
                    </Typography>
                    <img></img>
                    <Typography variant="h3">
                        Coordinates
                    </Typography>
                    <img></img>
                </Container>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Container>
                    <Typography variant="h1">
                        How To Play
                    </Typography>
                    <Typography variant="h2">
                        Ultimate
                    </Typography>
                    <Typography variant="body1">
                        Ultimate tic tac toe is played on an L2 Board.
                    </Typography>
                    <img></img>
                    <Typography variant="body1">
                        What makes this game different from classic tic tac toe is that all of the board are connected. The X dictates O's move and then O dictates X's move. As you can see below, the position in the L1 board determines which L2 cell can be played in. If you play in the middle right cell of an L1 board, the next player must play in the middle right cell of the L2 board.
                    </Typography>
                    <img></img>
                    <Typography variant="body1">
                        The last coordinate of a move is the first coordinate of the next players move. ie. (3, 2) goes to (2, ?)
                    </Typography>
                    <Typography variant="body1">
                        Play continues in this manor until a game is won or drawn, then it gets interesting. If a player is ever sent to a won or drawn L1 game, they may play anywhere in the current playable area. The next player must then play once again in the corresponding cell of the L2 board. This is how every turn works when a player is sent to a won or drawn L1 game. Play continues until L2 game is won or drawn.
                    </Typography>
                    <Typography variant="h2">
                        Ultra
                    </Typography>
                    <Typography variant="body1">
                        Ultra tic tac toe is played on an L2 Board.
                    </Typography>
                    <img></img>
                    <Typography>
                        Play is very similar to Ultimate tic tac toe. Each player's move still dictates the next, and X's and O's are still placed in L1 games. In a similar way to how in Ultimate tic tac toe the last coordinate of a move is the first coordinate of the next players move, the last two coordinates of a move are the first two coordinates of the next move in Ultra. ie. (2, 1, 5) goes to (1, 5, ?)
                    </Typography>
                    <img></img>
                    <Typography>
                        Again, play continues normally until a player is sent to a won or drawn cell. If a player is sent to a won or drawn cell of an L2 game, they may play anywhere in the playable area of the L2 game.
                    </Typography>
                    <img></img>
                    <Typography>
                        If a player is sent to a won or drawn cell of the L3 game, they may play anywhere in the playable area of the entire L3 game.
                    </Typography>
                    <img></img>
                    <Typography>
                        Both events occur in the same way for the rest of the game.
                    </Typography>
                </Container>
            </TabPanel>
        </Container>
    );
}



/*

Note: 
    make special images for the tutorial 


Terminology:
    Won Game

    Drawn Game

    Playable Game

    L1 Board

    L2 Board

    L3 Board

    Cell

    Coordinates

How To Play
Ultimate:

    Ultimate tic tac toe is played on an L2 Board.

    What makes this game different from classic tic tac toe is that all of the board are connected. The X dictates 
    O's move and then O dictates X's move. As you can see below, the position in the L1 board determines which L2
    cell can be played in. If you play in the middle right cell of an L1 board, the next player must play in the 
    middle right cell of the L2 board.

        IMAGE

    The last coordinate of a move is the first coordinate of the next players move. ie. (3, 2) -> (2, ?)

    Play continues in this manor until a game is won or drawn, then it gets interesting. If a player is ever sent to a won or 
    drawn L1 game, they may play anywhere in the current playable area. The next player must then play once again in the 
    corresponding cell of the L2 board. This is how every turn works when a player is sent to a won or drawn L1 game. Play 
    continues until L2 game is won or drawn. 

Ultra:

    Ultra tic tac toe is played on an L3 Board.

    Play is very similar to Ultimate tic tac toe. Each player's move still dictates the next, and X's and O's are still placed in 
    L1 games. In a similar way to how in Ultimate tic tac toe the last coordinate of a move is the first coordinate of the next 
    players move, the last two coordinates of a move are the first two coordinates of the next move in Ultra. ie. (2, 1, 5) -> (1, 5, ?)

        IMAGE

    Again, play continues normally until a player is sent to a won or drawn cell. If a player is sent to a won or drawn cell of an L2 game,
    they may play anywhere in the playable area of the L2 game.

        IMAGE

    If a player is sent to a won or drawn cell of the L3 game, they may play anywhere in the playable area of the entire L3 game.

        IMAGE

    Both events occur in the same way for the rest of the game.

*/