(function() {

    angular
      .module('app')
      .controller('WaNavController', WaNavController)
      .controller('WaNewSourceFormController', WaNewSourceFormController)
      .controller('WaSourceController', WaSourceController)
      .controller('WaMainController', WaMainController)
      .controller('WaShowSourceController', WaShowSourceController)
      .controller('WaEditController', WaEditController)


    function WaNavController() {

    }

    function WaNewSourceFormController($http) {
      const vm = this;

      vm.createSource = function() {
        $http.post('/api/sources', vm.newSource).then((response) => {
          vm.sources.push(response.data);
        })
        vm.showForm = false;
        delete vm.newSource;
      }
    }

    function WaSourceController() {
      const vm = this;

    }

    function WaMainController($http) {
      const vm = this;

      vm.$onInit = function() {
        $http.get('/api/sources').then((response) => {
          vm.sources = response.data;
        })
      }

      vm.toggleForm = function() {
        vm.showForm = !vm.showForm;
      }
    }

    function WaShowSourceController($http, $stateParams) {
      const vm = this;

      vm.$onInit = function() {
        $http.get(`/api/sources/${$stateParams.id}`).then((response) => {
          vm.source = response.data;
        })
      }
    }

    function WaEditController($http, $stateParams, $state) {
      const vm = this;

      vm.$onInit = function() {
        $http.get(`/api/sources/${$stateParams.id}`).then((response) => {
          vm.editSource = response.data;
        })
      }

      vm.updateSource = function() {
        $http.patch(`/api/sources/${$stateParams.id}`, vm.editSource).then((response) => {
          $state.go('dashboard')
        })
      }

      vm.deleteSource = function() {
        $http.delete(`/api/sources/${$stateParams.id}`).then((response) => {
          $state.go('dashboard')
        })
      }
    }
})();
