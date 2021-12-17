const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let User;

if(!User){
    const userSchema = new mongoose.Schema({
        name:{
            type: String
        },
        email:{
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        activated: Boolean,
        activationToken: {
            type: String,
            unique: true,
            sparse: true
        },
        activationTokenSentAt: Date,
        activatedAt: Date,
        passwordToken: {
            type: String,
            unique: true,
            sparse: true
        },
        passwordTokenSentAt: Date,
        plan: {
            type: String,
        default: "Basic"
        
        },
        alerts: Boolean,
        
    },{
        timestamps: true
    })
    
    userSchema.pre('save', function(next){
        const user = this;
        const saltRounds = 10;

        if(user.isModified('password')){
            bcrypt.genSalt(saltRounds, (err, salt) => {
                if(err){
                    return next(err)
                } else {
                    bcrypt.hash(user.password, salt, (err, hash) => {
                        if(!err){
                            user.password = hash;
                            next();
                        }
                    })
                }
            })
        } else {
            return next();
        }


    })

    userSchema.methods.comparePassword = function(candidatePassword, callback) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
            if(err){
                callback(err)
                return;
            }
            callback(null, isMatch);
        })
    }


    userSchema.statics.toClientObj = (user) => {
        const userObj = user.toObject() || {}

        const clientObj = {

            _id: userObj._id,
            name: userObj.name,
            email: userObj.email,
            activated: userObj.activated,
            createdAt: userObj.createdAt,
            updatedAt: userObj.updatedAt,
            plan: userObj.plan,
            alerts: userObj.alerts
        }
        return clientObj;
    }
    User = mongoose.model('user', userSchema)

}


module.exports = User;
