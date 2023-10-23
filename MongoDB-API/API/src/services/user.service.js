const User = require("./../models/user.model");

/**create User */
const createUser = async (reqbody) => {
  return User.create(reqbody);
};

const checkEmailId = async (email) => {
  return User.findOne({ email });
};

const getUserById=async(req,res)=>{
  return User.find();
}

const userUpdate = async (userId,updateBody) => {
  return User.findByIdAndUpdate(userId, { $set: updateBody },);
};

const oldpassword=async(reqbody)=>{
  return User.create(reqbody);
}

module.exports = { createUser, checkEmailId,
  getUserById, userUpdate,oldpassword,
   };
