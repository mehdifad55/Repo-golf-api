const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation') ;



router.post('/register', async (req,res) => {
      //validation de DATA
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

   //checking si l'utilisateur existe deja dans la DB
   const emailExist = await User.findOne({ email: req.body.email });
   if (emailExist) return res.status(400).send('Email exist');
   //cacher le MDP
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash( req.body.MDP, salt);

    
  //creation nouvel utilisateur
    const user = new User({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        MDP: hashedPassword
    });
    try{
       const savedUser = await user.save();
       res.send({ user: user._id });
    }catch(err){
        res.status(400).send(err);
    }
});

//LOGIN
router.post('/login', async (req,res) => {
    //validation de data 
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    // checking si l'email existe
    const user = await User.findOne({ email: req.body.email });
   if ( !user ) return res.status(400).send('Email inconnu');
   //checking si le mdp est correcte
   const validPass = await bcrypt.compare(req.body.MDP, user.MDP);
   if(!validPass) return res.status(400).send('MDP incorrecte');

   //Creation De Token 
   const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
   res.header('auth-token', token);
   res.send('Connection réussie');

});


 

module.exports = router;