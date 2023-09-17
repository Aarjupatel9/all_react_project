const mongoose = require("mongoose");
const { MongoClient, ObjectId } = require("mongodb");

const loginModel = require("./mongodbModels/loginInfo");
const userModel = require("./mongodbModels/userInfo");
const massegesModel = require("./mongodbModels/masseges");

mongoose
  .connect("mongodb://localhost:10102/massenger", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((responce) => {
    console.log("Connected to MongoDB , ", responce.connection.name);
  })
  .catch((err) => console.log(err));

async function doTask() {
  const result = await userModel.findOne({
    _id: new ObjectId("649adccf4fbac74a7215740b"),
    ProfileImageVersion: { $gt: 0 },
  });
  // console.log("updateProfileImages || result : ", result);
  if (result) {
    console.log("updateProfileImages || result inside is : ", result._id);

    const profileImageBinData = result.ProfileImage;

    const profileImageArray = Array.from(profileImageBinData);


    const profileImageBase64 = profileImageBinData.toString("base64");

    console.log(profileImageBinData);
    // const returnObj = {
    //   id: result._id,
    //   ProfileImage: byteArray,
    //   ProfileImageVersion: result.ProfileImageVersion,
    // };
  } else {
    console.log(
      "updateProfileImages || image is already updated : ",
      "649adccf4fbac74a7215740b",
      " and version : ",
      1
    );
  }
}
doTask();
