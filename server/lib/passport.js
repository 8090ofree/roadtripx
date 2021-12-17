const passport = require('passport');
const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;



const localOption = {
    nameField: 'name',
    usernameField: 'email',
    passpwordField: 'password'
}

const localLogin = new LocalStrategy(localOption, function(email, password, done){
        
    User.findOne({email}, function (err, user){
            if(err){
                return done(err)
            }
    
            if(!user){
                done(null, null, {
                    code: 'GLOBAL_VALID',
                    message: 'Validation failed. Please enter a valid details.'
                })
                return;
            }
            
            user.comparePassword(password, function(err, isMatch){
                if(err){
                    callback(err)
                    return;
                }
                
                if(!isMatch){
                    done(null, null, {
                        code: 'GLOBAL_VALID',
                        message: 'Validation failed. Please enter a valid details.'
                    })
                    return;
                    
                }

                done(null, user)
                return;
            })            
        })        
})

const jwtOpts = {}
jwtOpts.jwtFromRequest = (req) => {
    const cookies = req.cookies;
    console.log('here is user cookie', cookies)
    const token = cookies.token;
    if(token){
        return token
    }

    const headers = req.headers || {};
    console.log('here are headers', headers)
    const authHeader = headers.authorization || '';
    const headerToken = authHeader.split(' ')[1];
    console.log('here are headers token',headerToken)
    if(headerToken){
        return headerToken;
    }
    return null;

}

jwtOpts.secretOrKey = process.env.JWT_SECRET || 'TEMP_JWT_SECRET';
passport.use(new JwtStrategy(jwtOpts, function(jwtPayload, done){
    
    const userId = jwtPayload._id;

    User.findOne({ _id: userId }, function(err, user) {
        if (err) {
            return done('no user found in db',err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false, {
            	code: 'GLOBAL_ERROR',
            	message: 'Validation failed. Please enter a valid details.'
            });
        }
    });
    

}))


passport.use(localLogin)