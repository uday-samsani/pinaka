// pages/api/cloudinary/[...media].ts
const { isAuthorized } = require("@tinacms/auth");
const {
  createMediaHandler,
  mediaHandlerConfig,
} = require("next-tinacms-cloudinary/dist/handlers");

module.exports.config = mediaHandlerConfig;

module.exports = createMediaHandler({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
  authorized: async (req: Request, res: Response) => {
    try {
      if (process.env.NODE_ENV === "development") {
        return true;
      }

      const user = await isAuthorized(req);

      return (user && user.verified);
    } catch (e) {
      console.log("Error");
      console.error(e);
      return false;
    }
  },
});