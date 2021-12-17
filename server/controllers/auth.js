const User = require("../models/User");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const uuid4 = require("uuid4");
const {activationEmail, resetEmail, updateUser} = require('../lib/emailManager')

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

  
  exports.signup = async (req, res, next) => {
    const { name, email, password, subId } = req.body;
  
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
  
      res.send(sumErrors);
      return;
    }
  
    //save regInfo to DB
    try {
      const isUserExist = await User.findOne({ email });
      if (isUserExist) {
        res.status(422).send(existEmail);
      } else {
        let newUser = new User({
          name,
          email,
          password,
          activated: false,
          activationToken: uuid4(),
          activationTokenSentAt: Date.now(),
          plan: subId,
          alerts: true
        });
        const savedUser = await newUser.save();
        activationEmail(savedUser);
        console.log(savedUser);
        res.status(200).send({
          user: User.toClientObj(savedUser),
        });
      }
    } catch (err) {
      console.log("reg err: ", err);
    }
  };
  
  exports.signin = async (req, res, next) => {
    const { email, password } = req.body;
  
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
  
    passport.authenticate("local", (err, user, info) => {
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
  
      res.send({
        token: jwtToken,
        user: User.toClientObj(user),
      });
      console.log('logged: ', user)
      return;
    })(req, res, next);
  };
  
  exports.userAuth = async (req, res, next) => {
    const loggedUser = User.toClientObj(req.user)
    res.send({
      user: req.user ? loggedUser : false
    });
  };
  
  exports.activate = async (req, res, next) => {
    const { activationToken } = req.body;
    
  
    if (!activationToken) {
      res.status(422).send(invalidToken);
      return;
    }
    try {
      const isUserExist = await User.findOne({ activationToken: activationToken });
  
      if (isUserExist) {
        isUserExist.activated = true;
        isUserExist.activationToken = undefined;
        isUserExist.activatedAt = Date.now();
        const savedUser = await isUserExist.save();
        console.log(savedUser);
        return res.status(200).send({
          user: User.toClientObj(savedUser),
          message: "Activation completed successfully.",
        });
      } else {
        console.log("user not found: ", isUserExist);
        res.status(422).send(invalidDetails);
        return;
  
      }
  
      
    } catch (err) {
      console.log("activation err: ", err);
    }
  };
  
  
  exports.activationLink = async (req, res, next) => {
    const { email } = req.body;
    
    if (email) {
      try {
        const isUserExist = await User.findOne({ email });
        if (isUserExist && !isUserExist.activated) {
          isUserExist.activationToken = uuid4()
          isUserExist.activationTokenSentAt= Date.now()
          await isUserExist.save();
          activationEmail(isUserExist);
          res.send({
            message: 'Activation link has been sent.',
            a: isUserExist.activationToken
          })
          
          } else {
            res.status(422).send(invalidEmail);
          };
        } catch (err) {
          res.status(422).send(invalidEmail);
        console.log("Activation link err: ", err);
        }
      
    } else {
      res.status(422).send(invalidEmail);
     return;
    }
  
    
  
  }
  
  exports.resetLink = async (req, res, next) => {
    const { email } = req.body;
    
    if (email) {
      try {
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
          isUserExist.passwordToken = uuid4()
          isUserExist.passwordTokenSentAt= Date.now()
          await isUserExist.save();
          resetEmail(isUserExist)
          res.send({
            message: 'Reset password link has been sent.',
            a: isUserExist.passwordToken
            
          });
          
        } else {
          res.status(422).send(invalidEmail);

        }} catch (err) {
          res.status(422).send(invalidEmail);
        console.log("Password link err: ", err);
        }
      
    } else {
      res.status(422).send(invalidEmail);
     return;
    }
  
    
  
  }
  
  exports.reset = async (req, res, next) => {
    const { passwordToken, password } = req.body;
    
  
    if (!passwordToken || !password) {
      console.log('failed, invalid details, ', passwordToken, password)
      res.status(422).send(invalidDetails);
      return;
    }
    try {
      const isUserExist = await User.findOne({ passwordToken });
  
      if (isUserExist) {
        isUserExist.passwordToken = undefined;
        isUserExist.password = password;
        const savedUser = await isUserExist.save();
        console.log(savedUser);
        return res.status(200).send({
          user: User.toClientObj(savedUser),
          message: "Password updated successfully.",
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

  exports.userinfo = async (req, res, next) => {
    const { email, emailNew, name, alerts } = req.body;
    
    const validNewE = emailNew.length
    const validNewName = name.length
  
    const validErrors = [];
    const isValidEmail = email && validateEmail(email);
    if (!isValidEmail) {
      validErrors.push(invalidEmail);
    }
    if (validErrors.length) {
      res.status(422).send(invalidEmail);
      return;
    }

    try {
      const isUserExist = await User.findOne({ email });
  
      if (isUserExist) {
        isUserExist.alerts = alerts;
        const savedUser = await isUserExist.save();
        console.log(savedUser);
        //send email to admin with new email + name
        if(validNewE || validNewName){
          updateUser(savedUser, emailNew, name)

        }
        
        
        
        return res.status(200).send({
          user: User.toClientObj(savedUser),
          message: "Alerts updated successfully.",
        });
      } else {
        console.log("user not found: ", isUserExist);
        res.status(422).send(invalidEmail);
        return;
  
      }
  
      
    } catch (err) {
      console.log("alerts err: ", err);
    }
  };

  



 