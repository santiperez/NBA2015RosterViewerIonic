angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
})

.controller('TeamsCtrl', function($scope, $http, PlayersFactory) {
    PlayersFactory.getTeams(function(err, teams) {
        $scope.teams=teams;
    });

    $scope.openTeamUrl = function(id) {
        try {
            var url = "http://www.nba.com/"+id;
            window.open(url, '_system', 'location=yes,toolbar=yes');
        } catch (err) {
            console.log(err);
        }
    }
})

.controller('TeamCtrl', function($scope, $http, $stateParams, PlayersFactory) {
    PlayersFactory.getFromTeam($stateParams.teamId, function(err, players) {
        $scope.players =players;
    });
})

.controller('SearchCtrl', function($scope, $http, PlayersFactory) {
    $scope.player = {
        name: null
    };

    $scope.searchPlayers = function() {
        if($scope.player && $scope.player.name!='' &&  $scope.player.name.length>1) {
            PlayersFactory.get(function (err, players) {
                $scope.players = players;
            });
        }else{
            $scope.players=null;
        }
    };
})

.controller('PlayerCtrl', function($scope, $http, $stateParams, PlayersFactory, $ionicLoading) {
        $ionicLoading.show({
            template: 'Loading...'
        });
        PlayersFactory.getStats($stateParams.playerId, function(err, stats) {
            $ionicLoading.hide();
            $scope.stats =stats;
        });

});
