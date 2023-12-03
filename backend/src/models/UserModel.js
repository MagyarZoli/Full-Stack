import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter an username"]
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters']
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  googleId: {
    type: String
  },
  githubId: {
    type: String
  },
  facebookId: {
    type: String
  }
});

userSchema.pre('save', async function(next)  {
  const salt = await bcrypt.genSalt();
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

userSchema.statics.login = async function(email, password)  {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password)
    if (auth) return user;
    throw Error("Incorrect password");
  }
  throw Error("Incorrect email");
};

const User = mongoose.model("User", userSchema);

export default User;
