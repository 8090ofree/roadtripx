const mongoose = require("mongoose");

let Visit;

if(!Visit){
    const visitSchema = new mongoose.Schema({
        ip: String,
        token: {
            type: Number,
            default: 0
        },
        firstTime: Date,
        lastTime: Date,
        currentTime: Date
    },{
        timestamps: true
    })
    
    Visit = mongoose.model("visit", visitSchema)

}


module.exports = Visit;