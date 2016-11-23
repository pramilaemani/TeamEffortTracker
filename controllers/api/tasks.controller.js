var config = require('config.json');
var express = require('express');
var router = express.Router();
var taskService = require('services/task.service');


/*router.get('/getAllTasks:_id', getAllTasks);*/
router.get('/getAllTasks', getAllTasks);
router.get('/getSelTasks/:project', getSelTasks);
router.post('/createTask', createTask);
router.get('/getAllProjects', getAllProjects);
router.get('/getAllStatus', getAllStatus);

module.exports = router;

function getAllTasks(req, res) {

    taskService.getAllTasks()
    .then(function(tasks){
    	if (tasks) {    		
                res.json(tasks);
            } else {
                res.sendStatus(404);
            }
    })
    .catch(function(err){    	
    	res.status(400).send(err);
    });
}

function getSelTasks(req, res) {    
    taskService.getSelTasks(req.params.project)
    .then(function(tasks){
        if (tasks) {            
                res.json(tasks);
            } else {
                res.sendStatus(404);
            }
    })
    .catch(function(err){
        res.status(400).send(err);
    });
}

function createTask(req, res) {
    taskService.createTask(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAllProjects(req, res){
    taskService.getAllProjects()
    .then(function(projects){
        if (projects) {            
                res.json(projects);
            } else {
                res.sendStatus(404);
            }
    })
    .catch(function(err){
        res.status(400).send(err);
    });
}

function getAllStatus(req, res){
    taskService.getAllStatus()
    .then(function(status){
        if (status) {            
                res.json(status);
            } else {
                res.sendStatus(404);
            }
    })
    .catch(function(err){
        res.status(400).send(err);
    });

}