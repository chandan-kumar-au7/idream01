//====================>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<=================\\
const googleAuth = require("./google-auth");
const User = require("../Models/userModels");
const jwt = require("jsonwebtoken");

class UserController {
  async googlelogin(req, res, next) {
    try {
      const { email, name, googleId, imageUrl } = req.body.profileObj;

      // varifing usertoken for google login
      let userObj = await googleAuth(req.body.tokenId);

      // checking if user exist or not inside mongodb
      User.findOne({ email }).then((user) => {
        if (user) {
          console.log("user already in db");

          // passport jwt logic executed here...

          const token = jwt.sign(
            {
              username: user.username,
              useremail: user.email,
              userid: user._id,
              date: Date.now(),
            },
            process.env.LOGIN_TOKEN_SECRET,
            {
              expiresIn: "24h",
            }
          );
          // console.log("token:", token);

          return res.json({
            message: "User Logged In SuccessFully",
            Logintoken: token,
          });
        } else {
          if (userObj) {
            const userData = new User();
            userData.email = email;
            userData.name = name;
            userData.googleId = googleId;
            userData.imageUrl = imageUrl;

            userData.save().then((userdata) => {
              // console.log("userObjInMongodb", userdata);
              return res.json({
                message: "User Logged In SuccessFully",
                data: userdata,
              });
            });
          } else {
            // console.log("something went wrong");
            return res.send("something went wrong");
          }
        }
      });

      // console.log("User Saved Successfully with these crediantls : ", data);
    } catch (error) {
      // console.log("error ==>> ", error);
      return res.send(error.message);
    }
  }

  async varifytoken(req, res, next) {
    try {
      // console.log("req.body ==>> ", req.body);

      if (!req.body.loginToken) {
        return res.send("Login token is not valid");
      } else {
        const payload = jwt.verify(
          req.body.loginToken,
          process.env.LOGIN_TOKEN_SECRET
        );

        // console.log("payload -------- >>>>>>>>> ", payload);

        if (payload) {
          // console.log("ok");

          User.findOne({ email: payload.useremail }).then((user) => {
            if (user) {
              return res.json({
                message: `Welcome -- ${payload.useremail} `,
                data: user,
              });
            } else {
              return res.json({
                error:
                  "Invalid Token, session got expired, Need to Login Again !",
              });
            }
          });
        }
      }
    } catch (error) {
      // console.log(error.message);
      return res.send(error.message);
    }
  }
}

module.exports = new UserController();
