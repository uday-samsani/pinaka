import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    // cloudinary
    loadCustomStore: async () => {
      const pack = await import("next-tinacms-cloudinary");
      return pack.TinaCloudCloudinaryMediaStore;
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "blog",
        label: "Blogs",
        path: "src/content/blog",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
            ui: {
              validate: (value, data) => {
                const lengthOfTitle = value?.length || 0;
                const lengthOfDescription = data?.description?.length || 0;
                if (lengthOfTitle >= lengthOfDescription) {
                  return "The description must be longer than the title";
                }
              },
            },
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            required: true,
            options: ["Uday"],
          },
          {
            type: "datetime",
            name: "pubDatetime",
            label: "Publish Date Time",
            required: true,
          },
          {
            type: "datetime",
            name: "modDatetime",
            label: "Modified Date Time",
            ui: {
              validate: (value, data) => {
                const modifiedDate = new Date(value);
                const publishDate = new Date(data?.pubDatetime);
                if (modifiedDate < publishDate) {
                  return "You cannot set modified date before published date.";
                }
              },
            },
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured",
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft",
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              {
                name: "Callout",
                label: "Callout",
                fields: [{
                  name: "message",
                  label: "Message",
                  type: "string",
                },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "faqs",
            label: "FAQ's",
            list: true,
            fields: [
              {
                name: "question",
                label: "Question",
                type: "string",
              },
              {
                name: "answer",
                label: "Answer",
                type: "string",
              },
            ],
          },
        ],
        defaultItem: () => {
          return {
            pubDatetime: new Date().toISOString(),
            author: "Uday",
          };
        },
        ui: {
          filename: {
            // if disabled, the editor can not edit the filename
            readonly: true,
            // Example of using a custom slugify function
            slugify: (values) => {
              // Values is an object containing all the values of the form. In this case it is {title?: string, topic?: string}
              return `${values?.topic || "no-topic"}-${values?.title
                ?.toLowerCase()
                .replace(/ /g, "-")}`;
            },
          },
        },
      },
    ],
  },
});
