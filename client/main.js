angular
  .module('joakenpo', ['angular-meteor', 'ionic'])
  .value('elements',['pedra','papel','tesoura'])
  .factory('machineChoiceIndex', (elements) => {
    return () => Math.floor(Math.random() * elements.length);
  })
  .factory('machineChoice', (elements,machineChoiceIndex) => {
    return () => elements[machineChoiceIndex()];
  })
  .factory('imageResult', () => {
    return(choice1,choice2) => choice1 + "-" + choice2 + ".jpg";
  })
  .factory('lossAlert', ($ionicPopup) => {
    return (choice, mChoice, imgResult) => {
      $ionicPopup
        .alert({
          title: "P E R D E U",
          cssClass: "loss-popup",
          template: "<a class=\"item item-thumbnail-left\" href=\"#\"> <img src=\"images/" + imgResult + "\"> <h2> " + choice + " </h2> <h2> &nbsp&nbspX </h2> <h2> " + mChoice + " </h2> </a>"
        });
    }
  })
  .factory('winAlert', ($ionicPopup) => {
    return (choice, mChoice, imgResult) => {
      $ionicPopup
        .alert({
          title: "G A N H O U",
          cssClass: "win-popup",
          template: "<a class=\"item item-thumbnail-left\" href=\"#\"> <img src=\"images/" + imgResult + "\"> <h2> " + choice + " </h2> <h2> &nbsp&nbspX </h2> <h2> " + mChoice + " </h2> </a>"
        });
    }
  })
  .factory('drawAlert', ($ionicPopup) => {
    return (choice, mChoice) => {
      $ionicPopup
        .alert({
          title: "E M P A T O U",
          cssClass: "draw-popup",
          template: "<a class=\"item item-thumbnail-left\" href=\"#\"> <img src=\"images/empate.jpg\"> <h2> " + choice + " </h2> <h2> &nbsp&nbspX </h2> <h2> " + mChoice + " </h2> </a>"
        });
    }
  })
  .controller('MainCtrl', ($scope,  machineChoice, elements, lossAlert, winAlert, imageResult, drawAlert) => {
    $scope.myScore = 0;
    $scope.machineScore = 0;
    $scope.onChoose = (choice) => {
      mChoice = machineChoice();
      if (choice === 'pedra' && mChoice === 'tesoura') {
        $scope.myScore ++;
        winAlert(choice,mChoice,imageResult(choice,mChoice));
      } else if (choice === 'tesoura' && mChoice === 'pedra') {
        $scope.machineScore ++;
        lossAlert(choice,mChoice,imageResult(mChoice,choice));
      } else if (elements.indexOf(choice) === elements.indexOf(mChoice)) {
        drawAlert(choice,mChoice);
      } else if (elements.indexOf(choice) > elements.indexOf(mChoice)) {
        $scope.myScore ++;
        winAlert(choice,mChoice,imageResult(choice,mChoice));
      } else if (elements.indexOf(choice) < elements.indexOf(mChoice)) {
        $scope.machineScore ++;
        lossAlert(choice,mChoice,imageResult(mChoice,choice));
      };
     }
  })

