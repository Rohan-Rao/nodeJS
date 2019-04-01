const express  = require('express');
const router = express.Router();
const { customerModel, validateCustomer } = require('./../models/customers');

router.get('/', function(req, res){
    customerModel.find((err, result)=>{
        if(err) return res.status(404).send('No Customers');
        return res.status(200).send(result);
    })
});

router.get('/:id', function(req, res){
    customerModel.find({custId: req.params.id}, (err, result) => {
        if(err) return res.status(404).send(err);
        return res.status(200).send(result);
    })
});

router.post('/', function(req, res){
    const {error} = validateCustomer(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    customerModel.create(req.body, (err, result) => {
        if(err) return res.status(404).send(err);
        return res.status(200).send(result);
    });
});

router.put('/:id', function(req, res) {
    //console.log(req.body, req.params.id);
    const {error} = validateCustomer(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    customerModel.findOneAndUpdate({custId: req.params.id}, {$set: { custId: req.body.custId,
                                                                     custName: req.body.custName,
                                                                     custPhone: req.body.custPhone,
                                                                     isGold: req.body.isGold
                                                                    }}, {new: true}, (err, result)=>{
        if(err) return res.status(404).send(err);
        if(!result) return res.status(200).send('No match found');
        return res.status(200).send(result);
                               
    })
});

router.delete("/:id", function(req, res){
    customerModel.deleteOne({custId: req.params.id}, (err, result) => {
        if(err) return res.status(404).send(err);
        return res.status(404).send(result);
    })
});



module.exports = router;