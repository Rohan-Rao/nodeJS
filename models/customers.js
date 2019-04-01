const mongoose = require('mongoose');
const Joi =  require('Joi');

const customerModel =  mongoose.model('customers', new mongoose.Schema({
    custId: {
         type: Number,
         required: true
    },
    custName:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    custPhone:{
     type: String,
     required: true,
     minlength: 10,
     maxlength: 10     
    },
    isGold:{
        type: Boolean,
        required: true,   
    }
 })
);

function validateCustomer(obj){
    const schema = Joi.object().keys({
        custId: Joi.number().greater(0).required(),
        custName: Joi.string().regex(/^[a-zA-Z\s]*$/).min(3).max(20).required(),
        custPhone: Joi.string().length(10).required(),
        isGold: Joi.boolean()
    })

    return schema.validate(obj);
}

exports.customerModel = customerModel;
exports.validateCustomer = validateCustomer;