import Employer from "../models/employerModel.js";
import Post from "../models/postModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import { JobCategory } from "../utils/job_category_list.js";

export const postNewJob = async (req, res, next) => {
  const {
    job_title,
    job_category,
    employement_type,
    payment,
    experience_level,
    work_location,
    amount_of_people_required,
    job_description,
    deadline,
  } = req.body;

  console.log("params" + req.params.id);
  console.log("user.id" + req.user.id);
  if (req.params.id !== req.user.id) {
    return next(errorHandler("401", "You can only update your own account"));
  }

  console.log("req.body" + job_description + employement_type);

  const employer = await Employer.findById(req.user.id);
  console.log("current job");
  try {
    // const newpost = await Employer.findByIdAndUpdate(
    //   req.params.id,
    //   {
    //     $set: {
    //       "job_posts.job_title": job_title,
    //       "job_posts.job_category": job_category,
    //       "job_posts.job_description": job_description,
    //       "job_posts.employement_type": employement_type,
    //       "job_posts.payment": payment,
    //       "job_posts.work_location": work_location,
    //     },
    //   },
    //   { new: true }
    // );

    const newpost = new Post({
      employer: req.params.id,
      job_title: job_title,
      job_category: job_category,
      job_description: job_description,
      employement_type: employement_type,
      payment: payment,
      work_location: work_location,
      amount_of_people_required: amount_of_people_required,
      experience_level: experience_level,
      deadline: deadline,
    });

    await newpost.save();

    console.log("hello rest");
    const { ...rest } = newpost._doc;
    console.log("rest", rest);

    res.status(200).json({ rest });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const updateEmployerInfo = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return next(errorHandler("401", "You can only update your own account"));
  }

  if (req.body.password) {
    const hashedpassword = bcryptjs.hashSync(req.body.password, 10);
  }
  try {
    const Updatedemployer = await Employer.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          company_name: req.body.company_name,
          contact_number: req.body.contact_number,
          company_image: req.body.company_image,
          agency_license_number: req.body.agency_license_number,
          email: req.body.email,
        },
      },
      { new: true }
    );
    console.log("hello rest");
    const { password, ...rest } = Updatedemployer._doc;
    console.log("rest", rest);

    res.status(200).json({ rest });
  } catch (err) {
    console.log("sdkjkdj");
    next(err);
  }
};

export const getAllPosts = async (req, res, next) => {
  // if (req.params.id !== req.user.id) {
  //   return next(errorHandler("401", "only employer acces"));
  // }

  try {
    const posts = await Post.find({
      employer: req.params.id,
    });
    res.status(200).json({ posts });
  } catch (err) {
    next(err);
  }
};

export const getPost = async (req, res, next) => {
  // if (req.params.id !== req.user.id) {
  //   return next(errorHandler("401", "only employer acces"));
  // }
  console.log("params" + req.params.id);
  try {
    const post = await Post.findOne({
      _id: req.params.id,
    });
    res.status(200).json({ post });
  } catch (err) {
    next(err);
  }
};

export const editJobPost = async (req, res, next) => {
  // const {
  //   job_title,
  //   job_category,
  //   employement_type,
  //   payment,
  //   experience_level,
  //   work_location,
  //   amount_of_people_required,
  //   job_description,
  //   deadline,
  // } = req.body;

  console.log("params" + req.params.id);
  console.log("user.id" + req.user.id);

  const post = await Post.findById(req.params.id);

  if (post.employer != req.user.id) {
    return next(errorHandler("401", "only employer can update post"));
  }

  try {
    const updatedpost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          job_title: req.body.job_title,
          job_category: req.body.job_category,
          employement_type: req.body.employement_type,
          payment: req.body.payment,
          experience_level: req.body.experience_level,
          work_location: req.body.work_location,
          amount_of_people_required: req.body.amount_of_people_required,
          job_description: req.body.job_description,
          deadline: req.body.deadline,
        },
      },
      { new: true }
    );

    console.log("hello rest");
    const { ...rest } = updatedpost._doc;
    console.log("rest", rest);

    res.status(200).json({ rest });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const listJobCategoryByNumber = async (req, res, next) => {
  console.log("dfsnknfjngjgfbsjhbghsbrhbvjhsbf");

  try {
    let post = await Post.aggregate([
      {
        $group: {
          _id: "$job_category",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    console.log(post);
    //for (let i = 0; i <= JobCategory.length; i++) {
    // let post = await Post.find({ job_category: JobCategory[i] });

    // if (post) {
    //   if (post.length > 0) {
    //     categoryByNumber.push({
    //       job_category: JobCategory[i],
    //       number_of_list: post.length,
    //     });
    //   }
    // }

    res.status(200).json({ post });
    // if (categoryByNumber.length != 0) {

    // } else {
    //   res.status(200).json({
    //     result: "no job list font",
    //   });
    // }
  } catch (err) {
    next(err);
  }
};
