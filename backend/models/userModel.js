import mongoose from "mongoose";

const GENDER = ["MALE", "FEMALE"];

const experienceSchema = new mongoose.Schema({
  is_current_job: {
    type: Boolean,
  },
  year_of_experience: {
    type: String,
  },
  profession: {
    type: Array,
  },
  company_name: {
    type: String,
  },
  job_title: {
    type: String,
  },
});

const educationDetailSchema = new mongoose.Schema({
  field_of_study: {
    type: String,
  },
  educational_level: {
    type: String,
  },
});

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "email already existed"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    date_of_birth: {
      type: Date,
    },
    country: {
      type: String,
    },
    region: {
      type: String,
    },
    city: {
      type: String,
    },
    gender: {
      type: String,
      enum: GENDER,
    },
    phone_number: {
      type: String,
      index: {
        unique: [true, "user with this number already exist"],
        sparse: true,
      },
    },
    user_image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    skills: {
      type: Array,
    },
    experience: experienceSchema,
    education_status: educationDetailSchema,
  },
  {
    virtuals: {
      full_name: {
        get() {
          return this.first_name + " " + this.last_name;
        },
      },
    },
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
