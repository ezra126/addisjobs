import User from "../models/userModel.js";

import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const updateUserBasicInfo = async (req, res, next) => {
  const {
    first_name,
    last_name,
    email,
    phone_number,
    date_of_birth,
    gender,
    user_image,
  } = req.body;

  console.log(req.user);
  const user = await User.findById(req.user.id);

  if (req.params.id !== req.user.id)
    return next(errorHandler(401, "You can only update your own account"));
  console.log("he");

  if (req.body.password) {
    const hashedpassword = bcryptjs.hashSync(req.body.password, 10);
  }
  try {
    const UpdatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          user_image: req.body.user_image,
          phone_number: req.body.phone_number,
          email: req.body.email,
          gender: req.body.gender,
          date_of_birth: req.body.date_of_birth,
        },
      },
      { new: true }
    );
    console.log("hello rest");
    const { password, ...rest } = UpdatedUser._doc;
    console.log("rest", rest);

    res.status(200).json({ rest });
  } catch (err) {
    console.log("sdkjkdj");
    next(err);
  }
};

export const updateDetailInfo = async (req, res, next) => {
  const {
    country,
    region,
    city,
    field_of_study,
    educational_level,
    profession,
    year_of_experience,
    is_current_job,
    company_name,
    job_title,
  } = req.body;

  console.log("req current job" + is_current_job);
  let dohavejob;
  if (is_current_job == "No") {
    dohavejob = false;
  } else if (is_current_job == "Yes") {
    dohavejob = true;
  }

  console.log("params" + req.params.id);
  console.log("user.id" + req.user.id);
  if (req.params.id !== req.user.id) {
    return next(errorHandler("401", "You can only update your own account"));
  }

  const user = await User.findById(req.user.id);
  console.log("current job" + dohavejob);
  try {
    const UpdatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          country: country,
          region: region,
          city: city,
          "experience.profession": profession,
          "experience.year_of_experience": year_of_experience,
          "experience.is_current_job": dohavejob,
          "experience.company_name": dohavejob ? company_name : "",
          "education_status.educational_level": educational_level,
          "experience.job_title": dohavejob ? job_title : "",
          //  {
          //   $cond: {
          //     if: { "experience.is_current_job": { $eq: false } },
          //     then: "$$REMOVE",
          //     else: "experience.job_title",
          //   },
          // },
          "education_status.field_of_study": field_of_study,
        },
      },
      { new: true }
    );
    console.log("hello rest");
    const { password, ...rest } = UpdatedUser._doc;
    console.log("rest", rest);

    res.status(200).json({ rest });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const test = (req, res) => {
  console.log("update user info");
  res.json({
    message: "Api route is working!",
  });
};
