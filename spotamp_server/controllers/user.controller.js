let mongoose = require('mongoose')

import User from '../models/user.model'


export const getUsers = (req, res) => {
  User.find().exec((err, users) => {
    if (err) return res.json({'success' : false, 'message' : 'Error, couldn\'t get all users'})
    return res.json({'success' : true, 'message' : 'Users fetched successfully', users})
  })
}

export const addUser = (req, res) => {
  const newUser = new User(req.body)
  newUser.save((err, user) => {
    if (err) return res.json({'success' : false, 'message' : 'Error, couldn\'t add user'})
    return res.json({'success' : true, 'message' : 'User added successfully', user})
  })
}

export const updateUser = (req,res) => {
  User.findOneAndUpdate({ _id:req.body.id }, req.body, { new:true }, (err,user) => {
    if(err){
      return res.json({'success':false,'message':'rror, couldn\'t update user','error':err});
    }
    console.log(user);
    return res.json({'success':true,'message':'Updated successfully',user});
  })
}


export const getUser = (req,res) => {
  User.find({_id:req.params.id}).exec((err,user) => {
    if(err){
      return res.json({'success':false,'message':'Couldn\'t get the user'});
    }
    if(user.length){
      return res.json({'success':true,'message':'User fetched by id successfully',user});
    }
    else{
      return res.json({'success':false,'message':'User with the given id not found'});
    }
  })
}

export const deleteUser = (req,res) => {
  User.findByIdAndRemove(req.params.id, (err,user) => {
    if(err){
      return res.json({'success':false,'message':'Couldn\'t delete user'});
    }
    return res.json({'success':true,'message':user.first_name+' deleted successfully'});
  })
}
