const { User, Thought } = require("../models");

const userController = {
  //get all users
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //get one user by Id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => {
        // If no user is found, 404
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //create a new user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  //update user by Id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbuserData) => {
        if (!dbuserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  addFriend({params,body}, res){
    Thought.findOneAndUpdate(
      {_id: params.userId},
      { $push: { friends: params.friendId}}, //body data should be found within the User list
      { new: true}
    )
    .then((dbFriendData) => {
      console.log(dbFriendData); //result null???
      if(!dbFriendData){
        res.status(404).json({message:"No friend found with this id!"});
        return;
      }
      res.json(dbFriendData);
    })
    .catch((err) => res.json(err));
  },


  removeFriend({params}, res){
    Thought.findOneAndUpdate(
      {_id: params.userId},
      { $pull: { friends: params.friendId}},
      { new: true}
    )
    .then((dbFriendData) => res.json(dbFriendData))
    .catch((err) => res.json(err));
  },

  //delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
