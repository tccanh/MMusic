// app.use('/auth', authRouter);
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
          expiresIn: 86400
        },
        (err, token) => res.json({ success: true, token: `Bearer ${token}` })
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
    if (req.body.email) {
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
          .then(user => res.json({ success: true }))
          .catch(err => res.status(400).json(err));
      });
    });
  });
});

router.post('/google', (req, res, next) => {
  const { avatar, googleID, name, email } = req.body;

  User.findOne({ googleID }).then(user => {
    if (user) {
      User.findByIdAndUpdate(
        user.id,
        {
          avatar,
          name,
          email
        },
        { new: true }
      )
        .then(user => {
          const payload = { id: user.id, name: user.name, avatar: user.avatar };
          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
              expiresIn: 3600
            },
            (err, token) =>
              res.json({ success: true, token: `Bearer ${token}` })
          );
        })
        .catch(err => res.status(400).json(err));
    }
    const newUser = {};
    newUser.avatar = avatar;
    newUser.googleID = googleID;
    newUser.name = name;
    newUser.email = email;
    new User(newUser)
      .save()
      .then(user => {
        const payload = { id: user.id, name: user.name, avatar: user.avatar };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {
            expiresIn: 3600
          },
          (err, token) => res.json({ success: true, token: `Bearer ${token}` })
        );
      })
      .catch(err => res.status(400).json(err));
  });
});
router.post('/facebook', (req, res, next) => {
  const { avatar, facebookID, name, email } = req.body;

  User.findOne({ facebookID }).then(user => {
    if (user) {
      User.findByIdAndUpdate(
        user.id,
        {
          avatar,
          name,
          email
        },
        { new: true }
      )
        .then(user => {
          const payload = { id: user.id, name: user.name, avatar: user.avatar };
          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
              expiresIn: 3600
            },
            (err, token) =>
              res.json({ success: true, token: `Bearer ${token}` })
          );
        })
        .catch(err => res.status(400).json(err));
    }
    const newUser = {};
    newUser.avatar = avatar;
    newUser.facebookID = facebookID;
    newUser.name = name;
    newUser.email = email;
    new User(newUser)
      .save()
      .then(user => {
        const payload = { id: user.id, name: user.name, avatar: user.avatar };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {
            expiresIn: 3600
          },
          (err, token) => res.json({ success: true, token: `Bearer ${token}` })
        );
      })
      .catch(err => res.status(400).json(err));
  });
});

module.exports = router;
