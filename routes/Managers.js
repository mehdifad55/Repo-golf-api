const router = require('express').Router(); 
const verify = require('./verifytoken');
const Manager = require('../models/Manager');
const {managerValidation} = require('../validation')





router.post('/', verify, async (req,res) => { 
    //Validation de data
    const {error} = managerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message); 
    //Checking si le manager existe 
    const emailExist = await Manager.findOne({ email: req.body.email });
   if (emailExist) return res.status(400).send('Email already exists');
   //creer un manager
    const manager = new Manager({
        nom: req.body.nom,
        prenom:req.body.prenom,
        email: req.body.email,
        telephone: req.body.telephone
    });
    try{
        const savedManager = await manager.save();
        res.json(savedManager);


    }catch(err){
        res.json({ message: err });
    }
 });
//Retour un Manager
router.get('/:ManagerId',verify,async (req,res) => {
    try{
   const manager= await  Manager.findById(req.params.ManagerId);
   res.json(manager);
    }catch(err){
        res.json({message: err});
    }

});
//mettre a jour un manager
router.patch('/:ManagerId',verify, async (req,res) => {
    try{
   const updatedManager = await Manager.updateOne({_id: req.params.ManagerId},{ $set: {nom:req.body.nom,
                                                                            prenom:req.body.prenom,
                                                                            email:req.body.email,
                                                                            telephone:req.body.telephone }});
   res.json(updatedManager);

    }catch(err){
        res.json({message: err});
    }

});
//Supprimer un manager
router.delete('/:ManagerId',verify, async (req,res) => {
    try{
   const removedManager = await Manager.remove({_id: req.params.ManagerId});
   res.json('manager supprimé');

    }catch(err){
        res.json({message: err});
    }

})


 
 
 








module.exports = router;
