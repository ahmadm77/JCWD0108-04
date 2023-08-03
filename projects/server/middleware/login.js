const {body, validationResult } = require('express-validator');

module.exports = {
  vLogin : async (req, res, next) => {
    try {
      await body('username').trim().notEmpty().withMessage('Username cannot be empty').run(req);
      await body('password').trim().notEmpty().withMessage('Password cannot be empty').run(req);
      
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