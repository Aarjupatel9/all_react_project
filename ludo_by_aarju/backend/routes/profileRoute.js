const express = require('express');
const {  GetProfile, EditProfile, DeleteProfile } = require('../controllers/profileController');
const authenticateRoles = require('../middlewares/authMiddleware');
const { AllRoles } = require('../utils/constants')
const router = express.Router();

// user specific operations

router.route("/getProfile")
    .post(authenticateRoles(AllRoles), GetProfile);
router.route("/updateProfile")
    .post(authenticateRoles(AllRoles), EditProfile);
router.route("/deleteProfile")
    .post(authenticateRoles(AllRoles), DeleteProfile);


// other operations
router.route("/profile/:id").get(GetProfile); // public route to get user's profile details


module.exports = router;