/**
 * Previous state.
 *
 * @param $state
 * @param $rootScope
 * @returns {{name: null, params: null, go: *}}
 * @ngInject
 */
function $previousState($rootScope, $state) {
  var previousState = {
    name: null,
    params: null,
    initialize: initialize,
    go: go
  };

  return previousState;

  //////////////////////////////

  /**
   * Initialize.
   */
  function initialize() {
    $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
      previousState.name = fromState ? fromState.name : null;
      previousState.params = fromParams ? fromParams : null;
    });
  }

  /**
   * Go to the previous state or a default state.
   *
   * @param defaultState
   * @param defaultParams
   */
  function go(defaultState, defaultParams) {
    if (previousState.name) {
      $state.go(previousState.name, previousState.params);
    } else {
      $state.go(defaultState, defaultParams);
    }
  }
}

/**
 * Run.
 *
 * @param $previousState
 * @ngInject
 */
function run($previousState) {
  $previousState.initialize();
}

angular.module("ui.router.previous", []);
angular.module("ui.router.previous").service("$previousState", $previousState);
angular.module("ui.router.previous").run(run);
