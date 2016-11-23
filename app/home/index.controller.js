(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller($scope, UserService, TaskService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.tasks = null;
        vm.projects=null;
        vm.getSelTasks = getSelTasks;

        initController();
        // getTasks();
        
        getProjects();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }

        /*function getTasks(){
            TaskService.getTasks().then(function (tasks){
                vm.tasks = tasks;
            });
        }*/

        function getSelTasks(){
            var project = vm.task.projectName.ProjectName;
            
            TaskService.getSelTasks(project).then(function(tasks){

                $scope.tasks = tasks;
            });
        }

        function getProjects(){                                                  
            TaskService.getAllProjects()
            .then(function (projects){
                vm.projects = projects;
            });
        }

        
    }

})();