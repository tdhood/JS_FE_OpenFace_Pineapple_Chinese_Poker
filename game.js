"use strict";

const BASE_URL = "https://www.deckofcardsapi.com/api/deck";
const $drawPile = $("#draw-pile");
let deckId = "";
let $actionCards = $("#action-cards")
let actionCards = {}

async function getDeck() {
  const deckData = await axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`);
  console.log("deckData++++", deckData);
  deckId = deckData.data.deck_id;
  console.log("deckId++++++", deckId);
//   $drawPile.append(deckData.)
}

async function drawStartingCards() {
    let playerCardsResp = await axios.get(`${BASE_URL}/${deckId}/draw/?count=5`)
    let compCardsResp = await axios.get(`${BASE_URL}/${deckId}/draw/?count=5`)
    
    console.log("playerCards+++", playerCardsResp)
    actionCards["playerCards"]= playerCardsResp.data.cards
    actionCards["computerCards"]= compCardsResp.data.cards
    console.log('actionCards+++++++++++', actionCards)

    placeStartingCards(actionCards)
}

function placeStartingCards(actionCards) {

    let $divsToRemove = $("#action-cards > div");
    console.log('divCount++++', $divsToRemove.length)
    $divsToRemove.remove()

    for(let card of actionCards.playerCards) {
        let $startingCard = $("<img>", {"class": 'card', src: card.image});
        $actionCards.append($startingCard)
    }

    // let $cardImages = actionCards["playerCards"].map(x => ($('<div>'), {'class': 'card', src: x.image}))
    // console.log('images?????', $cardImages)
    
}

async function startGame(evt) {
    evt.preventDefault;
    await getDeck();
    await drawStartingCards();
    
}

$("#start").on("click", startGame);
