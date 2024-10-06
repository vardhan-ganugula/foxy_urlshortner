const shortid = require("shortid");
const URL = require("../models/shortUrl");

async function handleCreateURL(req, res) {
  const body = req.body;
  let shortId;
  if (body.shortCode) {
    shortId = body.shortCode;
  } else {
    shortId = shortid.generate();
  }
  const domain = process.env.BASE_URL;
  if (!body.url) {
    return res.json({
      status: false,
    });
  }
  const redirectUrl = body.url;
  try {
    await URL.create({
      shortId,
      redirectUrl,
      url: domain + "/" + shortId,
      domain: domain,
      viewHistory: [],
    });
    return res.json({
      status: true,
      shortId,
      url: domain + "/" + shortId,
    });
  } catch (e) {

    return res.json({
      status: false,
    });
  }
}

async function handleUrlForward(req, res) {
  const id = req.params.id;
  const xForwardedFor = req.headers["x-forwarded-for"];
  const ip = xForwardedFor? xForwardedFor.split(",")[0]: req.connection.remoteAddress;
  const device = req.useragent.platform;
  let deviceName = req.useragent.isMobile? "devices.mobile": req.useragent.isTablet? "devices.tablet" : "devices.desktop";
  try {
    const record = {
      date: Date.now(),
      ip,
      device: device,
    };
    const response = await URL.findOneAndUpdate(
      { shortId: id },
      { $inc: { [deviceName]: 1 },
        $push: { viewHistory: record } 
      },
      { new: true }
    );
    if (response.redirectUrl) res.redirect(response.redirectUrl);
    else res.redirect(process.env.ERROR_PAGE);
  } catch (e) {

    res.status(404).json({
      status: "error",
      data: e.toString(),
    });
  }
}

async function handleAnalytics(req, res) {
  const shortId = req.query.id;
  const result = await URL.findOne({ shortId },{ "devices.mobile": 1, "devices.tablet": 1, "devices.desktop": 1, _id: 0 });
  const statsPipeline = [
    {
        $match: {
          shortId
        }
    },
    {
        $unwind: "$viewHistory"
    },
    {
        $group: {
          _id: "$viewHistory",
        }
    },
    {
        $project: {
          date: "$_id.date",
          ip:"$_id.ip" ,
          device:"$_id.device",
          "_id" : 0
        }
    }
]
  const statsData = await URL.aggregate(statsPipeline)
  if(result && statsPipeline){
    res.json({
      status: 'success',
      devices : result["devices"],
      data : statsData
    });
  }else{
    res.json({
      status: 'error',
      msg : 'no result found',
      devices : [null]
    })
  }
}

module.exports = {
  handleCreateURL,
  handleUrlForward,
  handleAnalytics,
};
