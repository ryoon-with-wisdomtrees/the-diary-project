const mongoose = require("mongoose");
const DiarySchema = require("./schema/diary");
const UserSchema = require("./schema/user");
exports.Diary = mongoose.model("Diary", DiarySchema);
exports.User = mongoose.model("User", UserSchema);
