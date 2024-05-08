// pages/api/cloudinary/[...media].ts
const {
  mediaHandlerConfig,
  createMediaHandler,
} = require("next-tinacms-cloudinary/dist/handlers");

const { isAuthorized } = require("@tinacms/auth");

exports.config = mediaHandlerConfig;

module.exports = createMediaHandler({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
  authorized: async req => {
    try {
      if (process.env.NODE_ENV == "development") {
        return true;
      }

      const user = await isAuthorized(req);

      return !!(user && user.verified);
    } catch (e) {
      console.error(e);
      return false;
    }
  },
});

module.exports = createMediaHandler({});