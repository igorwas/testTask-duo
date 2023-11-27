import Mongoose from "mongoose";
import { emailRegex } from '../../constants'

const ApplicationSchema = new Mongoose.Schema({
  name: {
    type: String
  },
  vacancyId: {
    type: String,
    required: true
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
    trim: true,
    required: true,
  },
  phone: {
    type: String,
  },
  cv: {
    type: String,
    required: true
  },
}, { timestamps: true });

const Applications = Mongoose.model("applications", ApplicationSchema);

export default Applications;
