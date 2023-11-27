import Mongoose from "mongoose";

const localDB = `mongodb://localhost:27017/duodeka-test`;

const connectDB = async () => {
  await Mongoose.connect(localDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("MongoDB Connected");
};

export default connectDB