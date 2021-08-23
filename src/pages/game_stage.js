import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import L2Game from '../l2Game.js'
import Game from './game.js'

export default function game_stage() {
  return (
    <div>
      <Navbar />
      <Game />
    </div>
  );
}
