import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import L2Game from '../l2Game.js'
import Game from './game.js'
import Instructions from './instructions.js'

export default function game_stage() {
  return (
    <div>
      <Navbar />
      <Instructions />
    </div>
  );
}
