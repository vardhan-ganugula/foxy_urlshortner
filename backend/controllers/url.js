const shortid = require("shortid");
const URL = require("../models/shortUrl");

async function handleCreateURL(req, res) {
  const body = req.body;
  let shortId;
  if (body.shortCode) {
    shortId = body.shortCode;
  } else {
    shortId = shortid.generate({
      length: 6, // Length of the ID
      charset: "alphabetic",
    });
  }
  if (!body.url || !body.domain) {
    return res.json({
      status: false,
    });
  }
  const redirectUrl = body.url;

  try {
    await URL.create({
      shortId,
      redirectUrl,
      url: body.domain + "/" + shortId,
      domain: body.domain,
      viewHistory: [],
    });
    return res.json({
      status: true,
      shortId,
      url: body.domain + "/" + shortId,
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
  const ip = xForwardedFor
    ? xForwardedFor.split(",")[0]
    : req.connection.remoteAddress;
  const device = req.useragent.platform;
  let deviceName = req.useragent.isMobile ? 'devices.mobile' : req.useragent.isTablet ? 'devices.tablet' : 'devices.desktop';
  try {
    const response = await URL.findOneAndUpdate(
      { url: req.headers.host + "/" + id },
      { $inc: { [deviceName]: 1 } },
      {
        $push: {
          viewHistory: {
            date: Date.now(),
            ip,
            device: device,
          },
        },
      }
    );

    res.redirect(response.redirectUrl);
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
