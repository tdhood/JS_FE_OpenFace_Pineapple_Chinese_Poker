"use strict";

const BASE_URL = "https://www.deckofcardsapi.com/api/deck";
const $drawPile = $("#draw-pile");
let globalDeckId = "";
let $actionCards = $("#action-cards")
let actionCards = {}
let $targetCard;

async function getDeck() {
    /** makes call to deck of cards api to get deck Id */
  const deckData = await axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`);
  console.log("deckData++++", deckData);
  globalDeckId = deckData.data.deck_id;
  console.log("deckId++++++", globalDeckId);
}

async function drawStartingCards() {
    /** using the global deck id retrieved from getDeck(), makes api call to deck of cards api
     * to get draw 5 cards for each player.
     * 
     * Then function calls placeStartingCards with the cards from request to append them to DOM
     */
    let playerCardsResp = await axios.get(`${BASE_URL}/${globalDeckId}/draw/?count=5`)
    let compCardsResp = await axios.get(`${BASE_URL}/${globalDeckId}/draw/?count=5`)
    
    console.log("playerCards+++", playerCardsResp)
    actionCards["playerCards"]= playerCardsResp.data.cards
    actionCards["computerCards"]= compCardsResp.data.cards
    console.log('actionCards+++++++++++', actionCards)

    placeStartingCards(actionCards)
}

function placeStartingCards(actionCards) {
    /** Displays players cards */
    $actionCards.css({"visibility": "visible"})

    for(let card of actionCards.playerCards) {
        let $cardContainer = $('<div>', {"class" : "card"})
        let $startingCard = $("<img>", {"id": card.code, "class": 'card-img', src: card.image});
        $cardContainer.append($startingCard)
        $actionCards.append($cardContainer)
    }
    
   // TODO: add card back image to draw pile
}

async function startGame(evt) {
    /**Conductor function to start game */
    evt.preventDefault;
    console.log('actioncards length check', $actionCards.length)

    if ($actionCards.length > 0) {
        $("#start").attr('disabled', true)
    }

    await getDeck();
    await drawStartingCards();
}


function selectCard(evt) {
    evt.preventDefault;
    console.log('selectCard')

    $targetCard = evt.target;
    console.log('targetCard', $targetCard)

    ($targetCard).css()


}

$("#action-cards").on("click", selectCard);
$("#start").on("click", startGame);


