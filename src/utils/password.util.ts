import { compare, genSalt, hash } from 'bcrypt';
import { environment } from './env.util';
import { App } from '@app/app.interface';
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
/**
 * @author Shahid Tumbi
 * @description A utility class to handle password
 */
export const passwordUtil = {
	/**
	 * @author Shahid Tumbi
	 * @description A function which can be used to verify password in a mongoose document
	 * @param this Execution Context or Scope
	 * @param password A string to be compared with password hash
	 */
	async verify(this: App.PasswordDoc, password: string): Promise<boolean> {
		console.log('user password',this.password)
		console.log('request password',password)
		return await compare(password, this.password);
	},
	/**
	 * @author Shahid Tumbi
	 * @description A mongoose pre hook function to hash password before storing it in database
	 * @param this Execution Context or Scope
	 */
	async hook(this: App.PasswordDoc): Promise<void> {
		const password = this.password;
		if (this.isModified('password')) {
			// console.log('password modified');
			const round: number = parseInt(environment.SALT_ROUND, 10);
			this.password = await hash(password, await genSalt(round));
		}
	},
	async hash(password: string): Promise<string> {
		const round: number = parseInt(environment.SALT_ROUND, 10);
		return await hash(password, await genSalt(round));
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
passport.use(new FacebookStrategy(facebookStratObj,
	(accessToken: string, refreshToken: string, profile: any, done: any) => {
		// asynchronous verification, for effect...
		process.nextTick(() => {
			return done(null, profile);
		});
	},
));
/**
 *  Google strategy that we used for the development --- social sign up
 *
 */
const googleStrategyObj = {
	consumerKey: 'GOOGLE_CONSUMER_KEY',
	consumerSecret: 'GOOGLE_CONSUMER_SECRET',
	callbackURL: 'http://www.example.com/auth/google/callback',
};
passport.use(new GoogleStrategy(googleStrategyObj,
	(token: any, tokenSecret: any, profile: any, done: any) => {
		process.nextTick(() => {
			return done(null, profile);
		});
	},
));

// define REST proxy options based on logged in user
passport.serializeUser((user: any, done: any) => {
	done(null, user);
});

passport.deserializeUser((obj: any, done: any) => {
	done(null, obj);
});
