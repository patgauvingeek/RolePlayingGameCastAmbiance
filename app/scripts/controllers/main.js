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
        images : [
          'media/openlegend/logo.png'
        ],
        audios : [
          'media/openlegend/thunder.mp3',
          'media/openlegend/Countdown.mp3'
        ]
      },
      maelstrom : {
        name: "S.S. Maëlstrom",
        images : [
          'media/maelstrom/capitaine.jpg',
          'media/maelstrom/FATE.png',
          'media/maelstrom/fatesheet.jpg',
          'media/maelstrom/quazar.jpg',
          'media/maelstrom/radioactive.png',
          'media/maelstrom/station_spacial.jpg',
          'media/maelstrom/station_spacial.png',
          'media/maelstrom/Steampunk-17.jpg'
        ],
        audios : [
          'media/maelstrom/geigercounter.mp3'
        ]
      },
      tochi : {
        name : 'Tochi',
        images : [
          'media/tochi/abyssal_evicerator.jpg',
          'media/tochi/abyssal_rotfiend.jpg',
          'media/tochi/abyssals.jpg',
          'media/tochi/BlackReaverZombie.jpg',
          'media/tochi/Carrion_crawler.jpg',
          'media/tochi/ClarkMerton.png',
          'media/tochi/ClarkMertonEvent.png',
          'media/tochi/dnd_big.jpg',
          'media/tochi/Lasher Zombie.png',
          'media/tochi/mirror.jpg',
          'media/tochi/montagne.jpg',
          'media/tochi/PitOfSoldier.jpg',
          'media/tochi/ShichiGatsu1049.jpg',
          'media/tochi/swearing.png',
          'media/tochi/Tadiosa.jpg',
          'media/tochi/tattoo.jpg',
          'media/tochi/throne.jpg',
          'media/tochi/WitheringOnes.jpg',
          'media/tochi/Zazix.jpg',
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
      var casted_content = ctrl.casted_window.document.getElementById('casted-content');
      casted_content.style.background = $scope.background;

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

    $scope.get_filename = function(file)
    {
      var wIndex = file.lastIndexOf('/');
      return file.substring(wIndex + 1);
    }

    $scope.clear_cast = function()
    {
      $scope.background = 'black';
      $scope.foreground = 'white';
      $scope.message = '';
      $scope.selected_image = '';
      $scope.selected_audio = '';
      $scope.selected_volume = 0.02;
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
