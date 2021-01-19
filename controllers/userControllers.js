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
              expiresIn: "1h",
            }
          );
          // console.log("token:", token);

          return res.json({ Logintoken: token });
        } else {
          if (userObj) {
            const userData = new User();
            userData.email = email;
            userData.name = name;
            userData.googleId = googleId;
            userData.imageUrl = imageUrl;

            userData.save().then((userdata) => {
              // console.log("userObjInMongodb", userdata);
              return res.send(userdata);
            });

            return res.send("User Logged In SuccessFully");
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
      // console.log("req.headers.logintoken ==>> ", req.headers.logintoken);

      if (!req.headers.logintoken) {
        return res.send("Login token is not valid");
      } else {
        const payload = await jwt.verify(
          req.headers.logintoken,
          process.env.LOGIN_TOKEN_SECRET
        );

        if (payload) {
          console.log("ok");
          return res
            .redirect("/dashboard")
            .send(" Token varified , it seems good");
        }
        return res.send(
          "Invalid Token, session got expired, Need to Login Again !"
        );
      }
    } catch (error) {
      // console.log(error.message);
      return res.send(error.message);
    }
  }
}

module.exports = new UserController();
