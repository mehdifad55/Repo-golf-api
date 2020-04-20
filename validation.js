//Validation

const Joi = require('@hapi/joi');
 
//Validation enregistrement 

const registerValidation = data => {

  const schema = Joi.object({
     nom: Joi.string().min(6).required(),
     email: Joi.string().min(6).required().email(),
     prenom: Joi.string().min(6).required(),
     MDP:Joi.string().min(6).required()
   }); 
   return schema.validate(data);

};

const loginValidation = data => {

    const schema = Joi.object({
       email: Joi.string().min(6).required().email(),
       MDP: Joi.string().min(6).required()
     }); 
     return schema.validate(data);
  
  };
  const managerValidation = data => {

    const schema = Joi.object({
       nom: Joi.string().min(6).required(),
       prenom: Joi.string().min(6).required(),
       email: Joi.string().min(6).required().email(),
       telephone: Joi.number().min(1000000000).max(9999999999).required()
     }); 
     return schema.validate(data);
  
  };



module.exports.registerValidation = registerValidation;

module.exports.loginValidation = loginValidation;

module.exports.managerValidation = managerValidation;

