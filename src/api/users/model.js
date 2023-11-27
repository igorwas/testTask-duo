import Mongoose from "mongoose";
import { emailRegex } from '../../constants'

const UserSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate: {
      validator: (email) => {
        if(!emailRegex.test(email)){
          return Promise.reject(false)}
        },
      message: 'Email validation failed'
    },
    unique: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
}, { timestamps: true });

const Users = Mongoose.model("users", UserSchema);

export default Users;
