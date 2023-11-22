import { errorHandler } from "../utils/error.js";
import Post from "../models/postModel.js";

export const getLatestJobs = async (req, res, next) => {
  const limit = 5;
  console.log("dfvhbjhfd");
  try {
    //const latestJobs = await Post.find({}).sort({ $natural: -1 }).limit(5);

    const latestJobs = await Post.aggregate([
      {
        $lookup: {
          from: "employers",
          localField: "employer",
          foreignField: "_id",
          as: "employer_detail",
        },
      },
      { $sort: { createdAt: -1 } },
      { $limit: 5 },
    ]);

    // latestJobs.aggregate([
    //   {
    //     $lookup:{
    //       from: "employer",
    //       localField: ""
    //     }
    //   }
    // ])

    res.status(200).json({ latestJobs });
  } catch (err) {
    next(err);
  }
};

export const getJob = async (req, res, next) => {
  try {
    //const latestJobs = await Post.find({}).sort({ $natural: -1 }).limit(5);

    // const jobs = await Post.find({ _id: req.params.id }).aggregate([
    //   {
    //     $lookup: {
    //       from: "employers",
    //       localField: "employer",
    //       foreignField: "_id",
    //       as: "employer_detail",
    //     },
    //   },
    // ]);
    console.log(req.params.id);
    const Job = await Post.aggregate([
      { $match: { $expr: { $eq: ["$_id", { $toObjectId: req.params.id }] } } },
      {
        $lookup: {
          from: "employers",
          localField: "employer",
          foreignField: "_id",
          as: "employer_detail",
          pipeline: [
            {
              $project: {
                _id: 1,
                company_name: 1,
                company_image: 1,
                contact_number: 1,
                email: 1,
              },
            },
          ],
        },
      },
    ]);

    res.status(200).json({ Job });
  } catch (err) {
    next(err);
  }
};

export const getPostandEmployerInfo = async (req, res, next) => {
  try {
    //const latestJobs = await Post.find({}).sort({ $natural: -1 }).limit(5);

    // const jobs = await Post.aggregate([
    //   {
    //     $lookup: {
    //       from: "employers",
    //       localField: "employer",
    //       foreignField: "_id",
    //       as: "employer_detail",
    //       pipeline: [
    //         {
    //           $group: {
    //             _id: { $toLower: "$keywords" },
    //             count: { $sum: 1 },
    //           },
    //         },
    //       ],
    //     },
    //   },
    // ]);

    const Job = await Post.aggregate([
      {
        $facet: {
          posts: [
            {
              $count: "numberofpost",
            },
          ],
          employers: [
            {
              $group: {
                _id: { employer: "$employer" },
                count: { $sum: 1 },
              },
            },
            {
              $count: "numberofemployer",
            },
          ],
        },
      },
    ]);

    res.status(200).json(Job);
  } catch (err) {
    next(err);
  }
};

export const getbyJobCategory = async (req, res, next) => {
  const category = req.params.category;
  const limit = parseInt(req.query.limit) || 2;
  const startIndex = parseInt(req.query.startIndex) || 0;
  let posts;
  console.log("start" + startIndex);

  try {
    // const posts = await Post.find({
    //   job_category: category,
    // });
    if (startIndex == 0) {
      posts = await Post.aggregate([
        {
          $facet: {
            posts: [
              {
                $match: {
                  job_category: category,
                },
              },
              {
                $lookup: {
                  from: "employers",
                  localField: "employer",
                  foreignField: "_id",
                  as: "employer_detail",
                  pipeline: [
                    {
                      $project: {
                        _id: 1,
                        company_name: 1,
                        company_image: 1,
                        contact_number: 1,
                        email: 1,
                      },
                    },
                  ],
                },
              },
              {
                $sort: { createdAt: -1 },
              },
              {
                $limit: limit,
              },
            ],
            total_posts: [
              {
                $match: {
                  job_category: category,
                },
              },
              {
                $count: "total_posts",
              },
            ],
          },
        },
      ]);
    } else {
      posts = await Post.aggregate([
        {
          $facet: {
            posts: [
              {
                $match: {
                  job_category: category,
                },
              },
              {
                $lookup: {
                  from: "employers",
                  localField: "employer",
                  foreignField: "_id",
                  as: "employer_detail",
                  pipeline: [
                    {
                      $project: {
                        _id: 1,
                        company_name: 1,
                        company_image: 1,
                        contact_number: 1,
                        email: 1,
                      },
                    },
                  ],
                },
              },
              {
                $sort: { createdAt: -1 },
              },
              {
                $skip: startIndex,
              },

              {
                $limit: limit,
              },
            ],
            total_posts: [
              {
                $match: {
                  job_category: category,
                },
              },
              {
                $count: "total_posts",
              },
            ],
          },
        },

        // {
        //   $match: {
        //     job_category: category,
        //   },
        // },
        // {
        //   $lookup: {
        //     from: "employers",
        //     localField: "employer",
        //     foreignField: "_id",
        //     as: "employer_detail",
        //     pipeline: [
        //       {
        //         $project: {
        //           _id: 1,
        //           company_name: 1,
        //           company_image: 1,
        //           contact_number: 1,
        //           email: 1,
        //         },
        //       },
        //     ],
        //   },
        // },
      ]);
    }

    if (!posts) {
      res.status(200).json({});
    }

    res.status(200).json({ posts });
  } catch (err) {
    next(err);
  }
};

export const searchPost = async (req, res, next) => {
  let searchTerm = req.query.searchTerm;
  let posts;

  let job_category = req.query.job_category || { $nin: [""] };
  let work_location =
    req.query.work_location != null
      ? { $regex: req.query.work_location, $options: "i" }
      : {
          $nin: [""],
        };

  try {
    // const posts = await Post.find({
    //   $text: { $search: req.query.searchTerm },
    //   job_category,
    //   work_location,
    // });

    if (searchTerm != null) {
      posts = await Post.aggregate([
        {
          $match: {
            $text: { $search: req.query.searchTerm },
            job_category,
            work_location,
          },
        },
        {
          $lookup: {
            from: "employers",
            localField: "employer",
            foreignField: "_id",
            as: "employer_detail",
            pipeline: [
              {
                $project: {
                  _id: 1,
                  company_name: 1,
                  company_image: 1,
                  contact_number: 1,
                  email: 1,
                },
              },
            ],
          },
        },
      ]);
    } else {
      posts = await Post.aggregate([
        {
          $match: {
            job_category,
            work_location,
          },
        },
        {
          $lookup: {
            from: "employers",
            localField: "employer",
            foreignField: "_id",
            as: "employer_detail",
            pipeline: [
              {
                $project: {
                  _id: 1,
                  company_name: 1,
                  company_image: 1,
                  contact_number: 1,
                  email: 1,
                },
              },
            ],
          },
        },
      ]);
    }

    res.json({ posts });
  } catch (err) {
    next(err);
  }
};
