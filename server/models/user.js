const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
    trim: true,
    unique: true,
  },
  bucket_ids: [],
})

mongoose.model("User", UserSchema)
