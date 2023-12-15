"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordUtil = void 0;
const bcrypt_1 = require("bcrypt");
const env_util_1 = require("./env.util");
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
/**
 * @author Shahid Tumbi
 * @description A utility class to handle password
 */
exports.passwordUtil = {
    /**
     * @author Shahid Tumbi
     * @description A function which can be used to verify password in a mongoose document
     * @param this Execution Context or Scope
     * @param password A string to be compared with password hash
     */
    verify(password) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('user password', this.password);
            console.log('request password', password);
            return yield (0, bcrypt_1.compare)(password, this.password);
        });
    },
    /**
     * @author Shahid Tumbi
     * @description A mongoose pre hook function to hash password before storing it in database
     * @param this Execution Context or Scope
     */
    hook() {
        return __awaiter(this, void 0, void 0, function* () {
            const password = this.password;
            if (this.isModified('password')) {
                // console.log('password modified');
                const round = parseInt(env_util_1.environment.SALT_ROUND, 10);
                this.password = yield (0, bcrypt_1.hash)(password, yield (0, bcrypt_1.genSalt)(round));
            }
        });
    },
    hash(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const round = parseInt(env_util_1.environment.SALT_ROUND, 10);
            return yield (0, bcrypt_1.hash)(password, yield (0, bcrypt_1.genSalt)(round));
        });
    },
};
/**
 *  Facebook strategy that we used for the development --- social sign up
 */
const facebookStratObj = {
    clientID: '[FBID]',
    clientSecret: '[FBSECRET]',
    profileFields: ['id', 'emails', 'name', 'address', 'birthday', 'gender'],
    callbackURL: 'https://127.0.0.1:/facebook-token',
};
passport.use(new FacebookStrategy(facebookStratObj, (accessToken, refreshToken, profile, done) => {
    // asynchronous verification, for effect...
    process.nextTick(() => {
        return done(null, profile);
    });
}));
/**
 *  Google strategy that we used for the development --- social sign up
 *
 */
const googleStrategyObj = {
    consumerKey: 'GOOGLE_CONSUMER_KEY',
    consumerSecret: 'GOOGLE_CONSUMER_SECRET',
    callbackURL: 'http://www.example.com/auth/google/callback',
};
passport.use(new GoogleStrategy(googleStrategyObj, (token, tokenSecret, profile, done) => {
    process.nextTick(() => {
        return done(null, profile);
    });
}));
// define REST proxy options based on logged in user
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((obj, done) => {
    done(null, obj);
});
