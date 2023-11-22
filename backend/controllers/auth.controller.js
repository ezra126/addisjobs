import User from "../models/userModel.js";
import Employer from "../models/employerModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { first_name, last_name, email, password, phone_number } = req.body;

  const hashedpassword = bcryptjs.hashSync(password, 10);

  const user = await User.findOne({ email: email });

  if (user) {
    return next(errorHandler(400, "user with this email already exist"));
  }

  try {
    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedpassword,
      phone_number,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return next(errorHandler(404, "user with this email is not found"));

  const validPassword = bcryptjs.compareSync(password, user.password);

  if (!validPassword) return next(errorHandler(401, "Wrong password"));

  const { password: pass, ...rest } = user._doc;

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "5h" }
  );

  res.status(200).cookie("access_token", token, { httpOnly: true }).json({
    rest,
  });
};

export const google = async (req, res, next) => {
  const { name, email, photo } = req.body;
  // const type = req.query.type;

  console.log(req.body);
  const nameArray = name.split(" ");

  try {
    const user = await User.findOne({ email });
    if (!user) {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedpassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        first_name: nameArray[0],
        last_name: nameArray[1],
        email: email,
        password: hashedpassword,
        user_image: photo,
      });
      await newUser.save();

      const { password: pass, ...rest } = newUser._doc;

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(201)
        .json(rest);
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;

      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(201)
        .json(rest);
    }
    // res
    //   .cookie("access_token", token, { httpOnly: true })
    //   .status(200)
    //   .json(rest);
  } catch (err) {
    next(err);
  }
};

export const signout = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};

export const checksession = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return;

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      //res.clearCookie("access_token");
      res.status(200).json({
        session: "expired",
        message: "signout because session expired",
      });
    }

    res.status(200).json({
      session: "not expired",
      message: "session token not expired ",
    });

    // req.user = user;
  });
};

export const employerSignUp = async (req, res, next) => {
  const {
    company_name,
    agency_license_number,
    contact_number,
    email,
    password,
  } = req.body;

  console.log("is working eko ..... " + password);
  const employer = await Employer.findOne({ company_name });

  if (employer) {
    return next(
      errorHandler("401", "Employer with this company name already registered")
    );
  }

  const hashedpassword = bcryptjs.hashSync(password, 10);
  try {
    const newEmployer = new Employer({
      company_name,
      contact_number,
      email,
      password: hashedpassword,
      agency_license_number,
    });
    await newEmployer.save();
    res.status(201).json(newEmployer);
  } catch (error) {
    if (error.code === 11000) {
      next(new Error("Email must be unique"));
    } else {
      next(error);
    }
  }
};

export const employerSignIn = async (req, res, next) => {
  const { email, password } = req.body;

  const employer = await Employer.findOne({ email });

  if (!employer)
    return next(errorHandler(404, "employer with this email is not found"));

  const validPassword = bcryptjs.compareSync(password, employer.password);

  if (!validPassword) return next(errorHandler(401, "Wrong password"));

  const { password: pass, ...rest } = employer._doc;

  const token = jwt.sign(
    {
      id: employer._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "5h" }
  );

  res.status(200).cookie("access_token", token, { httpOnly: true }).json({
    rest,
  });
};
