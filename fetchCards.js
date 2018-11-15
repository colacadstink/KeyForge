var request = require('request');

var deckIds = [];
var cardMap = {};

var page=1;
var done=0;
var total=100;

for(var page=1; page<total+1; page++){
  request.get({url: 'https://www.keyforgegame.com/api/decks/?page='+page, json: true}, (err, res, data)=>{
    data.data.forEach(function(deck){
      deckIds.push(deck.id);
    });
    done++;
    decksLoaded();
  });
}

function decksLoaded(){
  if(done!==total){
    return;
  }
  done=0;
  total=deckIds.length;
  deckIds.forEach(function(id){
    request.get({url: 'https://www.keyforgegame.com/api/decks/'+id+'/?links=cards,notes', json: true}, (err, res, data)=>{
      data._linked.cards.forEach(function(card){
        if(!card.is_maverick){
          cardMap[card.card_number] = card;
        }
      });
      done++;
      cardsLoaded();
    });
  });
}

function cardsLoaded(){
  if(done!==total){
    return;
  }
  console.log(JSON.stringify(cardMap));
}