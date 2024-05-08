// pages/api/s3/[...media].ts
const {
  mediaHandlerConfig,
  createMediaHandler,
} = require("next-tinacms-s3/dist/handlers");

const { isAuthorized } = require("@tinacms/auth");

module.exports.config = mediaHandlerConfig;

module.exports = createMediaHandler({
  config: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY || "",
      secretAccessKey: process.env.S3_SECRET_KEY || "",
    },
    region: process.env.S3_REGION,
  },
  bucket: process.env.S3_BUCKET || "",
  authorized: async (req: Request) => {
    if (process.env.NODE_ENV === "development") {
      return true;
    }
    try {
      const user = await isAuthorized(req);

      return user && user.verified;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
});