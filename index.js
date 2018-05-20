let cards = {
    '2_of_clubs.svg': 2,
    '2_of_spades.svg': 2,
    '2_of_diamonds.svg': 2,
    '2_of_hearts.svg': 2,
    '3_of_clubs.svg': 3,
    '3_of_spades.svg': 3,
    '3_of_diamonds.svg': 3,
    '3_of_hearts.svg': 3,
    '4_of_clubs.svg': 4,
    '4_of_spades.svg': 4,
    '4_of_diamonds.svg': 4,
    '4_of_hearts.svg': 4,
    '5_of_clubs.svg': 5,
    '5_of_spades.svg': 5,
    '5_of_diamonds.svg': 5,
    '5_of_hearts.svg': 5,
    '6_of_clubs.svg': 6,
    '6_of_spades.svg': 6,
    '6_of_diamonds.svg': 6,
    '6_of_hearts.svg': 6,
    '7_of_clubs.svg': 7,
    '7_of_spades.svg': 7,
    '7_of_diamonds.svg': 7,
    '7_of_hearts.svg': 7,
    '8_of_clubs.svg': 8,
    '8_of_spades.svg': 8,
    '8_of_diamonds.svg': 8,
    '8_of_hearts.svg': 8,
    '9_of_clubs.svg': 9,
    '9_of_spades.svg': 9,
    '9_of_diamonds.svg': 9,
    '9_of_hearts.svg': 9,
    '10_of_clubs.svg': 10,
    '10_of_spades.svg': 10,
    '10_of_diamonds.svg': 10,
    '10_of_hearts.svg': 10,
    'jack_of_clubs.svg': 10,
    'jack_of_spades.svg': 10,
    'jack_of_diamonds.svg': 10,
    'jack_of_hearts.svg': 10,
    'queen_of_clubs.svg': 10,
    'queen_of_spades.svg': 10,
    'queen_of_diamonds.svg': 10,
    'queen_of_hearts.svg': 10,
    'king_of_clubs.svg': 10,
    'king_of_spades.svg': 10,
    'king_of_diamonds.svg': 10,
    'king_of_hearts.svg': 10,
    'ace_of_clubs.svg': 11,
    'ace_of_spades.svg': 11,
    'ace_of_diamonds.svg': 11,
    'ace_of_hearts.svg': 11,
};

let deck = [],
    player = [],
    dealer = [];
let playerScore = 0,
    dealerScore = 0;
let total = 1000,
    bet = 0;
let disabled = true;

document.querySelector('#stand').disabled = true;
document.querySelector('#draw').disabled = true;


const shuffle = (arr) => {
    let curr = arr.length,
        temp, rand;
    while (curr !== 0) {
        rand = Math.floor(Math.random() * curr);
        curr--;
        temp = arr[curr];
        arr[curr] = arr[rand];
        arr[rand] = temp;
    }
    return arr;
}

const refresh = () => {
    document.querySelector('#total-amount').innerHTML = total;
    document.querySelector('#bet-amount').innerHTML = bet;    
    document.querySelector('#player').innerHTML = '';
    document.querySelector('#dealer').innerHTML = '';    
    document.querySelector('#player-score').innerHTML = '';
    document.querySelector('#dealer-score').innerHTML = '';
    document.querySelector('#status').innerHTML = 'Place your bet!'; 
}

const fillDeck = () => {
    deck = [];
    for (let key in cards) deck.push(key);
    deck = shuffle(deck);
    player = [], dealer = [];
    playerScore = 0, dealerScore = 0;
    player.push(deck.pop());
    player.push(deck.pop());
    dealer.push(deck.pop());
    dealer.push(deck.pop());
}

fillDeck();

const turn = () => {
    if (bet > 1) {
        fillDeck();
        fillBoard();
        disabled = true;
        document.querySelector('#next-turn').disabled = disabled;
        document.querySelector('#stand').disabled = !disabled;
        document.querySelector('#draw').disabled = !disabled;
    } else {
        alert('Place a bet!');
    }
}

const fillBoard = () => {
    document.querySelector('#player').innerHTML = ``;
    document.querySelector('#dealer').innerHTML = ``;
    document.querySelector('#dealer-score').innerHTML = ``;
    document.querySelector('#player-score').innerHTML = ``;

    player.forEach(card => {
        document.querySelector('#player').innerHTML += `<img src="/img/${card}" height="250px">`
        playerScore += parseInt(cards[card]);
    })
    document.querySelector('#player-score').innerHTML = playerScore
    document.querySelector('#dealer').innerHTML += `<img src="/img/red_joker.svg" height="250px">`
    dealer.forEach((card, i) => {
        i !== 0 ? document.querySelector('#dealer').innerHTML += `<img src="/img/${card}" height="250px">` : null;
        dealerScore += parseInt(cards[card]);
    });
    document.querySelector('#dealer-score').innerHTML = cards[dealer[dealer.length - 1]];
}

