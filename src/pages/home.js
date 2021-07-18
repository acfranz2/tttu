import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../home.css'

function Home() {
    return (
        <div>
            <h1 className='heading'>TicTacToeUltra</h1>
            <button className='button'>
                Ultra
            </button>
        </div>
    )
}

export default Home
