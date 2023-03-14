const asyncHandler = require("express-async-handler");
const { sequelize, User } = require('../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Auth Login
//@route POST /api/auth/login
//@access public
const authLogin =  asyncHandler (async (req, res) => {
        try{
        const {username, password} = req.body;
        if(!username || !password){
            res.status(400);
            throw new Error("All fields are required.");
        }
        const user = await User.findOne({username});
        let token;
        if(user && (await bcrypt.compare(password, user.password))){
             token = jwt.sign({
                user:{
                    id: user.id,
                    username: user.username,
                    email: user.email,
                }
            },
            process.env.ACCESS_TOKEN,
            { expiresIn: "30m" }
            );
            res.status(200).json({token});
        }
        
        if(!token){
            res.status(401);
            throw new Error("Invalid credentials");
        }
    }catch(error){
        res.status(401);
        throw new Error("Invalid credentials");
    }
 
});

//@desc Auth User
//@route GET /api/auth/user
//@access private
const authUser =  async (req, res) => {
    try{
       res.json(req.user);

    }catch(error){
        console.log(error);
    }
};

module.exports = { authLogin, authUser};
