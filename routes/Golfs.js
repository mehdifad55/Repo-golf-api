const router = require('express').Router(); 
const verify = require('./verifytoken');
const Golf = require('../models/Golf');
//Renvoi tous les Golfs
router.get('/', async (req,res) =>{
   try{
       const Golfs = await Golf.find();
       res.json(Golfs);

   }catch(err){
       res.json({message:err});
   }
});

//Un Golf Specific
router.get('/:GolfId',async (req,res) => {
    try{
   const golf= await  Golf.findById(req.params.GolfId);
   res.json(golf);
    }catch(err){
        res.json({message: err});
    }

});

//CREER UN GOLF
router.post('/',verify, async (req,res) => {  
    const golf = new Golf({
        titre: req.body.titre,
        latitude:req.body.latitude,
        longitude: req.body.longitude,
        description: req.body.description,
        manager: req.body.manager
    });
    try{
        const savedGolf = await golf.save();
        res.json(savedGolf);

    }catch(err){
        res.json({ message: err });
    }
 });

 //Suprimer un golf

router.delete('/:GolfId',verify, async (req,res) => {
    try{
   const removedGolf = await Golf.remove({_id: req.params.GolfId});
   res.json(removedGolf);

    }catch(err){
        res.json({message: err});
    }

});

//mettre a jour un golf
router.patch('/:GolfId',verify, async (req,res) => {
    try{
   const updatedGolf = await Golf.updateOne({_id: req.params.GolfId},{ $set: {titre:req.body.titre,
                                                                            description:req.body.description,
                                                                            longitude:req.body.longitude,
                                                                            latitude:req.body.latitude }});
   res.json(updatedGolf);

    }catch(err){
        res.json({message: err});
    }

});


 
 
 








module.exports = router;