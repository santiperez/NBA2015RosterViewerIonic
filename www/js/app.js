// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.constant('PlayersFile', './data/nba-2016-players.json')

.constant('ApiEndpoint', {
        url: 'http://stats.nba.com/stats/playerprofile'
    })

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    }).state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'SearchCtrl'
      }
    }
    }).state('app.teams', {
        url: '/teams',
        views: {
            'menuContent': {
                templateUrl: 'templates/teams.html',
                controller: 'TeamsCtrl'
            }
        }
    }).state('app.team', {
          url: '/team/:teamId',
          views: {
              'menuContent': {
                  templateUrl: 'templates/players.html',
                  controller: 'TeamCtrl'
              }
          }
      }).state('app.player', {
          url: '/player/:playerId',
          views: {
              'menuContent': {
                  templateUrl: 'templates/player.html',
                  controller: 'PlayerCtrl'
              }
          }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/teams');
});
