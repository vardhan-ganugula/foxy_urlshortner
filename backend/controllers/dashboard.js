const User = require("../models/User");
const URL = require("../models/shortUrl");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mongoose = require('mongoose')


dotenv.config();
const secret = process.env.SECRET;

async function handleHome(req,res){
  const pipeline =  [
    {
      $match : {
        createdBy : new mongoose.Types.ObjectId(req.body.userId)
      }
    },
    {
      $unwind: {
        path: "$viewHistory",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group : {
        _id : "$shortId",
        totalClicks : {
          $sum : 1
        }
      }
    },
    {
      $sort : {
        totalClicks : -1
      }
    },
    {
      $limit : 15
    }
  ]

  URL.aggregate(pipeline).then(
    resp => {
      res.json({
        resp
      })
    }
  ).catch( err => {
    res.json({
      status : 'failed',
      error : 'failed to get details'
    })
  })
  
}

async function getAllUrls(req,res){
  const pipeline = [
    {
      $match : {
        "createdBy": new mongoose.Types.ObjectId(req.query.userId)
      }
    },
    {
      $unwind: {
        path: "$viewHistory",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group : {
        _id : "$shortId",
        createdAt : {
          $first : "$createdAt"
        },
        domain : {
          $first : "$domain"
        },
        url : {
          $first : "$url"
        },
        totalClicks : {
          $sum : 1
        }
      }
    }
  ] 
  URL.aggregate(pipeline).then(resp => {
    res.json({
      data : resp
    })
  }).catch(err => res.json({
    status : 'failed',
    details : err
  }))
}

module.exports = {
  handleHome,getAllUrls
};
