"use strict";

module.exports.userFinder = async function userFinder( model, id, res){
    const data = await model.findByPk(id);
    if(!data){
        res.status(404);
        throw new Error('Requested data not found.');
    }
};

module.exports.usersFinder = async function usersFinder( model, ids, res){
     let idsNotFound = [];
     let hasError = false;
    await Promise.all(ids.map(async (id) => { 
        const data = await model.findByPk(id);
        if(!data){
            hasError = true;
            idsNotFound.push(`This User id ${id} is not found.`);
        }else{
            idsNotFound.push(`This User id ${id} has been deleted.`);
        }
     }));
     if(hasError){
        res.status(404).json({
            status: false,
            message: idsNotFound,
        });
     }
};


module.exports.successResponse = async function successResponse( code ,message, data, res){
    if(data){
       await res.status(code).json({
            status: true,
            message: message,
            data: data
        });
    }else{
        await  res.status(code).json({
            status: true,
            message: message,
        });
    }
    
};
