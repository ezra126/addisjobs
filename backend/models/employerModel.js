import mongoose from "mongoose";

const { Schema } = mongoose;

// const jobpostSchema = new mongoose.Schema(
//   {
//     job_title: {
//       type: String,
//     },
//     job_category: {
//       type: String,
//     },
//     job_description: {
//       type: String,
//     },
//     employement_type: {
//       type: String,
//     },
//     payment: {
//       type: String,
//     },
//     work_location: {
//       type: String,
//     },
//     amount_of_people_required: {
//       type: String,
//     },
//     deadline: {
//       type: String,
//     },
//   },
//   { timestamps: true }
// );

const employerSchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
      unique: [true, "company name must be unique"],
    },
    email: {
      type: String,
      unique: [true, "emploer with this email already registered"],
    },
    password: {
      type: String,
    },
    agency_license_number: {
      type: String,
    },
    contact_number: {
      type: String,
    },
    company_image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    job_posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

const Employer = mongoose.model("Employer", employerSchema);

export default Employer;
