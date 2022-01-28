// User model in the database
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;


const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email_id: {
    type: String,
    required: true,
    unique: true
  },
  isd_code: {
    type: String,
    required: true,
    enum: ["+91", "+1", "+44", "+61", "+86", "+82", "+33", "+49", "+55", "+62", "+63", "+64", "+65", "+66", "+81", "+84", "+87", "+88", "+89", "+90", "+92", "+93", "+94", "+95", "+98", "+99"],
    default: "+91"
  },
  phone_number: {
    type: String,
    required: true
  }
})
userSchema.pre('save', async function () {
  hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = await hashedPassword;
});

// Export the model
module.exports = mongoose.model('User', userSchema);