import Spinner from '../components/Spinner.js';
import '../components/spinner.css'
import React, { useEffect } from 'react'
import db from '../firebase.js';
import { updateDoc, doc, addDoc, setDoc, collection } from "firebase/firestore";

export default function OnlineSetup(props) {



    useEffect(() => {
        let onlineKey = "";
        let setupGame = async () => {
            let df = await addDoc(collection(db, "games"), {
                number_of_human_players: props.location.state.player,
                type_of_game: props.location.state.type,
                game_mode: props.location.state.mode,
                players_online: 1
            });
            return new Promise(function (resolve, reject) {
                resolve(df.id)
            });
        };
        let p = setupGame();
        p.then((id) => {
            onlineKey = id;
            console.log(id);
            const path = '/game_stage/:' + onlineKey;
            const gameDoc = doc(db, 'games', onlineKey);
            updateDoc(gameDoc, {
              gamekey: onlineKey
            });
            setTimeout(() => {
                props.history.push({
                    pathname: path, state: {
                        type: props.location.state.type,
                        player: 1,
                        mode: props.location.state.mode,
                        gamekey: onlineKey,
                        players_online: 1,
                        myturn : true
                    }
                })
            }, 1500)
        });

    }, [])

    return (
        <div className="pos-center">
            <Spinner />
        </div>
    );
}