const stand = () => {
    dealerDraw();
    disabled = false;
    document.querySelector('#next-turn').disabled = disabled;
    document.querySelector('#stand').disabled = !disabled;
    document.querySelector('#draw').disabled = !disabled;    
    if (dealerScore > 21) {
        document.querySelector('#status').innerHTML = `You win!`;
        total += 2*bet;
        bet = 0;
        document.querySelector('#total-amount').innerHTML=total;
        document.querySelector('#bet-amount').innerHTML = 0;
        setTimeout(refresh,5000);
        return;
    }
    resolve();
    setTimeout(refresh,5000);
}

const playerDraw = () => {
    playerScore = 0;
    player.push(deck.pop())
    document.querySelector('#player').innerHTML = ``;
    player.forEach(card => {
        document.querySelector('#player').innerHTML += `<img src="/img/${card}" height="250px">`
        playerScore += parseInt(cards[card]);
    })

    document.querySelector('#player-score').innerHTML = playerScore;
    if (playerScore > 21) {
        document.querySelector('#stand').disabled = disabled;
        document.querySelector('#draw').disabled = disabled;
        document.querySelector('#next-turn').disabled = !disabled;
        document.querySelector('#status').innerHTML = `You lose!`;
        bet = 0;
        setTimeout(refresh,5000);
    }
}

const dealerDraw = () => {
    while (dealerScore < 17) {
        dealer.push(deck.pop());
        dealerScore += cards[dealer[dealer.length - 1]];
    }
    document.querySelector('#dealer').innerHTML = ``;
    dealer.forEach((card, i) => {
        document.querySelector('#dealer').innerHTML += `<img src="/img/${card}" height="250px">`;
    })
    document.querySelector('#dealer-score').innerHTML = dealerScore;
}

const resolve = () => {
    if (playerScore == dealerScore) {
        document.querySelector('#status').innerHTML = `It's a tie!`;
        total+=bet;
        bet = 0;
        document.querySelector('#total-amount').innerHTML=total;
        document.querySelector('#bet-amount').innerHTML = 0;
    }
    else if (playerScore > dealerScore) {
        document.querySelector('#status').innerHTML = `You win!`;
        total += 2*bet;
        bet = 0;
        document.querySelector('#total-amount').innerHTML=total;
        document.querySelector('#bet-amount').innerHTML = 0;
    }
    else if (playerScore < dealerScore) {
        document.querySelector('#status').innerHTML = `You lose!`;
        document.querySelector('#bet-amount').innerHTML = 0;
        bet = 0;
    }
}



const blueHandler = () => {
    if(total>=10) {
        bet += 10;
        total -= 10;
    } else {
        alert('Not enough money!')
    }
    document.querySelector('#bet-amount').innerHTML = bet;
    document.querySelector('#total-amount').innerHTML = total;
}
const yellowHandler = () => {
    if(total>=25) {
        bet += 25;
        total -= 25;
    } else {
        alert('Not enough money!')
    }
    document.querySelector('#bet-amount').innerHTML = bet;
    document.querySelector('#total-amount').innerHTML = total;
}
const redHandler = () => {
    if(total>=50) {
        bet += 50;
        total -= 50;
    } else {
        alert('Not enough money!')
    }
    document.querySelector('#bet-amount').innerHTML = bet;
    document.querySelector('#total-amount').innerHTML = total;
}
const blackHandler = () => {
    if(total>=100) {
        bet += 100;
        total -= 100;
    } else {
        alert('Not enough money!')
    }
    document.querySelector('#bet-amount').innerHTML = bet;
    document.querySelector('#total-amount').innerHTML = total;
}

const newGame = () => {
    total = 1000;
    bet = 0;
    refresh();
    alert('Place your bet!');
}

turn();




document.querySelector('#next-turn').addEventListener('click', turn);
document.querySelector('#stand').addEventListener('click', stand);
document.querySelector('#draw').addEventListener('click', playerDraw);
document.querySelector('#blue').addEventListener('click', blueHandler);
document.querySelector('#yellow').addEventListener('click', yellowHandler);
document.querySelector('#red').addEventListener('click', redHandler);
document.querySelector('#black').addEventListener('click', blackHandler);
document.querySelector('#new-game').addEventListener('click', newGame);
