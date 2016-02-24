angular.module('starter.services', [])

.factory('PlayersFactory', function($http, PlayersFile, ApiEndpoint) {
    var cachedData;

    function getData(callback) {
        $http.get(PlayersFile).success(function(data) {
            cachedData = data.players[0].rowSet;
            callback(null, data.players[0].rowSet);
        })
        .error(function(error){
            callback(error, null);
        });
    }

    return {
        getTeams: function(callback) {
            if(cachedData!==undefined){
                callback(null, getInfoTeams());
            }else{
                getData(function(err, teams){
                    callback(err, getInfoTeams());
                });
            }

            function getInfoTeams(){
                var teams={};
                var results=cachedData.filter(function(item){
                    if(teams[item[11]] || item[11]==""){
                        return false;
                    }
                    teams[item[11]]=true;
                    return true;
                }).map(function(item){
                    return {id:item[7], city: item[8], name: item[9], abbreviation:item[10] , code:item[11]};
                });

                results.push({id:000000, city:"Free", name:"Agents", abbreviation:"fa" , code:"free-agents"});
                return results;
            }
        },
        getFromTeam: function(id, callback) {
            id=(id==000000)?"":id;
            if(cachedData!==undefined){
                callback(null, getPlayers(id));
            }else{
                getData(function(err, teams){
                    callback(err, getPlayers(id));
                });
            }

            function getPlayers(id){
                return cachedData.filter(function(item){
                    return item[7]==id;
                });
            }
        },
        get: function(callback) {
            if(cachedData!==undefined){
                callback(null, cachedData);
            }else{
                getData(function(err, teams){
                    callback(err, cachedData);
                });
            }
        },
        getStats: function(id,callback) {
            $http.get(ApiEndpoint.url+'?Season=2014-15&SeasonType=Regular+Season&LeagueID=00&PlayerID='+id+'&GraphStartSeason=2014-15&GraphEndSeason=2014-15&GraphStat=PTS')
                .success(function(data) {
                    callback(null, data.resultSets[1].rowSet);
                }).error(function(error){
                    callback(error,null);
                });
        }
    };

});
