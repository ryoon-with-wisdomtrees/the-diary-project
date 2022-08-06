const { Schema, Mongoose, default: mongoose } = require("mongoose");
const shortId = require("./type/short-id");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const User = new mongoose.Schema(
  {
    user_id: shortId,
    name: String,
    email: { type: String, required: true, unique: true, lowercase: true },
    password: String,
  },
  { timestamps: { createdAt: "created_at" } }
);
User.plugin(AutoIncrement, {
  id: "id_counter",
  inc_field: "seq",
});

module.exports = User;
