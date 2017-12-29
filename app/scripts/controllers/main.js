'use strict';

/**
 * @ngdoc function
 * @name rolePlayingGameCastAmbianceApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rolePlayingGameCastAmbianceApp
 */
angular.module('rolePlayingGameCastAmbianceApp')
  .controller('MainCtrl', ['$scope', function ($scope) {
    var ctrl = this;

    $scope.campaigns = {
      openlegend : {
        name : 'Open Legend',
        images : ['openlegend/logo.png'],
        audios : ['openlegend/thunder.mp3']
      },
      tochi : {
        name : 'Tochi',
        images : [
          'tochi/abyssal_evicerator.jpg',
          'tochi/abyssal_rotfiend.jpg',
          'tochi/abyssals.jpg',
          'tochi/BlackReaverZombie.jpg',
          'tochi/Carrion_crawler.jpg',
          'tochi/ClarkMerton.png',
          'tochi/ClarkMertonEvent.png',
          'tochi/dnd_big.jpg',
          'tochi/Lasher Zombie.png',
          'tochi/mirror.jpg',
          'tochi/montagne.jpg',
          'tochi/PitOfSoldier.jpg',
          'tochi/ShichiGatsu1049.jpg',
          'tochi/swearing.png',
          'tochi/Tadiosa.jpg',
          'tochi/tattoo.jpg',
          'tochi/throne.jpg',
          'tochi/WitheringOnes.jpg',
          'tochi/Zazix.jpg',
        ],
        audios : []
      }
    };
    
    ctrl.update_cast_window = function()
    {
      if (ctrl.casted_window == undefined)
      {
        return;
      }
      var casted_image = ctrl.casted_window.document.getElementById('casted-image')
      if ($scope.selected_image == '')
      {
        casted_image.style.display = "none";
      }
      else
      {
        casted_image.style.display = "block";
      }
      casted_image.src = $scope.selected_image;
      ctrl.casted_window.document.getElementById('casted-message').innerHTML=$scope.message;
      
      var casted_audio_source = ctrl.casted_window.document.getElementById('casted-audio-source');
      casted_audio_source.src = $scope.selected_audio;

      var casted_audio = ctrl.casted_window.document.getElementById('casted-audio');
      casted_audio.load();
      casted_audio.volume = $scope.selected_volume;
      casted_audio.play();
    }

    $scope.clear_cast = function()
    {
      $scope.background = 'black';
      $scope.foreground = 'white';
      $scope.message = '';
      $scope.selected_image = '';
      $scope.selected_audio = '';
      $scope.selected_volume = 0.1;
      $scope.showTime = false;
      ctrl.update_cast_window();
    }
    $scope.clear_cast();

    $scope.select_image = function(image)
    {
      if ($scope.selected_image == image)
      {
        $scope.selected_image = '';
        return;
      }
      $scope.selected_image = image;
    }

    $scope.select_audio = function(audio)
    {
      if ($scope.selected_audio == audio)
      {
        $scope.selected_audio = '';
        return;  
      }
      $scope.selected_audio = audio;
    }
    
    $scope.cast = function()
    {
      if (ctrl.casted_window == undefined)
      {
        ctrl.casted_window = window.open('cast.html', '_blank');
        ctrl.casted_window.onload = function()
        {
          ctrl.update_cast_window();
        }
        ctrl.casted_window.onbeforeunload = function()
        {
          ctrl.casted_window = undefined;
          return null;
        }
      }
      else
      {
        ctrl.update_cast_window();
      }      
    }
  }]);
