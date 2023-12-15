"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestStatus = exports.ratingRange = exports.GlobalSearchType = exports.AllCountryAccess = exports.RoleAccess = exports.AccessLevel = exports.ContentType = exports.SORT = exports.LoginType = exports.DeviceType = exports.UserGender = exports.UserStatus = exports.UserType = void 0;
var UserType;
(function (UserType) {
    UserType["Guest"] = "0";
    UserType["User"] = "1";
    UserType["Admin"] = "2";
    UserType["Default"] = "3";
    UserType["Curator"] = "4";
})(UserType = exports.UserType || (exports.UserType = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["Active"] = "1";
    UserStatus["InActive"] = "2";
    UserStatus["Deleted"] = "3";
    UserStatus["New"] = "4";
    UserStatus["Block"] = "5";
})(UserStatus = exports.UserStatus || (exports.UserStatus = {}));
var UserGender;
(function (UserGender) {
    UserGender["Male"] = "1";
    UserGender["Female"] = "2";
    UserGender["Other"] = "3";
})(UserGender = exports.UserGender || (exports.UserGender = {}));
var DeviceType;
(function (DeviceType) {
    DeviceType["IOS"] = "1";
    DeviceType["ANDROID"] = "2";
    DeviceType["WEB"] = "3";
})(DeviceType = exports.DeviceType || (exports.DeviceType = {}));
var LoginType;
(function (LoginType) {
    // Normal = '0',
    LoginType["Apple"] = "1";
    LoginType["Google"] = "2";
    LoginType["Facebook"] = "3";
    LoginType["Normal"] = "4";
    LoginType["Guest"] = "5";
})(LoginType = exports.LoginType || (exports.LoginType = {}));
var SORT;
(function (SORT) {
    SORT["asc"] = "asc";
    SORT["desc"] = "desc";
})(SORT = exports.SORT || (exports.SORT = {}));
var ContentType;
(function (ContentType) {
    ContentType["Privacy_Policy"] = "1";
    ContentType["Terms_And_Condition"] = "2";
    ContentType["FAQ_Category"] = "3";
    ContentType["FAQ"] = "4";
    ContentType["About_Us"] = "5";
})(ContentType = exports.ContentType || (exports.ContentType = {}));
var AccessLevel;
(function (AccessLevel) {
    AccessLevel["Admin"] = "1";
    AccessLevel["SubAdmin"] = "2";
})(AccessLevel = exports.AccessLevel || (exports.AccessLevel = {}));
var RoleAccess;
(function (RoleAccess) {
    RoleAccess[RoleAccess["NONE"] = 1] = "NONE";
    RoleAccess[RoleAccess["Read"] = 2] = "Read";
    RoleAccess[RoleAccess["Write"] = 3] = "Write";
})(RoleAccess = exports.RoleAccess || (exports.RoleAccess = {}));
var AllCountryAccess;
(function (AllCountryAccess) {
    AllCountryAccess["NONE"] = "1";
    AllCountryAccess["OTHER"] = "2";
    AllCountryAccess["ALL"] = "3";
})(AllCountryAccess = exports.AllCountryAccess || (exports.AllCountryAccess = {}));
var GlobalSearchType;
(function (GlobalSearchType) {
    GlobalSearchType["Top"] = "0";
    GlobalSearchType["User"] = "1";
    GlobalSearchType["Pet"] = "2";
    GlobalSearchType["Hashtag"] = "3";
    GlobalSearchType["Event"] = "4";
})(GlobalSearchType = exports.GlobalSearchType || (exports.GlobalSearchType = {}));
exports.ratingRange = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var RequestStatus;
(function (RequestStatus) {
    RequestStatus["Pending"] = "1";
    RequestStatus["Archived"] = "2";
})(RequestStatus = exports.RequestStatus || (exports.RequestStatus = {}));
