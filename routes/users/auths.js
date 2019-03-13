/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

const validateRegister = require('../../validations/users/register');

// Local
/* POST login. */
router.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err || !user) {
      const errors = {};

      errors.login = 'Username of password incorrect.';
      return res.status(400).json(errors);
    }
    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }
      const payload = { id: user.id, name: user.name, avatar: user.avatar };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 3600
        },
        (err, token) => res.json({ success: true, token: 'Bearer ' + token })
      );
    });
  })(req, res);
});

router.post('/register', (req, res, next) => {
  const { errors, isValid } = validateRegister(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      errors.username = 'Username already exists';
      return res.status(400).json(errors);
    }
    const newUser = {};
    if (req.body.avatar) {
      newUser.avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });
    }
    newUser.name = req.body.name;
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.gender = req.body.gender;

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) next(err);
        newUser.password = hash;
        new User(newUser)
          .save()
          .then(user => res.json(user))
          .catch(err => res.status(400).json(err));
      });
    });
  });
});

router.post('/oauth', (req, res, next) => {
  // const { errors, isValid } = validateRegister(req.body);

  // // Check Validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  User.findOne({ facebookID: req.body.facebookID }).then(user => {
    if (user) {
      req.login(user, { session: false }, err => {
        if (err) {
          res.send(err);
        }
        const payload = { id: user.id, name: user.name, avatar: user.avatar };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {
            expiresIn: 3600
          },
          (err, token) => res.json({ success: true, token: 'Bearer ' + token })
        );
      });
    }
    const newUser = {};
    newUser.avatar = `http://graph.facebook.com/${
      req.body.facebookID
    }/picture?type=large`;
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.facebookID = req.body.facebookID;
    new User(newUser)
      .save()
      .then(user => {
        req.login(user, { session: false }, err => {
          if (err) {
            res.send(err);
          }
          const payload = { id: user.id, name: user.name, avatar: user.avatar };
          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
              expiresIn: 3600
            },
            (err, token) =>
              res.json({ success: true, token: 'Bearer ' + token })
          );
        });
      })
      .catch(err => res.status(400).json(err));
  });
});

// // Google
// router.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: ["https://www.googleapis.com/auth/userinfo.email"]
//   })
// );
// router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   (req, res) => {
//     // ----------------------------------------------------------
//     req.login(req.user, { session: false }, err => {
//       if (err) {
//         res.send(err);
//       }
//       const payload = { id: user.id, name: user.name, avatar: user.avatar };
//       jwt.sign(
//         payload,
//         process.env.JWT_SECRET,
//         {
//           expiresIn: 3600
//         },
//         (err, token) => res.json({ success: true, token: "Bearer " + token })
//       );
//     });
//     // ----------------------------------------------------------
//     // return res.redirect("/");
//   }
// );

// // Facebook
// router.get(
//   "/facebook",
//   passport.authenticate("facebook", { scope: "public_profile" })
// );

// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", { failureRedirect: "/login" }),
//   (req, res) => {
//     // ----------------------------------------------------------
//     req.login(req.user, { session: false }, err => {
//       if (err) {
//         res.send(err);
//       }
//       const payload = { id: user.id, name: user.name, avatar: user.avatar };
//       jwt.sign(
//         payload,
//         process.env.JWT_SECRET,
//         {
//           expiresIn: 3600
//         },
//         (err, token) => res.json({ success: true, token: "Bearer " + token })
//       );
//     });
//     // ----------------------------------------------------------
//     // return res.redirect("/");
//   }
// );

module.exports = router;
