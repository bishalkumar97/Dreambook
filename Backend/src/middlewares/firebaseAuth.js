const admin = require('firebase-admin');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const config = require("../config/config");
const { getAuth, signInWithCustomToken } = require("firebase/auth");
require("../../firebase-web");

const { authService } = require('../services');

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(config.firebase_secret))
})

const firebaseAuth = (allowUserType = 'All') => async (req, res, next) => {
  return new Promise(async (resolve, reject) => {
    const token = req.headers?.authorization?.split(' ')[1];
    // token not found
    if (!token) {
      reject(new ApiError(httpStatus.BAD_REQUEST, 'Please Authenticate!'));
    }
    try {
      const payload = await admin.auth().verifyIdToken(token, true);
      const user = await authService.getUserByFirebaseUId(payload.uid);
      if (!user) {
        console.log(req.path);
        if (['/register', '/register-admin'].includes(req.path) || req.path.includes('secretSignup')) {
          req.newUser = payload;
          req.routeType = allowUserType;
        } else reject(new ApiError(httpStatus.NOT_FOUND, "User doesn't exist. Please create account"));
      } else {
        if (!allowUserType.split(',').includes(user.__t) && allowUserType !== 'All') {
          reject(new ApiError(httpStatus.FORBIDDEN, "Sorry, but you can't access this"));
        }
        if (user.isBlocked) {
          reject(new ApiError(httpStatus.FORBIDDEN, 'User is blocked'));
        }
        if (user.isDeleted) {
          reject(new ApiError(httpStatus.GONE, "User doesn't exist anymore"));
        }
        req.user = user;
      }

      resolve();
    } catch (err) {
      if (err.code === 'auth/id-token-expired') {
        reject(new ApiError(httpStatus.UNAUTHORIZED, 'Session is expired'));
      }
      console.log('FirebaseAuthError:', err);
      reject(new ApiError(httpStatus.UNAUTHORIZED, 'Failed to authenticate'));
    }
  })
    .then(() => next())
    .catch(err => next(err));
};

const generateToken = async (req, res, next) => {

  try {
    const token = await admin.auth().createCustomToken(req.params.uid);
    const user = await signInWithCustomToken(getAuth(), token);
    const idToken = user._tokenResponse.idToken
    return res.status(200).json({
      status: true,
      token: idToken
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      msg: err.message
    })
  }
}

module.exports = { firebaseAuth, generateToken };
