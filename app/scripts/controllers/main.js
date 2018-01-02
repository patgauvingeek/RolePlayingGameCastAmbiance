'use strict';

Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
}

/**
 * @ngdoc function
 * @name rolePlayingGameCastAmbianceApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rolePlayingGameCastAmbianceApp
 */
angular.module('rolePlayingGameCastAmbianceApp')
  .controller('MainCtrl', ['$scope', '$interval', function ($scope, $interval) {
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
    
    ctrl.update_time = function()
    {
      var now = new Date();
      $scope.time = now.getHours() + ':' + now.getMinutes().pad() + ':' + now.getSeconds().pad();
      if (ctrl.casted_window == undefined)
      {
        return;
      }
      ctrl.casted_window.document.getElementById('casted-time').innerHTML=$scope.time;
    }

    ctrl.update_cast_window = function()
    {
      if (ctrl.casted_window == undefined)
      {
        return;
      }
      var casted_content = ctrl.casted_window.document.getElementById('casted-content');
      casted_content.style.background = $scope.background;
      casted_content.style.color = $scope.background == 'white' ? 'black' : 'white';

      var casted_image = ctrl.casted_window.document.getElementById('casted-image')
      casted_image.style.display = $scope.selected_image == '' ? 'none' : 'block';
      casted_image.src = $scope.selected_image;

      ctrl.casted_window.document.getElementById('casted-message').innerHTML=$scope.message;
      
      ctrl.casted_window.document.getElementById('casted-time').style.display = $scope.show_time ? 'block' : 'none';
      ctrl.update_time();

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
      $scope.message = '';
      $scope.selected_image = '';
      $scope.selected_audio = '';
      $scope.selected_volume = 0.1;
      $scope.show_time = true;
      ctrl.update_cast_window();
    }
    
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

    $scope.clear_cast();
    ctrl.update_time();
    $interval(ctrl.update_time, 1000);

  }]);
