const User = require("../models/User");
const URL = require("../models/shortUrl");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const secret = process.env.SECRET;

async function handleHome(req, res) {
  const userId = req.query.userId;
  if (typeof userId === "undefined") {
    return res.json({
      status: "failed",
      details: "please login",
    });
  }

  let allData = {
    dashboardData: {},
    urlData: {},
    profileData: {}
  };

  const pipeline1 = [
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $unwind: {
        path: "$viewHistory",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$shortId",
        totalClicks: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        totalClicks: -1,
      },
    },
    {
      $limit: 15,
    },
  ];

  const pipeline2 = [
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $unwind: {
        path: "$viewHistory",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$shortId",
        createdAt: {
          $first: "$createdAt",
        },
        domain: {
          $first: "$domain",
        },
        url: {
          $first: "$url",
        },
        totalClicks: {
          $sum: 1,
        },
        devices: {
          $first: "$devices",
        },
      },
    },
  ];

  const pipeline3 = [
    {
        $match: {
          "_id" : new mongoose.Types.ObjectId(userId)
        }
    },
    {
        $project: {
          "username" : 1,
          "email" : 1,
          "domains" : 1,
          "profilePhoto" : 1,
          "_id" : 0
        }
    }
]
  try {
    const dashboardData = await URL.aggregate(pipeline1);
    const urlData = await URL.aggregate(pipeline2);
    const profileData = await User.aggregate(pipeline3);
    allData = {
      dashboardData,
      urlData,
      profileData
    };

    return res.json(allData);
  } catch (err) {
    return res.json({
      status: "failed",
      details: "failed to get details",
      error: err.message,
    });
  }
}

module.exports = {
  handleHome,
};
