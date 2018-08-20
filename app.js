const express  = require('express');
const board  = require('./leader');
const app = express();
// Leader board is set now 
var ourBoard  = new board.LeaderBoard('gamesboard');


ourBoard.addUser('junaid',100);
ourBoard.addUser('ammar',200);
ourBoard.addUser('Sara',300);
ourBoard.addUser ('naaseem',500);
ourBoard.addUser('abu',1000);

//  check the score and rank now

ourBoard.getUSerScoreAndRank('junaid');
ourBoard.getUSerScoreAndRank('abu');
ourBoard.showTopUSers(3);
/// port istening 

app.listen (3000,function(){
    console.log('server is runnng ...');
});