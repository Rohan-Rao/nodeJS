const express = require('express');
const {genreModel, validateGenre }  = require('./../models/genre');
const router = express.Router();

router.get('/', (req, res) =>{
    genreModel.find((err, result) => {
        if(err) return res.status(404).send("No genres");
        return res.status(200).send(result);
    })
});

router.get('/:genreId', (req,res) => {
    genreModel.find({genreId: req.params.genreId}, (err, result) => {
            if(err) return res.status(404).send("No genre with the givrn id");
            return res.status(200).send(result);
    });
});

router.post('/', (req, res) =>{  
    const requestBody = req.body;
    const {error} = validateGenre(requestBody);
    if(error) return res.status(400).send(error.details[0].message);
    genreModel.insertMany(requestBody, function(err, doc){
        if(err)
            return res.status(404).send(err);    
        res.status(200).send(doc);    
    });
    
})

router.put('/:id', (req, res) => {
    const {error} = validateGenre(req.body.genreName);
    if(error) return res.status(400).send(error.details[0].message);
   
    genreModel.update({genreId: req.params.id},
                      {$set:{genreName: req.body.genreName}},
                      (err, numAffected) => {
                          if(err) return res.status(404).send("Genre not found");
                          res.status(200).send(numAffected); 
                      }
    )
});

router.delete('/:id', (req, res) => {
    genreModel.remove({genreId: req.params.id}, 
                      (err) => {
                          if(err) return res.status(404).send("Genre not found");
                          return res.status(200).send(`Record id- ${req.params.id} deleted successfully`);
                      });
});
module.exports = router;