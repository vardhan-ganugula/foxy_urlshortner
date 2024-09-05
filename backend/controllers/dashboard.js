const User = require("../models/User");
const URL = require("../models/shortUrl");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const shortid = require("shortid");
const dns = require("node:dns");
const { exec } = require("child_process");
const fs = require("fs");
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
    profileData: {},
  };

  const pipeline1 = [
    {
      $match: {
        createdBy: mongoose.Types.ObjectId.createFromHexString(userId),
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
        createdBy: mongoose.Types.ObjectId.createFromHexString(userId),
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
          $first: "$redirectUrl",
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
        _id: mongoose.Types.ObjectId.createFromHexString(userId),
      },
    },
    {
      $project: {
        username: 1,
        email: 1,
        domains: 1,
        profilePhoto: 1,
        _id: 0,
      },
    },
  ];
  try {
    const dashboardData = await URL.aggregate(pipeline1);
    const urlData = await URL.aggregate(pipeline2);
    const profileData = await User.aggregate(pipeline3);
    allData = {
      dashboardData,
      urlData,
      profileData,
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

async function handleCreteURL(req, res) {
  let { shortId, domain, url, userId } = req.body;
  if (!domain || !url || !userId) {
    return res.json({
      status: "failed",
      msg: "not enough values",
    });
  }
  if (!shortId) {
    shortId = shortid.generate();
  }

  try {
    const user = await User.findById(userId);
    if (user) {
      if (user.domains.includes(domain)) {
        try {
          await URL.create({
            shortId,
            redirectUrl: url,
            url: domain + "/" + shortId,
            domain: domain,
            viewHistory: [],
            createdBy: mongoose.Types.ObjectId.createFromHexString(userId),
          });
          return res.json({
            status: "success",
            shortId,
            url: domain + "/" + shortId,
          });
        } catch (e) {
          console.log(e);
          return res.json({
            status: "failed",
            msg: "duplicated url",
          });
        }
      } else {
        return res.json({
          status: "error",
          msg: "domain error",
        });
      }
    }
  } catch (e) {
    console.error(e);
  }

  res.json({
    msg: "processing",
  });
}

async function checkDnsRecords(req, res) {
  const hostname = req.query.addr;
  if (!hostname) {
    return res.json({
      status: "failed",
      msg: "address required",
    });
    return;
  }
  const options = {
    family: 4,
    hints: dns.ADDRCONFIG | dns.V4MAPPED,
  };
  dns.lookup(hostname, options, (err, addr, family) => {
    if (err) {
      return res.json({
        status: "failed",
        msg: "check your hostname",
        ipAddr: addr,
      });
    }
    if (addr === process.env.BASE_IP) {
      return res.json({
        status: "success",
        msg: "address configured successfully",
      });
    } else {
      return res.json({
        status: "failed",
        msg: "address is not configured",
      });
    }
  });
}

async function addDomainToNginx(req, res) {
  const domain = req.query.addr;
  const domainPattern =
    /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.[A-Za-z0-9-]{1,63}(?<!-))*\.[A-Za-z]{2,}$/;
  
  const isValidDomain = (domain) => domainPattern.test(domain);
  
  if (isValidDomain(domain)) {
    exec("node /controllers/nginxConfiguration.js > output.txt", (err, stdout, stderr) => {
      if (err) {
        return res.json({
          status: "failed",
          msg: err.message,
          pwd : process.cwd()
        });
      }

      fs.readFile("output.txt", 'utf8', (err, data) => {
        if (err) {
          return res.json({
            status: "failed",
            msg: "Something went wrong while reading the output file",
          });
        }

        return res.json({
          status: "success",
          msg: "Domain added successfully",
          output: data,
        });
      });
    });
  } else {
    return res.json({
      status: "failed",
      msg: "Not a valid domain",
    });
  }

}
module.exports = {
  handleHome,
  handleCreteURL,
  checkDnsRecords,
  addDomainToNginx
};
