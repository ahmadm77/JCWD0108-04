const useController = {
  greet : async (req, res) => {
    res.send('hello world');
  },
  forgotPassword : async (req,res)=>{
    try {
      const {email} = req.body;
      const isEmailExist = await user.findOne({
        where : {
          email : email
        }
      });
      if (isEmailExist !== null) {
        const {id, username, email} = isEmailExist;
        const token = jwt.sign({id, username, email}, 'ahmad123');
        await transporter.sendMail({
          from : 'ahmadmawardi007@gmail.com',
          to : email,
          subject : 'test',
          html :'<h1> Success </h1>'
        })
        res.status(200).send({
          message : 'check your mail',
          token
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
}

module.exports = useController;