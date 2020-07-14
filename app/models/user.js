var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const crypto = require('crypto')

const UserSchema = new Schema({
    name: String,
    password: String,
    email: {type: String, unique: true, lowercase: true},
    displayName: String,
    avatar: String,
    admin: Boolean,
    signupDate: {type: Date, default: Date.now()},
    lastLogin: Date
})

/*
UserSchema.pre('save', function(next){
    let user = this
    if (!user.isModified('password')) return next()
    
    bcryp.genSalt(10, (err, salt) =>{
        if(err) return next()
        bcryp.hash(user.password, salt,null,(err,hass)=>{
            if(err) return next(err)
            user.password = hash
            next()
        })
    })
    bcryp.hash(user.password, "adi",null,(err,hash)=>{
        if(err) return next(err)
        user.password = hash
        next()
    })
   
})*/

UserSchema.methods.gravatar = function (){
    if (!this.email) return 'http://gravatar.com/avatar/?s=200&d=retro'
    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('User', UserSchema)