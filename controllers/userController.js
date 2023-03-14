const asyncHandler = require("express-async-handler");
const { sequelize, User } = require('../models');
const helper = require('../helpers/functions');

//@desc Get All Users
//@route GET /api/users
//@access private
const getUsers = asyncHandler( async (req, res) => {
    try{
    let user;
    if(!req.query.page){
        user = await User.findAll();
    }else{
        let limit = 10;
        let offset = 0 + (req.query.page - 1) * limit;
        user = await User.findAndCountAll({
            offset: offset,
            limit: limit,
            order: [["createdAt", "ASC"]],
        });
    }
    
    helper.successResponse( 200, "All users data.",user, res);

    }catch(error){
        console.log(error);
    }
});

//@desc Get single user
//@route GET /api/users/:id
//@access private

const getUser = asyncHandler( async (req, res) => {
    await helper.userFinder( User, req.params.id, res);
    const user = await User.findByPk(req.params.id);
    helper.successResponse( 200, `Data from user id: ${req.params.id}`,user, res);
});

//@desc Create new user
//@route POST /api/users
//@access private

const createUser =  asyncHandler (async (req, res) => {
    try{
        const {first_name, last_name, address, post_code, contact, email, username, password} = req.body;
        const user = await User.create({ 'first_name': first_name, 'last_name': last_name, 'address': address, 'post_code': post_code, "contact": contact, 'email': email, 'username': username, 'password': password});
        helper.successResponse( 201, "User has been created", user , res);
    }catch(error){
        res.status(400);
       throw new Error(error.message);
    }
});

//@desc Update new user
//@route PUT /api/users/:id
//@access private

const updateUser = asyncHandler( async (req, res) => {
    try{
        await helper.userFinder( User, req.params.id, res);
        const {first_name, last_name, address, post_code, contact, email, username, password} = req.body;
        const updateUser = await User.update({ 'first_name': first_name, 'last_name': last_name, 'address': address, 'post_code': post_code, "contact": contact, 'email': email, 'username': username, 'password': password},{
            where:{
                id: req.params.id
            }
        });
        helper.successResponse( 200, `${first_name} has been updated.`,'', res);
    }catch(error){
        res.status(404);
       throw new Error(error.message);
    }
});


//@desc Delete a user
//@route DELETE /api/users/:id
//@access private

const deleteUser = asyncHandler( async (req, res) => {
    try{
        await helper.userFinder( User, req.params.id, res);
        await User.destroy({
            where:{
                id: req.params.id
            }
        });
        await helper.successResponse( 200,  "User has been deleted",'', res);
    }catch(error){
        res.status(404);
        throw new Error(error.message);
    }
});

//@desc Delete a user
//@route DELETE /api/users
//@access private

const deleteUsers = asyncHandler( async (req, res) => {
    try{
        const { userIds } = req.body;
        await helper.usersFinder( User, userIds, res);
        await User.destroy({
            where: {
                id: userIds
            }
        });
        await helper.successResponse( 200,  "Users has been deleted",userIds, res); 
    }catch(error){
        res.status(404);
        throw new Error(error.message);
    }
});


module.exports = { getUsers, getUser, createUser, updateUser, deleteUser, deleteUsers};