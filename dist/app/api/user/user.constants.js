"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueName = exports.LinksConstant = exports.DEFAULT_PASSWORD = exports.GMAIL_SERVICE = exports.passwordKey = exports.BY_PASS_OTP = exports.USER_MESSAGES = void 0;
const utils_1 = require("../../../utils");
const common_util_1 = require("../../../utils/common.util");
exports.USER_MESSAGES = {
    USER_NOT_FOUND: (0, common_util_1.defineMessage)('Oops! This user is not registered with Us', '¡Uy! Este usuario no está registrado con nosotros', '糟糕！该用户未在我们注册', '糟糕！該用戶未在我們註冊'),
    SOMETHING_WENT_WRONG: (0, common_util_1.defineMessage)('Oops! We encountered an error. Let us look into it', '¡Uy! Este usuario no está registrado con nosotros', '糟糕！该用户未在我们注册', '糟糕！該用戶未在我們註冊'),
    EMAIL_NOT_FOUND: (0, common_util_1.defineMessage)('Oops! This Email ID isn’t registered with Us', '¡Uy! Esta ID de correo electrónico no está registrada con nosotros', '糟糕！此电子邮件ID未向我们注册', '糟糕！此電子郵件ID未向我們註冊'),
    PHONE_NOT_FOUND: (0, common_util_1.defineMessage)('Oops! This Phone no isn’t registered with Us', '¡Uy! Este teléfono no está registrado con nosotros', '糟糕！此电话号码未在我们注册', '糟糕！此電話號碼未在我們註冊'),
    USERNAME_EXISTS: (0, common_util_1.defineMessage)('Oops! This username is already registered with Us', '¡Uy! Este nombre de usuario ya está registrado con nosotros', '糟糕！此用户名已在我们注册', '糟糕！此用戶名已在我們註冊'),
    ACCOUNT_BLOCKED: (0, common_util_1.defineMessage)('Oops! Account is blocked by admin, please contact admin', '¡Uy! La cuenta está bloqueada por el administrador, comuníquese con el administrador', '糟糕！帐户被管理员阻止，请联系管理员', '糟糕！帳戶被管理員阻止，請聯繫管理員'),
    EMAIL_ALREADY_LINKED: (0, common_util_1.defineMessage)('Oops! This Email ID is linked with another account', '¡Uy! Esta identificación de correo electrónico está vinculada con otra cuenta', '糟糕！此电子邮件ID已与另一个帐户关联', '糟糕！此電子郵件ID已與另一個帳戶關聯'),
    PHONE_ALREADY_LINKED: (0, common_util_1.defineMessage)('Oops! This Phone no is linked with another account', '¡Uy! Este teléfono no está vinculado con otra cuenta', '糟糕！ 该电话号码已与另一个帐户关联', '糟糕！ 該電話號碼已與另一個帳戶關聯'),
    EMAIL_ALREADY_VERIFIED: (0, common_util_1.defineMessage)('Oops! This Email ID is already verified', '¡Uy! Esta ID de correo electrónico ya está verificada', '糟糕！ 此电子邮件ID已通过验证', '糟糕！ 此電子郵件ID已通過驗證'),
    PHONE_ALREADY_VERIFIED: (0, common_util_1.defineMessage)('Oops! This Phone Number is already verified', '¡Uy! Este número de teléfono ya está verificado', '糟糕！ 该电话号码已通过验证', '糟糕！ 該電話號碼已通過驗證'),
    EMAIL_NOT_VERIFIED: (0, common_util_1.defineMessage)('Oops! Email ID is not verified yet, please verify first', '¡Uy! La identificación de correo electrónico aún no está verificada, verifíquela primero', '糟糕！ 电子邮件ID尚未验证，请先验证', '糟糕！ 電子郵件ID尚未驗證，請先驗證'),
    PHONE_NOT_VERIFIED: (0, common_util_1.defineMessage)('Oops! Phone no is not verified yet, please verify first', '¡Uy! El número de teléfono aún no está verificado, verifique primero', '糟糕！ 电话号码尚未验证，请先验证', '糟糕！ 電話號碼尚未驗證，請先驗證'),
    LOGIN: {
        SUCCESS: (0, common_util_1.defineMessage)('You are logged in successfully', 'Has iniciado sesión correctamente', '您已成功登录', '您已成功登錄'),
        INVALID: (0, common_util_1.defineMessage)('Oops! This doesn’t seem like a correct password', '¡Uy! esto no parece una contraseña correcta', '糟糕！ 这似乎不是正确的密码', '糟糕！ 這似乎不是正確的密碼'),
    },
    REGISTER: {
        SUCCESS: (0, common_util_1.defineMessage)('You are successfully registered', 'estás registrado exitosamente', '您已成功注册', '您已成功註冊'),
        EMAIL_EXISTS: (0, common_util_1.defineMessage)('Oops! This Email ID is already registered with Us', '¡Uy! Esta identificación de correo electrónico ya está registrada con nosotros', '糟糕！ 此电子邮件ID已向我们注册', '糟糕！ 此電子郵件ID已向我們註冊'),
        PHONE_EXISTS: (0, common_util_1.defineMessage)('Oops! This Phone no is already registered with Us', '¡Uy! Este número de teléfono ya está registrado con nosotros', '糟糕！ 该电话号码已在我们注册', '糟糕！ 該電話號碼已在我們註冊'),
    },
    VERIFY_OTP: {
        SUCCESS: (0, common_util_1.defineMessage)('Otp is verified successfully', 'la contraseña de un solo uso se verifica correctamente', '一次密码验证成功', '一次密碼驗證成功'),
        INVALID: (0, common_util_1.defineMessage)('Wrong otp is entered', 'Se ingresó una contraseña incorrecta una vez', '输入了错误的一次密码', '輸入了錯誤的一次密碼'),
        EXPIRED: (0, common_util_1.defineMessage)('Entered otp is expired', 'la contraseña ingresada una vez caducó', '输入一次密码过期', '輸入一次密碼過期'),
        ACCOUNT_VERIFIED: (0, common_util_1.defineMessage)('Account verified successfully'),
        EMAIL_VERIFIED: (0, common_util_1.defineMessage)('Email verified successfully'),
        PHONE_VERIFIED: (0, common_util_1.defineMessage)('Phone verified successfully'),
        EMAIL_CHANGED: (0, common_util_1.defineMessage)('Email changed successfully'),
        PHONE_CHANGED: (0, common_util_1.defineMessage)('Phone changed successfully'),
    },
    RESEND_OTP: {
        NOT_INIT: (0, common_util_1.defineMessage)('Oops! OTP verification process is not initiated yet', '¡Uy! el proceso de verificación de contraseña de una sola vez no se ha iniciado', '糟糕！ 一次密码验证过程尚未启动', '糟糕！ 一次密碼驗證過程尚未啟動'),
        SUCCESS: (0, common_util_1.defineMessage)('OTP sent again successfully', 'contraseña única enviada nuevamente con éxito', '一次密码再次成功发送', '一次密碼再次成功發送'),
        INVALID_TOKEN: (0, common_util_1.defineMessage)('Invalid Token'),
    },
    INVALID_CREDENTIAL: {
        INVALID: (0, common_util_1.defineMessage)('Credential does not match', 'La credencial no coincide', '凭据不匹配', '憑據不匹配'),
    },
    INVALID_SOCIAL_TOKEN: {
        INVALID: (0, common_util_1.defineMessage)('Provided social token is invalid', 'El token social proporcionado no es válido', '提供的社会令牌无效', '提供的社會令牌無效'),
        FB_PHONE_NUMBER_EMAIL_PUBLIC: (0, common_util_1.defineMessage)('Either email or phone number should be public of your facebook profile', 'Either email or phone number should be public of your facebook profile', 'Either email or phone number should be public of your facebook profile', 'Either email or phone number should be public of your facebook profile'),
    },
    UPDATE_PROFILE: {
        SUCCESS: (0, common_util_1.defineMessage)('Profile is updated successfully', 'Perfil actualizado correctamente', '个人资料更新成功', '個人資料更新成功'),
        ALREADY: (0, common_util_1.defineMessage)('Oops! Your profile is already updated', '¡Uy! Tu perfil ya está actualizado', '糟糕！ 您的个人资料已更新', '糟糕！ 您的個人資料已更新'),
        ACCOUNT_SUCCESS: (0, common_util_1.defineMessage)('Account is updated successfully', 'Cuenta actualizada correctamente', '帐户更新成功', '帳戶更新成功'),
    },
    USER_NAME: {
        TAKEN: (0, common_util_1.defineMessage)('Oops! Entered username is already taken', '¡Uy! El nombre de usuario ingresado ya está en uso', '糟糕！ 输入的用户名已被使用', '糟糕！ 輸入的用戶名已被使用'),
        AVAILABLE: (0, common_util_1.defineMessage)('Congrats ! Entered username is available', 'Felicidades! El nombre de usuario ingresado está disponible', '恭喜 ！ 输入的用户名可用', '恭喜 ！ 輸入的用戶名可用'),
    },
    FORGET_PASSWORD: {
        SUCCESS: (0, common_util_1.defineMessage)('Password Reset is Successfully', 'La contraseña de un solo uso se envía correctamente', '一次密码发送成功', '一次密碼發送成功'),
        NOT_VERIFIED: (0, common_util_1.defineMessage)('Oops! $$ is not verified yet, please verify first', '¡Uy! $$ aún no está verificado, verifíquelo primero'),
        SEND: (0, common_util_1.defineMessage)('Reset password link has been sent to your email'),
    },
    CHANGE_PASSWORD: {
        INVALID: (0, common_util_1.defineMessage)('Oops! Old password doesn’t seem like a correct password'),
        SUCCESS: (0, common_util_1.defineMessage)('Password changed successfully'),
    },
    CHANGE_AUTH: {
        SUCCESS: (0, common_util_1.defineMessage)('Otp is sent successfully', 'La contraseña de un solo uso se envía correctamente', '一次密码发送成功', '一次密碼發送成功'),
        YOUR_EMAIL: (0, common_util_1.defineMessage)('Oops! This Email ID is already added in your account', '¡Uy! Esta ID de correo electrónico ya está agregada en su cuenta', '糟糕！ 此电子邮件ID已添加到您的帐户中', '糟糕！ 此電子郵件ID已添加到您的帳戶中'),
        YOUR_PHONE: (0, common_util_1.defineMessage)('Oops! This Phone Number is already added in your account', '¡Uy! Este número de teléfono ya está agregado en su cuenta', '糟糕！ 此电话号码已添加到您的帐户中', '糟糕！ 此電話號碼已添加到您的帳戶中'),
    },
    FOLLOW: {
        ALREADY: (0, common_util_1.defineMessage)('Oops! You are already following this user'),
        SUCCESS: (0, common_util_1.defineMessage)('You started following this user.'),
    },
    UNFOLLOW: {
        ALREADY: (0, common_util_1.defineMessage)('Oops! You are not following this user'),
        SUCCESS: (0, common_util_1.defineMessage)('You unfollowed this user successfully.'),
    },
    PROFILE: {
        COMPLETED: (0, common_util_1.defineMessage)('Profile setup completed successfully'),
        UPDATED: (0, common_util_1.defineMessage)('Profile is updated successfully'),
    },
    REPORT: {
        ALREADY: (0, common_util_1.defineMessage)('User is already reported'),
        SUCCESS: (0, common_util_1.defineMessage)('User is reported successfully'),
    },
    ACCOUNT_NOT_DELETED: {
        NOT_DELETED: (0, common_util_1.defineMessage)('Some Error occured while deleteing the USer Account', 'Some Error occured while deleteing the USer Account', 'Some Error occured while deleteing the USer Account', 'Some Error occured while deleteing the USer Account'),
    },
    REQUEST: {
        SEND: (0, common_util_1.defineMessage)('Follow request send'),
    },
    REFERRAL: {
        USAGE_LIMIT: "Refferal code usage limit has been reached.",
        CODE_NOT_EXIST: "Refferal code not matched!"
    }
};
exports.BY_PASS_OTP = '123456';
exports.passwordKey = '_p';
exports.GMAIL_SERVICE = {
    EMAIL_USER: utils_1.environment.GMAIL_ACCOUNT,
    EMAIL_PASS: utils_1.environment.GMAIL_PASS,
    SUBJECT: 'Forget Password',
    WELCOME_SUBJECT: 'Welcome to Links',
    WELCOME_HTML: `<p><h1><b>Welcome to Links</b></h1></p>

    <p>Thanks for signing up! We are excited to have you join us and start your journey with us.</p>

    <p>Regards<br>
    Links Team</p>

    <p></p>`,
};
exports.DEFAULT_PASSWORD = `Links@${Math.floor(Math.random() * (999 - 100 + 1) + 100).toString()}`;
exports.LinksConstant = {
    // S3BucketUrl : 'https://profileimageuploadbyhelpie.s3.amazonaws.com/HelpieUser/',
    S3BucketUrl: 'https://web.helpiephoto.com/v1/users/file/HelpieUser/',
};
exports.QueueName = {
    notification: "notification",
    follow: "follow",
    unfollow: "unfollow",
    gptprocess: "gpt-processing",
    like: 'like',
    dislike: 'dislike'
};
