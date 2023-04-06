"use strict";
// const passport = require('passport');
// const LocalStrategy = require('passport-local');
// import bcryptjs from 'bcryptjs';
// import User from '../models/User';
// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: 'user[email]',
//       passwordField: 'user[password]'
//     },
//     (email, password, done) => {
//       User.findOne({ email })
//         .then((user) => {
//           if (!user || !user.validatePassword(password)) {
//             return done(null, false, { errors: { 'email or password': 'is invalid' } });
//           }
//           return done(null, user);
//         })
//         .catch(done);
//     }
//   )
// );
// passport.use(
//   new LocalStrategy(
//     {
//       email: 'email',
//       password: 'password'
//     },
//     function (username, password, done) {
//       User.findOne({ username: username }, function (err, user) {
//         return err
//           ? done(err)
//           : user
//           ? password === user.password
//             ? done(null, user)
//             : done(null, false, { message: 'Incorrect password.' })
//           : done(null, false, { message: 'Incorrect username.' });
//       });
//     }
//   )
// );
// passport.use(
//   new LocalStrategy(function verify(username, password, cb) {
//     db.get('SELECT * FROM users WHERE username = ?', [username], function (err, row) {
//       if (err) {
//         return cb(err);
//       }
//       if (!row) {
//         return cb(null, false, { message: 'Incorrect username or password.' });
//       }
//       crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function (err, hashedPassword) {
//         if (err) {
//           return cb(err);
//         }
//         if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
//           return cb(null, false, { message: 'Incorrect username or password.' });
//         }
//         return cb(null, row);
//       });
//     });
//   })
// );
// passport.use(
//   new LocalStrategy(function (email, password, done) {
//     User.findOne({ email }, function (err, user) {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false);
//       }
//       if (!user.verifyPassword(password)) {
//         return done(null, false);
//       }
//       return done(null, user);
//     });
//   })
// );
//# sourceMappingURL=passport.js.map