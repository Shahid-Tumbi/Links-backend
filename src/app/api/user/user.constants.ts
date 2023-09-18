import { defineMessage } from '@utils/common.util';

export const USER_MESSAGES = {
  USER_NOT_FOUND: defineMessage(
    'Oops! This user is not registered with Us',
    '¡Uy! Este usuario no está registrado con nosotros',
    '糟糕！该用户未在我们注册',
    '糟糕！該用戶未在我們註冊'
  ),
  SOMETHING_WENT_WRONG: defineMessage(
    'Oops! We encountered an error. Let us look into it',
    '¡Uy! Este usuario no está registrado con nosotros',
    '糟糕！该用户未在我们注册',
    '糟糕！該用戶未在我們註冊'
  ),
  EMAIL_NOT_FOUND: defineMessage(
    'Oops! This Email ID isn’t registered with Us',
    '¡Uy! Esta ID de correo electrónico no está registrada con nosotros',
    '糟糕！此电子邮件ID未向我们注册',
    '糟糕！此電子郵件ID未向我們註冊'
  ),
  PHONE_NOT_FOUND: defineMessage(
    'Oops! This Phone no isn’t registered with Us',
    '¡Uy! Este teléfono no está registrado con nosotros',
    '糟糕！此电话号码未在我们注册',
    '糟糕！此電話號碼未在我們註冊'
  ),
  USERNAME_EXISTS: defineMessage(
    'Oops! This username is already registered with Us',
    '¡Uy! Este nombre de usuario ya está registrado con nosotros',
    '糟糕！此用户名已在我们注册',
    '糟糕！此用戶名已在我們註冊'
  ),
  ACCOUNT_BLOCKED: defineMessage(
    'Oops! Account is blocked by admin, please contact admin',
    '¡Uy! La cuenta está bloqueada por el administrador, comuníquese con el administrador',
    '糟糕！帐户被管理员阻止，请联系管理员',
    '糟糕！帳戶被管理員阻止，請聯繫管理員'
  ),
  EMAIL_ALREADY_LINKED: defineMessage(
    'Oops! This Email ID is linked with another account',
    '¡Uy! Esta identificación de correo electrónico está vinculada con otra cuenta',
    '糟糕！此电子邮件ID已与另一个帐户关联',
    '糟糕！此電子郵件ID已與另一個帳戶關聯'
  ),
  PHONE_ALREADY_LINKED: defineMessage(
    'Oops! This Phone no is linked with another account',
    '¡Uy! Este teléfono no está vinculado con otra cuenta',
    '糟糕！ 该电话号码已与另一个帐户关联',
    '糟糕！ 該電話號碼已與另一個帳戶關聯'
  ),
  EMAIL_ALREADY_VERIFIED: defineMessage(
    'Oops! This Email ID is already verified',
    '¡Uy! Esta ID de correo electrónico ya está verificada',
    '糟糕！ 此电子邮件ID已通过验证',
    '糟糕！ 此電子郵件ID已通過驗證'
  ),
  PHONE_ALREADY_VERIFIED: defineMessage(
    'Oops! This Phone Number is already verified',
    '¡Uy! Este número de teléfono ya está verificado',
    '糟糕！ 该电话号码已通过验证',
    '糟糕！ 該電話號碼已通過驗證'
  ),
  EMAIL_NOT_VERIFIED: defineMessage(
    'Oops! Email ID is not verified yet, please verify first',
    '¡Uy! La identificación de correo electrónico aún no está verificada, verifíquela primero',
    '糟糕！ 电子邮件ID尚未验证，请先验证',
    '糟糕！ 電子郵件ID尚未驗證，請先驗證'
  ),
  PHONE_NOT_VERIFIED: defineMessage(
    'Oops! Phone no is not verified yet, please verify first',
    '¡Uy! El número de teléfono aún no está verificado, verifique primero',
    '糟糕！ 电话号码尚未验证，请先验证',
    '糟糕！ 電話號碼尚未驗證，請先驗證'
  ),
  LOGIN: {
    SUCCESS: defineMessage(
      'You are logged in successfully',
      'Has iniciado sesión correctamente',
      '您已成功登录',
      '您已成功登錄'
    ),
    INVALID: defineMessage(
      'Oops! This doesn’t seem like a correct password',
      '¡Uy! esto no parece una contraseña correcta',
      '糟糕！ 这似乎不是正确的密码',
      '糟糕！ 這似乎不是正確的密碼'
    ),
  },
  REGISTER: {
    SUCCESS: defineMessage(
      'You are successfully registered',
      'estás registrado exitosamente',
      '您已成功注册',
      '您已成功註冊'
    ),
    EMAIL_EXISTS: defineMessage(
      'Oops! This Email ID is already registered with Us',
      '¡Uy! Esta identificación de correo electrónico ya está registrada con nosotros',
      '糟糕！ 此电子邮件ID已向我们注册',
      '糟糕！ 此電子郵件ID已向我們註冊'
    ),
    PHONE_EXISTS: defineMessage(
      'Oops! This Phone no is already registered with Us',
      '¡Uy! Este número de teléfono ya está registrado con nosotros',
      '糟糕！ 该电话号码已在我们注册',
      '糟糕！ 該電話號碼已在我們註冊'
    ),
  },
  VERIFY_OTP: {
    SUCCESS: defineMessage(
      'Otp is verified successfully',
      'la contraseña de un solo uso se verifica correctamente',
      '一次密码验证成功',
      '一次密碼驗證成功'
    ),
    INVALID: defineMessage(
      'Wrong otp is entered',
      'Se ingresó una contraseña incorrecta una vez',
      '输入了错误的一次密码',
      '輸入了錯誤的一次密碼'
    ),
    EXPIRED: defineMessage(
      'Entered otp is expired',
      'la contraseña ingresada una vez caducó',
      '输入一次密码过期',
      '輸入一次密碼過期'
    ),
    ACCOUNT_VERIFIED: defineMessage('Account verified successfully'),
    EMAIL_VERIFIED: defineMessage('Email verified successfully'),
    PHONE_VERIFIED: defineMessage('Phone verified successfully'),
    EMAIL_CHANGED: defineMessage('Email changed successfully'),
    PHONE_CHANGED: defineMessage('Phone changed successfully'),
  },
  RESEND_OTP: {
    NOT_INIT: defineMessage(
      'Oops! OTP verification process is not initiated yet',
      '¡Uy! el proceso de verificación de contraseña de una sola vez no se ha iniciado',
      '糟糕！ 一次密码验证过程尚未启动',
      '糟糕！ 一次密碼驗證過程尚未啟動'
    ),
    SUCCESS: defineMessage(
      'OTP sent again successfully',
      'contraseña única enviada nuevamente con éxito',
      '一次密码再次成功发送',
      '一次密碼再次成功發送'
    ),
    INVALID_TOKEN: defineMessage('Invalid Token'),
  },
  INVALID_CREDENTIAL: {
    INVALID: defineMessage(
      'Credential does not match',
      'La credencial no coincide',
      '凭据不匹配',
      '憑據不匹配'
    ),
  },
  INVALID_SOCIAL_TOKEN: {
    INVALID: defineMessage(
      'Provided social token is invalid',
      'El token social proporcionado no es válido',
      '提供的社会令牌无效',
      '提供的社會令牌無效'
    ),
    FB_PHONE_NUMBER_EMAIL_PUBLIC: defineMessage(
      'Either email or phone number should be public of your facebook profile',
      'Either email or phone number should be public of your facebook profile',
      'Either email or phone number should be public of your facebook profile',
      'Either email or phone number should be public of your facebook profile'
    ),
  },
  UPDATE_PROFILE: {
    SUCCESS: defineMessage(
      'Profile is updated successfully',
      'Perfil actualizado correctamente',
      '个人资料更新成功',
      '個人資料更新成功'
    ),
    ALREADY: defineMessage(
      'Oops! Your profile is already updated',
      '¡Uy! Tu perfil ya está actualizado',
      '糟糕！ 您的个人资料已更新',
      '糟糕！ 您的個人資料已更新'
    ),
    ACCOUNT_SUCCESS: defineMessage(
      'Account is updated successfully',
      'Cuenta actualizada correctamente',
      '帐户更新成功',
      '帳戶更新成功'
    ),
  },
  USER_NAME: {
    TAKEN: defineMessage(
      'Oops! Entered username is already taken',
      '¡Uy! El nombre de usuario ingresado ya está en uso',
      '糟糕！ 输入的用户名已被使用',
      '糟糕！ 輸入的用戶名已被使用'
    ),
    AVAILABLE: defineMessage(
      'Congrats ! Entered username is available',
      'Felicidades! El nombre de usuario ingresado está disponible',
      '恭喜 ！ 输入的用户名可用',
      '恭喜 ！ 輸入的用戶名可用'
    ),
  },
  FORGET_PASSWORD: {
    SUCCESS: defineMessage(
      'Password Reset is Successfully',
      'La contraseña de un solo uso se envía correctamente',
      '一次密码发送成功',
      '一次密碼發送成功'
    ),
    NOT_VERIFIED: defineMessage(
      'Oops! $$ is not verified yet, please verify first',
      '¡Uy! $$ aún no está verificado, verifíquelo primero'
    ),
    SEND: defineMessage('Default password sent to your email'),
  },
  CHANGE_PASSWORD: {
    INVALID: defineMessage(
      'Oops! Old password doesn’t seem like a correct password'
    ),
    SUCCESS: defineMessage('Password changed successfully'),
  },
  CHANGE_AUTH: {
    SUCCESS: defineMessage(
      'Otp is sent successfully',
      'La contraseña de un solo uso se envía correctamente',
      '一次密码发送成功',
      '一次密碼發送成功'
    ),
    YOUR_EMAIL: defineMessage(
      'Oops! This Email ID is already added in your account',
      '¡Uy! Esta ID de correo electrónico ya está agregada en su cuenta',
      '糟糕！ 此电子邮件ID已添加到您的帐户中',
      '糟糕！ 此電子郵件ID已添加到您的帳戶中'
    ),
    YOUR_PHONE: defineMessage(
      'Oops! This Phone Number is already added in your account',
      '¡Uy! Este número de teléfono ya está agregado en su cuenta',
      '糟糕！ 此电话号码已添加到您的帐户中',
      '糟糕！ 此電話號碼已添加到您的帳戶中'
    ),
  },
  FOLLOW: {
    ALREADY: defineMessage('Oops! You are already following this user'),
    SUCCESS: defineMessage('You started following this user.'),
  },
  UNFOLLOW: {
    ALREADY: defineMessage('Oops! You are not following this user'),
    SUCCESS: defineMessage('You unfollowed this user successfully.'),
  },
  PROFILE: {
    COMPLETED: defineMessage('Profile setup completed successfully'),
    UPDATED: defineMessage('Profile is updated successfully'),
  },
  REPORT: {
    ALREADY: defineMessage('User is already reported'),
    SUCCESS: defineMessage('User is reported successfully'),
  },

  ACCOUNT_NOT_DELETED: {
		NOT_DELETED: defineMessage(
			'Some Error occured while deleteing the USer Account',
			'Some Error occured while deleteing the USer Account',
			'Some Error occured while deleteing the USer Account',
			'Some Error occured while deleteing the USer Account'
		),
	},
  REQUEST:{
    SEND: defineMessage('Follow request send'),
  }

};

export const COLLECTION_NAME = {
  user : 'user' ,
  userDetail : 'user_detail',
  follow : 'follows',
  followRequest : 'followRequest'
};

export const BY_PASS_OTP = '1234';

export const passwordKey = '_p';

export const GMAIL_SERVICE = {
  EMAIL_USER: 'dev@nksqr.com',
  EMAIL_PASS: 'gbxoquqepcjlerty',
  SUBJECT: 'Forget Password',
  WELCOME_SUBJECT: 'Welcome to Links',
  WELCOME_HTML: `<p><h1><b>Welcome to Links</b></h1></p>

    <p>Thanks for signing up! We are excited to have you join us and start your journey with us.</p>

    <p>Regards<br>
    Links Team</p>

    <p></p>`,
};

export const DEFAULT_PASSWORD = `Links@${Math.floor(
  Math.random() * (999 - 100 + 1) + 100
).toString()}`;

export const LinksConstant = {
  // S3BucketUrl : 'https://profileimageuploadbyhelpie.s3.amazonaws.com/HelpieUser/',
  S3BucketUrl: 'https://web.helpiephoto.com/v1/users/file/HelpieUser/',
};

export const QueueName = {
  notification: "notification",
  follow: "follow",
  unfollow: "unfollow"
}