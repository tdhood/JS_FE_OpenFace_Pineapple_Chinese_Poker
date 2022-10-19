'use strict';
import axios from 'axios'

const BASE_URL = 'https://www.deckofcardsapi.com/api/deck/'

async function getDeck() {
    const deckData = await axios({url: `${BASE_URL}/new`})
    console.log('deckData++++', deckData)
}

