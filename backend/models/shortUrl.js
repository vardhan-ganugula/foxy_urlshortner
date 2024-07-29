const mongoose = require("mongoose");

const historySchema = mongoose.Schema(
  {
      date: {
          type: Number,
          required: true,
      },
      ip: {
          type: String,
          required: true,
      },
      device : {
          type: String,
          required: true,
      }
  }
)

let urlSchema = mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    url:{
      type: String,
      required: true,
      unique: true,
    },
    domain : {
      type: String,
      required: true
    },
    viewHistory: [ historySchema ],
    createdBy : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'users',
      default : '669b6a5bf4ee76c4f6573efe'
    }
  },
  { timestamps: true }
);

const URL = mongoose.model('url', urlSchema);

module.exports = URL;