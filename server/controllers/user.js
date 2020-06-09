const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');

function signUp(req, res){
   const user = new User();
   const {email, password, repeatPassword,  name, lastname}= req.body;
   user.name = name;
   user.lastname = lastname;
   user.email= email;
   user.role="admin";
   user.active=false;

   if(!password || !repeatPassword){
       res.status(404).send({message: "las constaseñas son obligatorias"})
   }else{
       if(password !== repeatPassword){
           res.status(404).send({message: "las contaseñas no son iguales"})
       }else{
           bcrypt.hash(password, null, null, function(err, hash){
               if(err){
                   res.status(500).send({message: "error al encriptar la contraseña"})
               }else{
                user.password= hash;
                user.save((err, userStored) =>{
                    if(err){
                        res.status(500).send({message: "el usuario ya existe"})
                    }else{
                        if(!userStored){
                            res.status(400).send({message: "error al crear el usuario"})
                        }else {
                            res.status(200).send({user: userStored})
                        }
                    }
                })
               }
           })
      
       }
   }


};

module.exports ={
    signUp
}