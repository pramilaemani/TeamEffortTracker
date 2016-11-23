(function (){
	'use strict;'

	angular.module('app').factory('TaskService', Service);


	function Service($http, $q){

		var service = {};

		service.getTasks = getTasks;
		service.createTask = createTask;
		service.getAllProjects = getAllProjects;
		service.getAllStatus = getAllStatus;
		service.getSelTasks = getSelTasks;

		return service;
		

		function getTasks(){
			return $http.get('/api/tasks/getAllTasks').then(handleSuccess, handleError);
		}

		function createTask(task){
			return $http.post('/api/tasks/createTask', task).then(handleSuccess, handleError);
		}

		function getAllProjects(){
			return $http.get('/api/tasks/getAllProjects').then(handleSuccess, handleError);
		}

		function getSelTasks(project){
			return $http.get('/api/tasks/getSelTasks/' + project).then(handleSuccess, handleError);
		}

		function getAllStatus(){
			return $http.get('/api/tasks/getAllStatus').then(handleSuccess, handleError);
		}
		
		//Private functions
		function handleSuccess(res) {			            
            return res.data;
        }

        function handleError(res) {

            return $q.reject(res.data);
        }

	}

})();