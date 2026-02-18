import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema= new mongoose.Schema({ 
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }},{
        timestamps:true
})

// this function will run before saving the user to database and it will check if the password is modified or not, if not then it will move to next step and if it is modified then it will hash the password and then move to next step
userSchema.pre("save",async function(){ 
    if(!this.isModified("password")){
         return;
    }
    this.password= await bcrypt.hash(this.password,10)
})

userSchema.methods.isPasswordCorrect= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.methods.genrateAccessToken= function(){
    const payload={
        _id:this._id,
        role:this.role 
    }
    const token= jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:"1d"})  
    return token
}

const User= mongoose.model("User",userSchema)

export default User;