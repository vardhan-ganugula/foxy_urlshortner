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
    console.log("duplicated");
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
    console.log(e);
    res.status(404).json({
      status: "error",
      data: e.toString(),
    });
  }
}

async function handleAnalytics(req, res) {
  const shortId = req.body.id;
  const domain = req.body.domain;
  console.log(shortId, domain);
  const result = await URL.findOne({ shortId, domain });
  res.json({
    result,
  });
}

module.exports = {
  handleCreateURL,
  handleUrlForward,
  handleAnalytics,
};
