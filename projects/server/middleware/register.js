const {body, validationResult } = require('express-validator');

module.exports ={
  vRegis : async(req, res, next) =>{
    try {
      await body('username').trim().notEmpty().isLength({min: 5, max: 15}).withMessage('Username must be 5 - 15 characters long').run(req);
      await body('password').trim().notEmpty().isStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers : 1,
        minSymbols : 1
      }).withMessage('Password must be a combination of 1 uppercase, 1 number and 1 symbol').run(req);
      await body('email').trim().notEmpty().isEmail().run(req);

      const validation = validationResult(req);
      if (validation.isEmpty()) {
        next();
      }else{
        res.status(400).send({
          status : false,
          message : 'Validation Invalid',
          error : validation.array()
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}