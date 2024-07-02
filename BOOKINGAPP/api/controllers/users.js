import User from "../models/User.js"
//UPDATE
export const updateUser = async (req,res,next)=>{
    try{
        await User.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("User has been deleted.")
    }catch(err){
        next(err);
    }
}
//DELETE
export const deleteUser = async (req,res,next)=>{
    const newUser = new User(req.body)
    
    try{
        const saveUser = await newUser.save()
        res.status(200).json(saveUser)
    }catch(err){
        next(err);
    }
}
//GET
export const getUser = async (req,res,next)=>{
    try{
        const user = await User.findById(
            req.params.id
        );
        res.status(200).json(user)
    }catch(err){
        next(err);
    }
}
//GET ALL
export const getUsers = async (req,res,next)=>{
    const newHotel = new User(req.body)
    try{
        const Users = await User.find();
        res.status(200).json(users)
    }catch(err){
        next(err);
    }
}