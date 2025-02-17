const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username:{type:String , required : true , trim : true , unique : true },
    email: {type:String , required : true , trim : true , unique : true, match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"], },
    password : {type:String , required : true },
    isBlocked : {type:Boolean , default:false },
    role:{
        type:String ,
        enum:['user' , 'admin'],
        default:'user',

    },
},

{timestamps: true}

)

// passwerd hashing
userSchema.pre('save' , async function (next) {
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next()
});


// password hashing 

userSchema.methods.matchPassword = async function (entreadpassword) {
    return await bcrypt.compare(entreadpassword , this.password)
};

const User = mongoose.model('User' , userSchema) ;
module.exports = User ;
