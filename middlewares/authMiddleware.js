const JWT = require('jsonwebtoken')
// import { message } from 'antd';

// req and res is normal callback function
// next is used for further execute 
module.exports = async (req, res, next) =>{
  try {
    const token = req.headers['authorization'].split(" ")[1];  // use Array index 1 because a bearer name use in start of the token and have some space so we can remove the space through split
  JWT.verify(token, process.env.JWT_SECRET,(err, decode) =>{
    if(err){
      return res.status(200).send({message: "Auth Fail", success: false});
    }else{
      req.body.userId = decode.id
      next();
    }
  });
  } catch (error) {
    console.log(error);
    req.status(401).send({message: "Auth Fail", success: false})
  }
}