import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

import connectDB from "./db";
import apiRoutes from "./api/route"

const app = express();

const PORT = 5000;

app.set("view engine", "ejs");

await connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());


// Routes
app.use("/api", apiRoutes);

const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
);

process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});
