var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('tasks');

var service = {};

service.createTask = createTask;
service.getAllTasks = getAllTasks;
service.getSelTasks = getSelTasks;
service.getAllProjects = getAllProjects;
service.getAllStatus = getAllStatus;

module.exports = service;


function getAllTasks(){
	var deferred = Q.defer();    
	db.tasks.find().toArray(function(err, result){
		if (err) 
			deferred.reject(err.message);
		if (result){    
            deferred.resolve(result);
		}        
	});    
	return deferred.promise;
}

function getSelTasks(project){  
  var deferred = Q.defer();
  db.tasks.find({'projectName':project}).toArray(function(err, result){
    if (err) 
      deferred.reject(err.message);
    if (result){
    console.log(result);
            deferred.resolve(result);
    }        
  });    
  return deferred.promise;
}

function getAllProjects(){
  var deferred = Q.defer();
  db.bind('projects');    
  db.projects.find().toArray(function(err, result){
    if (err) 
      deferred.reject(err.message);
    if (result){            
            deferred.resolve(result);
    }        
  });    
  return deferred.promise;
}

function getAllStatus(){
  var deferred = Q.defer(); 
  db.bind('taskStatuses');   
  db.taskStatuses.find().toArray(function(err, result){
    if (err) 
      deferred.reject(err.message);
    if (result){            
            deferred.resolve(result);
    }        
  });    
  return deferred.promise;
}

function createTask(taskParam){
   var deferred = Q.defer();
   //check if the task exists
   db.tasks.findOne({"TaskName":taskParam.taskName, 
                     "TaskStatus":taskParam.taskStatus}, function(err, task){
            if (err) deferred.reject(err.name + ': ' + err.message);
            if (task) {
                deferred.reject("TaskName " +taskParam.taskName+" already exists");
            }   else {
                create();
                    }
                });
   
   function create(){

    var task = { taskName :  taskParam.taskName, 
                 projectName : taskParam.projectName.ProjectName, 
                 username : taskParam.username.username, 
                 status : taskParam.status.status, 
                 estimatedStartDate : new Date(taskParam.estimatedStartDate),
                 estimatedEndDate :  new Date(taskParam.estimatedEndDate), 
                 actualStartDate : new Date(taskParam.actualStartDate), 
                 estimatedEffort : taskParam.estimatedEffort,
                 actualEffort : taskParam.actualEffort, 
                 actualEndDate : new Date(taskParam.actualEndDate)};
                     
    db.tasks.insert(
            task,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });

   }
   return deferred.promise;
}

