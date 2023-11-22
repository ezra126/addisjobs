import mongoose from "mongoose";
const { Schema } = mongoose;

const jobpostSchema = new mongoose.Schema(
  {
    employer: { type: Schema.Types.ObjectId, ref: "Employer" },
    job_title: {
      type: String,
    },
    job_category: {
      type: String,
    },
    job_description: {
      type: String,
    },
    employement_type: {
      type: String,
    },
    payment: {
      type: String,
    },
    work_location: {
      type: String,
    },
    amount_of_people_required: {
      type: String,
    },
    experience_level: {
      type: String,
    },
    deadline: {
      type: String,
    },
  },
  { timestamps: true }
);

jobpostSchema.index({
  job_description: "text",
  job_category: "text",
  job_title: "text",
});

const Post = mongoose.model("Post", jobpostSchema);

export default Post;
