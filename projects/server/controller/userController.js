
const db = require('../models');
const user = db.user;
const product = db.product;
const category = db.category;
const jwt = require('jsonwebtoken');
const enc = require('bcrypt');
const userController = {
  login : async (req, res) => {
    try {
      const {username, password} = req.body;
      const isExist = await user.findOne({
        where : {username : username}
      });

      if (isExist == null) {throw({message:'User not found!'})}
      // const isValid =  await enc.compare(password, isExist.password);
      // if (!isValid) {throw({messge:'Wrong Password'})}
      const payload = {id : isExist.id, username : isExist.username}
      const token = jwt.sign(payload, 'minpro3');
      res.status(200).send({
        message : 'Login success',
        token
      });
    } catch (error) {
      res.status(400).send(error); 
    }
  },
  getProducts : async (req, res) => {
    try {
      const page = +req.query.page || 1;
      const limit = +req.query.limit || 10;
      // console.log(req.query.categoryId);
      const clause = [];
      if (req.query.categoryId) {
        clause.push({categoryId: req.query.categoryId})
      }
      console.log(clause);
      const getProducts = await product.findAll({
        where : clause,
        limit,
        offset : limit * (page - 1)
      });
      const total = await product.count({
        where : clause
      });

      console.log(total);
      res.status(200).send({
        status : 'OK',
        currentPage : page,
        totalPage : Math.ceil(total/limit),
        getProducts
      });

    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }

  },
  changeProfile : async (req, res)=>{
    try {
      if (req.file == undefined) {
        throw({message : 'file kosong'});
      }
      const setData = await user.update(
        {profileImg : req.file.filename},
        {where :{
          id : req.user.id
      }});
      res.status(200).send({
        message : 'sukses'
      });


  }catch (error){
    res.status(400).send(error)
  }
},
  getCategories : async (req, res) => {
    try {
      const getCategories = await category.findAll({
        order : [['id', 'ASC']]
      });
      res.status(200).send({
        status : 'OK',
        getCategories
      })

    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = userController;