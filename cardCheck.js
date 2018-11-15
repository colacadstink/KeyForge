var request = require('request');
var fs = require('fs');

var contents = fs.readFileSync("cardList.json");
var cardMap = JSON.parse(contents);

for(var i=1; i<=370; i++){
  var card = cardMap[i+""];
  if(!card){
    console.log("MISSING: "+i);
  }else{
    console.log(i+": "+card.card_title+" ("+card.rarity+")");
  }
}