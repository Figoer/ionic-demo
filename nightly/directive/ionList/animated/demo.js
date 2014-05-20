var DEMO;

  DEMO = {
  "module": "listAnimated",
  "name": "animated",
  "docName": "ionList",
  "href": "/nightly/directive/ionList/animated",
  "javascript": {
    "path": "nightly/directive/ionList/animated/javascript.js",
    "content": "angular.module('listAnimated', ['ionic'])\n.controller('AnimatedListCtrl', function($scope, $timeout) {\n  var nextItem = 0;\n  $scope.items = [];\n  for (var i=0; i < 5; i++) {\n    $scope.items.push('Item ' + (nextItem++));\n  }\n\n  $scope.addItem = function(atIndex) {\n    $scope.items.splice(atIndex + 1, 0, 'Item ' + nextItem);\n    nextItem++;\n  };\n});"
  },
  "html": {
    "path": "nightly/directive/ionList/animated/html.html",
    "content": "<div ng-controller=\"AnimatedListCtrl\">\n  <ion-header-bar class=\"bar-positive\">\n    <h1 class=\"title\">Animated List</h1>\n  </ion-header-bar>\n  <ion-content>\n    <ion-list show-delete=\"showDelete\">\n\n      <ion-item class=\"animated-item\"\n                ng-repeat=\"item in items\">\n        {{item}}\n        <div class=\"item-note\">\n          <a class=\"button button-small\"\n             ng-click=\"addItem($index)\">\n             Add\n          </a>\n          <a class=\"button button-small\"\n             ng-click=\"items.splice($index, 1)\">\n            Remove\n          </a>\n        </div>\n      </ion-item>\n\n    </ion-list>\n  </ion-content>\n</div>"
  },
  "css": {
    "path": "nightly/directive/ionList/animated/css.css",
    "content": ".animated-item .item-note .button {\n  margin-top: 10px;\n}\n.animated-item {\n  line-height: 52px;\n  padding-top: 0;\n  padding-bottom: 0;\n  -webkit-transition: all 0.15s linear;\n  -moz-transition: all 0.15s linear;\n  transition: all 0.15s linear;\n}\n.animated-item.ng-leave.ng-leave-active,\n.animated-item.ng-enter {\n  opacity: 0;\n  max-height: 0;\n}\n.animated-item.ng-leave,\n.animated-item.ng-enter.ng-enter-active {\n  opacity: 1;\n  max-height: 52px;\n}"
  }
};


angular.module('listAnimated'
  )
.controller('IonicDemoCtrl', function($scope, $ionicModal, $ionicLoading) {
  $scope.$demos = DEMOS;

  
    $scope.$demo = DEMO;
    $ionicModal.fromTemplateUrl('ionic-demo-modal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.$demoModal = modal;
    });

    //don't try this at home
    ionic.onGesture('dragup', function(e) {
      if (e.gesture.distance > 35 && !$scope.$demoModal.isShown()) {
        $scope.$apply(function(e) {
          $scope.$demoModal.show();
        });
      }
    }, document.querySelector('.demo-footer'));

    $scope.demoScratch = function(demo) {
      var form = angular.element('<form method="POST" action="http://scratch.ionicsdk.com/embed">');

      var htmlInput = angular.element('<textarea type="text" name="html">')
      .val(['<html ng-app="listAnimated">',
           '<head>',
           '  <meta charset="utf-8">',
           '  <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">',
           '  <link rel="stylesheet" href="http://code.ionicframework.com/nightly/css/ionic.css">',
           '  <script src="http://code.ionicframework.com/nightly/js/ionic.bundle.js"></script>',
           '</head>',
           '<body>',
           (demo.html && demo.html.content || ''),
           '</body>',
           '</html>'].join('\n'));

           var cssInput = angular.element('<textarea type="text" name="css">')
           .val(demo.css && demo.css.content || '');

           var jsInput = angular.element('<textarea type="text" name="js">')
           .val(demo.javascript && demo.javascript.content || '');

           form
           .css('display','none')
           .append(htmlInput)
           .append(cssInput)
           .append(jsInput);

           document.body.appendChild(form[0]);
           form[0].submit();

           $ionicLoading.show({
             template: 'Opening in Scratchpad...'
           });
    };
    
})
.filter('humanize', function() {
  return function(input) {
    return input.charAt(0).toUpperCase() +
      input.substring(1).replace(/[A-Z]/g, function(match, i) {
        return ' ' + match.toUpperCase();
      });
  };
});

