const mongoose = require("mongoose")

const BucketSchema = mongoose.Schema({
  title: String,
  createdBy: String,
  description: String,
},{ timestamps: true})

mongoose.model("Bucket", BucketSchema)
