import Spinner from '../components/Spinner.js';
import database from '../firebase.js';
import '../components/spinner.css'
import React, { useEffect } from 'react'


export default function OnlineSetup(props) {

    const gamesRef = database.ref("games");
    const newGameRef = gamesRef.push();
    newGameRef.set(
        {
            number_of_human_players: props.location.state.player,
            type_of_game: props.location.state.type,
            game_mode: props.location.state.mode
        }
    );
    const onlineKey = newGameRef.key;
    const path = '/game_stage/:' + onlineKey;

    useEffect(() => {
        setTimeout(() => {
            props.history.push({
                pathname: path, state: {
                    type: props.location.state.type,
                    player: props.location.state.player,
                    mode: props.location.state.mode
                }
            })
        }, 1500)
    }, [])

    return (
        <div className="pos-center">
            <Spinner />
        </div>
    );
}
