const User = require("../models/User");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const uuid4 = require("uuid4");
const {planConfirm, planCancel} = require('../lib/emailManager')

//errors and validation

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  const invalidEmail = {
    code: "VALIDATION",
    field: "email",
    message: "Please enter a valid email.",
  };
  
  const invalidDetails = {
    code: "VALIDATION",
    field: "details",
    message: "Please enter a valid details.",
  };
  
  const invalidToken = {
    code: "VALIDATION",
    message: "Request failed. Please request new activation link and try again.",
  };
  
  
  const existEmail = {
    code: "VALIDATION",
    field: "email",
    message: "Email already exist. Please enter a valid email.",
  };
  
  const invalidPwd = {
    code: "VALIDATION",
    field: "password",
    message: "Please enter a valid password.",
  };

  


  exports.plan = async (req, res, next) => {
    
    const { email, subId } = req.body;
    const validErrors = [];
    const isValidEmail = email && validateEmail(email);
    if (!isValidEmail) {
      validErrors.push(invalidEmail);
    }
    if (!subId) {
      res.status(422).send(invalidDetails);
      return;
    }

    try {
      
      const isUserExist = await User.findOne({ email });
  
      if (isUserExist) {
        
        isUserExist.plan = subId;
        const savedUser = await isUserExist.save();
        console.log(savedUser);
        //send confirmation email
        planConfirm(savedUser)
        return res.status(200).send({
          user: User.toClientObj(savedUser),
          message: "Subscription upgraded successfully.",
        });
      } else {
        console.log("user not found: ", isUserExist);
        res.status(422).send(invalidEmail);
        return;
  
      }

      
  
      
    } catch (err) {
      console.log("Reset password err: ", err);
    }
  };

  exports.pkeys = async (req, res, next) => {
    
    return res.status(200).send({
      key: process.env.PAYPALKEY,
    });
  };

  exports.cancel = async (req, res, next) => {
    const { email, message } = req.body;
    
  
    const validErrors = [];
    const isValidEmail = email && validateEmail(email);
    if (!isValidEmail) {
      validErrors.push(invalidEmail);
    }
    if (!message) {
      validErrors.push(invalidDetails);
    }
    if (validErrors.length) {
      const sumErrors = {
        error: true,
        errors: validErrors,
      };
  
      res.status(422).send(invalidDetails);
      return;
    }

    try {
      const isUserExist = await User.findOne({ email });
  
      if (isUserExist) {
        isUserExist.plan = "Basic";
        const savedUser = await isUserExist.save();
        console.log(savedUser);
        //send email to admin with client msg,email for admin manual paypal confirmation
        //send email to client
        planCancel(savedUser)
        return res.status(200).send({
          user: User.toClientObj(savedUser),
          message: "Subscription downgraded successfully.",
        });
      } else {
        console.log("user not found: ", isUserExist);
        res.status(422).send(invalidEmail);
        return;
  
      }
  
      
    } catch (err) {
      console.log("Reset password err: ", err);
    }
  };

  const updateUser = async (email, subId) => {
    const isUserExist = await User.findOne({ email });
  
      if (isUserExist) {
        
        isUserExist.plan = subId;
        const savedUser = await isUserExist.save();
        console.log(savedUser);
        planConfirm(savedUser)
        updated = User.toClientObj(savedUser);
        return "Subscription upgraded successfully."
        
      } else {
        console.log("user not found: ", isUserExist);
        
        return;
      }
  }

  exports.plansignin = async (req, res, next) => {
    const { email, password, subId } = req.body;
    let updated
    console.log('this is sign in and pay')
    const validErrors = [];
    const isValidEmail = email && validateEmail(email);
    if (!isValidEmail) {
      validErrors.push(invalidEmail);
    }
    if (!password) {
      validErrors.push(invalidPwd);
    }
    if (validErrors.length) {
      const sumErrors = {
        error: true,
        errors: validErrors,
      };
  
      res.status(422).send(invalidEmail);
      return;
    }

    updated = updateUser(email, subId)
    
    passport.authenticate("local", (err, user, info) => {
      console.log('passport token begins: ', user)
      if (err) {
        res.status(422).send(invalidEmail);
        return next(err);
      }
  
      if (!user) {
        res.status(422).send(info);
        return;
      }
  
      if(!user.activated){
        res.send(invalidToken);
        return;
      }
  
      const userObj = user.toObject();
      const tokenObj = {
        _id: userObj._id,
      };
      const jwtToken = jwt.sign(
        tokenObj,
        process.env.JWT_SECRET || "TEMP_JWT_SECRET",
        {
          expiresIn: 86400, // sec a day
        }
      );
      
      updated = User.toClientObj(user)
        //send upgrade confirmation email to client
        planConfirm(updated)
      res.send({
        token: jwtToken,
        user: updated,
      });
      console.log('logged: ', user)
      return;
    })(req, res, next);
  };



 