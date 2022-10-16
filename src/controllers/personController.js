//creating a router for every call from /person...
const router = require('express').Router();

const { json } = require('express/lib/response');
const Person = require('../models/person');

//creating a user , using router 
//(we don't need to use /person because we are declaring it in the index, where the routment started)

router.post('/', async (req, res) => {
    const { name, level, approved } = req.body
  
    const person = {
      name,
      level,
      approved,
    }
    if (!name){
        res.status(401).json({error:"The name is mandatory!"});
        return;
    }
  
    try {
      await Person.create(person)
  
      res.status(201).json({ message: 'User created with success!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  });

  router.get('/', async (req,res)=>{
    try{
      const people = await Person.find();
      res.status(200).json(people);
    }catch(e){
        res.status(400).json({error:e});
    }
  });

  //extracting info from the url parameters (id)
  //get person by id
  router.get('/:id',async (req,res)=>{
      const id = req.params.id;
      try{
        const person = await Person.findOne({_id:id});
        res.status(200).json(person);
      }catch (e){
        res.status(422).json({error: "Invalid user ID"});
      }

  });

  //Update user by id
  router.patch('/:id' , async (req,res)=>{
    const id = req.params.id;
    
    const {name, level, approved} = req.body;
    const person = { name, level, approved};

    try{
      const updatedPerson = await Person.updateOne({ _id : id } , person);
      res.status(200).json({message: "User updated!"});
    }catch (e){
      res.status(422).json({error: "Invalid user ID"});
    }

  });

  router.delete('/:id', async (req,res) => {
    const id = req.params.id;
      try{
        await Person.deleteOne({_id : id});
        res.status(200).json({message : `User ${id} deleted!`});

      }catch (e){
        res.status(422).json({error: "Invalid user ID"});
      }
  });

  module.exports = router;