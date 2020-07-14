var User  = require('../models/user'); // get our mongoose model

function getUser(req,res){
    User.findById(req.params.user_id, function(err, user){
        if(err){
          return res.status(500).json({
            message: 'Error obteniendo el usuario'
          });
        }
        if(!user){
          return res.status(404).json({
            message: 'No existe el usuario'
          });
        }
        return res.json(user);
      })
}

function getUsers(req,res){
    if(req.query.page){
        var perPage = 5
        var page = req.query.page || 1
        User.find({}).skip((perPage * page) - perPage).limit(perPage).exec(function(err, users){
          User.count().exec(function(err,count){
            if(err)return res.status(500).json({
              message: 'Error obteniendo los usuarios'
            });
            return res.json({users})
          })
        })
      }
      else{
      User.find({}, function(err, users) {
        if(err){
          return res.status(500).json({
            message: 'Error obteniendo los usuarios'
          });
        }
        return res.json(users);
      });
    }
}

function createUser(req,res){
    let user = new User()
    user.name = req.body.name
    user.email = req.body.email
    user.password = req.body.password
  
    user.save(function(err, user) {
      if(err){
        return res.status(500).json({
          message: 'Error al crear el usuario'
        });
      }
      //console.log('User saved successfully');
      return res.json(user);
    });
}
function updateUser(req,res){
    User.findById(req.params.user_id, function(err, user){
        if(err){
          return res.status(500).json({
            message: 'Error al crear el usuario'
          });
        }
        if(!user){
          return res.status(404).json({
            message: 'No existe el usuario'
          });
        }
      
        if(req.body.name)user.name = req.body.name;
        if(req.body.password)user.password = req.body.password; 
        if(req.body.email)user.email = req.body.email;
        if(req.body.displayName)user.displayName = req.body.displayName;
        if(req.body.avatar)user.avatar = req.body.avatar;
        if(req.body.admin)user.admin = req.body.admin;

    
        user.save(function(err,user){
          if(err){
            return res.status(500).json({
              message: 'Error buscando al usuario'
            });
          }
          if(!user){
            return res.status(404).json({
              message: 'No existe el usuario'
            });
          }
          res.json({message: 'Usuario actualizado'})
        })
      });
}

function deleteUser(req,res){
    User.remove({
        _id: req.params.user_id
    }, function(err, user) {
        if (err){
          return res.status(500).json({
            message: 'Error obteniendo el usuario'
          });
        }
  
        res.json({ message: 'Usuario borrado' });
    });

}

module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser
}