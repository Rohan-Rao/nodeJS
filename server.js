var express = require('express');
var jobSchema = require('./app/models/job');
var app = express();
app.use(express.json())
var router = express.Router();

var jobList = [];
jobList.push(new jobSchema(jobList.length, 
                          "Software Engineer", 
                          "Harbinger Systems", 
                          "Pune"));

router.get('/', function(req,res){
    res.send('Welcome to Job Portal');
});

router.get('/jobs', function(req,res){
    res.send(jobList);
});

router.post('/jobs', function(req, res){
    jobList.push(new jobSchema(jobList.length,
                               req.body.designation,
                               req.body.company_name,
                               req.body.location));
    res.send(jobList);
});

router.put('/jobs/:id',function(req, res){
    console.log(req.params);
    jobList[req.params.id].designation = req.body.designation;
    jobList[req.params.id].company_name = req.body.company_name;
    jobList[req.params.id].location = req.body.location;
    res.send(jobList[req.params.id]);
});

router.delete('/jobs/:id', function(req, res){
    jobList.splice(req.params.id,1);
    res.send(jobList);
})

app.use('/', router);
app.listen(6677);
console.log("Node Server listening on port 6677");