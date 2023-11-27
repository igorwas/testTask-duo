import Users from './model';
import bcrypt  from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtSecret } from '../../constants'


const register = async (req, res, next) => {
  const { name, password, email } = req.body;
  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" });
  }

  bcrypt.hash(password, 10).then(async (hash) => {
    await Users.create({
      name,
      email,
      password: hash,
    })
      .then((user) => {
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign(
          { _id: user._id },
          jwtSecret,
          {
            expiresIn: maxAge, // 3hrs
          }
        );
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000,
        });
        res.status(200).json({
          message: "User successfully created",
          _id: user._id,
          token: token,
          email: user.email,
          name: user.name
        });
      })
      .catch((error) =>{ 
        res.status(400).json({
          message: "User not successful created",
          error: error.message,
        })
      } 
      )
  });
};

const login = async (req, res, next) => {
  const { email, password, token } = req.body;

  if ((!email || !password) && !token) {
    return res.status(400).json({
      message: "Email or password not present",
    });
  }

  try {
    const generateToken = ( user ) => {
      const maxAge = 3 * 60 * 60;
      const token = jwt.sign(
        { _id: user._id },
        jwtSecret,
        {
          expiresIn: maxAge, // 3hrs in sec
        }
      );
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000, // 3hrs in ms
      });
      res.status(200).json({
        message: "User successfully Logged in",
        _id: user._id,
        token: token,
        email: user.email,
        name: user.name
      });
    }

    if (token) {
      jwt.verify(token, jwtSecret, async (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: "Token expired or wrong" });
        } else {
          const userFromToken = await Users.findOne({ _id: decodedToken._id });

          if(userFromToken){
            generateToken(userFromToken)
          }
        }
      });
    } else {
      const user = await Users.findOne({ email });

      if (!user) {
        res.status(400).json({
          message: "Login not successful",
          error: "User not found",
        });
      } else {
        bcrypt.compare(password, user.password).then(function (result) {
          if (result) {
            generateToken(user)
          } else {
            res.status(400).json({ message: "Login not succesful" });
          }
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

const logout = async (req, res, next) => {
  const { _id } = req.body;
  jwt.sign(
    { _id },
    jwtSecret,
    {
      expiresIn: 1,
    }
  );
  res.status("200").json({ message: "Logout successful" });
};

const update = async (req, res, next) => {
  const { userId } = req.cookies;
  const { _id } = req.params;

  if (userId == _id) {
    await Users.updateOne({ _id }, req.body )
    .then(() => {
      res.status("200").json({ message: "Update successful" });
    })
    .catch((error) => {
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message });
    });
  } else {
    res.status(400).json({
      message: "You can edit only your profile",
    });
  }
};

const remove = async (req, res, next) => {
  const { userId } = req.cookies;
  const { _id } = req.params;
  if (userId == _id) {
    await Users.findById(_id)
      .then((user) => user.remove())
      .then((user) =>
        res.status(200).json({ message: "User successfully deleted", user })
      )
      .catch((error) =>
        res
          .status(400)
          .json({ message: "An error occurred", error: error.message })
      );
    } else {
      res.status(400).json({
        message: "You can delete only your profile",
      });
    }
};

const getById = async (req, res, next) => {
  const { _id } = req.params;
  await Users.findById(_id, { password: 0 }).exec()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) =>
      res.status(401).json({ message: "Not successful", error: err.message })
    );
};

const get = async (req, res, next) => {
  const { query = {} } = req.body;
  await Users.find(query, { password:0 })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) =>
      res.status(401).json({ message: "Not successful", error: err.message })
    );
};

export { register, login, logout, update, remove, getById, get };


