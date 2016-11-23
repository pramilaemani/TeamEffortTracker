(function () {
    'use strict';

    angular
        .module('app')
        .controller('Task.IndexController', taskController);

    function taskController($window, $scope, TaskService, UserService, FlashService) {
        var vm = this;
        vm.users=null;
        vm.projects=null;
        vm.status=null;
        vm.createTask = createTask;

        
        getProjects();
        getAllUsers();
        getStatus();


        function createTask() {
            TaskService.createTask(vm.task)
                .then(function () {
                    FlashService.Success('Task created');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function getProjects(){
            TaskService.getAllProjects()
            .then(function (projects){
                vm.projects = projects;
            });
        }

        function getStatus(){
            TaskService.getAllStatus()
            .then(function (status){
                vm.status = status;
            });
        }

        function getAllUsers(){
            UserService.GetAllUsers()
            .then(function (users){
                vm.users = users;
            });
        }                     
    }

})();