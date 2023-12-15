"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDashboard = exports.UserSearchType = exports.PasswordWith = exports.PrimaryField = exports.AgeGroup = void 0;
var AgeGroup;
(function (AgeGroup) {
    AgeGroup["Below_18"] = "1";
    AgeGroup["Btw_18_24"] = "2";
    AgeGroup["Btw_25_34"] = "3";
    AgeGroup["Btw_35_44"] = "4";
    AgeGroup["Btw_45_54"] = "5";
    AgeGroup["Btw_55_64"] = "6";
    AgeGroup["Above_65"] = "7";
})(AgeGroup = exports.AgeGroup || (exports.AgeGroup = {}));
var PrimaryField;
(function (PrimaryField) {
    PrimaryField["Phone_Number"] = "1";
    PrimaryField["Email"] = "2";
})(PrimaryField = exports.PrimaryField || (exports.PrimaryField = {}));
var PasswordWith;
(function (PasswordWith) {
    PasswordWith["Phone"] = "0";
    PasswordWith["Email"] = "1";
})(PasswordWith = exports.PasswordWith || (exports.PasswordWith = {}));
var UserSearchType;
(function (UserSearchType) {
    UserSearchType[UserSearchType["User"] = 1] = "User";
    UserSearchType[UserSearchType["Pet"] = 2] = "Pet";
    UserSearchType[UserSearchType["Both"] = 3] = "Both";
})(UserSearchType = exports.UserSearchType || (exports.UserSearchType = {}));
var UserDashboard;
(function (UserDashboard) {
    UserDashboard["Top_List"] = "1";
    UserDashboard["Graph"] = "2";
})(UserDashboard = exports.UserDashboard || (exports.UserDashboard = {}));
