
const redis  = require('redis');

const redisClient  = redis.createClient();



function LeaderBoard (key)
{
    this.key = key;
}

LeaderBoard.prototype.addUser  = function (userName,score)
{
   redisClient.zadd([this.key,score,userName],function(err,reply){
        if (!err)
        {
            console.log(userName,' added to Board ..');
        }
   });
};
LeaderBoard.prototype.removeUser = function(userName)
{
    redisClient.zrem(this.key,userName,function(err,reply){
        console.log(userName , ' is removed from Leader .. ');
    });
};
LeaderBoard.prototype.getUSerScoreAndRank = function(userName)
{
    redisClient.zscore(this.key,userName,function(err,reply){
        if (!err)
        {
            console.log(userName,' Score is ..',reply);
        }
    });
    redisClient.zrevrank(this.key,userName,function(err,reply){
        if (!err)
        {
            console.log(userName,' Rank is #',reply+1 );
        }
    });
};
LeaderBoard.prototype.showTopUSers = function(quty)
{
    redisClient.zrevrange([this.key,0,quty-1,'WITHSCORES'],function(err,reply){
        if (!err)
        {
            for (var i=0; i < reply.length; i+=2 )
            {
                console.log(reply[i],' Score Is .',reply[i+1]);
            }
        }
    });
};
exports.LeaderBoard = LeaderBoard;