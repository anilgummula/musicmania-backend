const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/user");


const signup = async (req,res)=>{
    try{
        const {username,email,password} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            // console.log("user exist check");
            return res.status(409)
            .json({message: "User already exist,you can login",success: false})
        }
        const userModel = new UserModel({username,email,password});
        userModel.password = await bcrypt.hash(password,10);
        await userModel.save();

        const jwtToken = jwt.sign(
            {username,email },
            process.env.JWT_SECRET,
            { expiresIn: "24h"}
        )
        res.status(201)
        .json({
            message : "Registration Successfull",
            success : true,
            jwtToken,
            email,
        })
    }catch(err){
        res.status(500)
        .json({
            message : "Internal server error",
            success : false    
        })
    }
}

const login = async (req,res)=>{
    try{
        // console.log("login validation");
        const {email,password} = req.body;
        const user = await UserModel.findOne({email});
        // console.log("user data: ",!user);
        const errMesg = "Auth Failed email or password is wrong! ";
        if(!user){
            // console.log("user not found...");
            return res.status(403)
            .json({message: errMesg,success: false})
        }
        const isPassEqual = await bcrypt.compare(password,user.password);
        if(!isPassEqual){
            return res.status(403)
            .json({message: errMesg,success: false})
        }
        const username = user.username;

        const jwtToken = jwt.sign(
            {email : user.email, _id : user._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h"}
        )

        res.status(200)
        .json({
            message : "Login Successfull",
            success : true ,
            jwtToken,
            email,
            username : username
        })
        
    }catch(err){
        res.status(500)
        .json({
            message : "Internal server error",
            success : false    
        })
    }
}

module.exports = {
    signup,
    login
}