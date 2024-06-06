---
title: Power up your Jamstack blog with Tina CMS
description: >-
  Discover why TinaCMS is the best choice for your JAMSTACK blog. Learn about
  its git-based workflow, open-source benefits, and powerful inline editing
  features. Perfect for developers and content creators seeking a flexible,
  modern CMS without vendor lock-in.
author: Uday
pubDatetime: 2024-05-21T23:08:55.122Z
slug: powerup-your-jamstack-tina-cms
draft: true
faqs:
  - question: Is this only for people with technical knowledge?
    answer: >-
      No, anyone can use this there is alot of documentations and help available
      online.
  - question: Is this completely free?
    answer: 'Yes, this is open source and is free forever if you use self hosting.'
  - question: Is my data stored in Git if I use Tina CMS?
    answer: 'Yes, all your data will be stored in git repository.'
---

Bloggers all need help with maintaining their content. That's why choosing a good Content Management System (CMS for short) is very important. We have to choose a CMS which is scalable, open, and without a vendor lock-in. We have several CMSs which are very good in their belt hitting way above their weight like Ghost CMS, Sanity, WordPress, and many more But I recently came across [Tina](https://tina.io "Tina") which is a git-based CMS which is unique and open. Let me introduce why Tina might be the best cms for your blog.

\## Table of contents

\## Why TinaCMS is best for content management?

\### Git Based:

While there are many CMS which provide API. This is one of the unique ones where all the content is stored in markdown format in a git repository without any vendor lock-in. On top of all this, you can leverage the benefits of git to your advantage such as commit history, tracking, environments, etc.

\### Open Source:

[TinaCMS](https://github.com/tinacms/tinacms "TinaCMS") started as an open-source project. Even now after the acquisition by an Australian firm, it is still committed by the firm and community to stay open source.

\### Inline Editing:

TinaCMS features inline editing, allowing you to update content directly on your website with a live preview. This intuitive editing experience streamlines content creation and management, making it accessible and efficient for users of all technical levels.

\## Who will be Tina CMS best for?

TinaCMS is best suited for developers and content creators looking for a flexible and modern content management solution. It's ideal for those who appreciate the benefits of a git-based workflow, offering robust version control and seamless collaboration. Additionally, its open-source nature makes it perfect for teams that need a customizable, scalable CMS without vendor lock-in. Whether you're managing a small personal blog or a large-scale content site, TinaCMS provides the tools and flexibility needed to efficiently.

\## How I am using the Tina CMS

I am using Tina CMS for this [blog](https://udaysamsani.com "blog"). The first thing that I did after setting Tina was to configure all the frontmatter properties for my markdown blog posts so that I could access them in my Astro markdown props. Apart from that I have changed my static media upload from git source to Cloudinary CDN for better image processing and image delivery.

Here are some snippets of how I configured the frontmatter properties and Static images handler.

\`\`\`typescript

{

&#x9;media: {

&#x9;  // cloudinary

&#x9;  loadCustomStore: async () => {

&#x9;    const pack = await import("next-tinacms-cloudinary");

&#x9;    return pack.TinaCloudCloudinaryMediaStore;

&#x9;  },

&#x9;},

}
{

name: "blog",

label: "Blogs",

path: "src/content/blog",

format: "md",

fields: \[

```javascript
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

  templates: \[  

    {  

      name: "Callout",  

      label: "Callout",  

      fields: \[{  

        name: "message",  

        label: "Message",  

        type: "string",  

      },  

      ],  

    },  

  ],  

},

&#x9;]

}

\`\`\`

\## Conclusion

TinaCMS stands out due to its open-source nature. It is an excellent choice for developers and content creators seeking a flexible and modern CMS without vendor lock-in. By leveraging TinaCMS, you can efficiently manage your blog, enjoy the benefits of version control, and customize the platform to suit your specific needs. If you're running a personal blog TinaCMS provides the tools and flexibility required for effective content management.
```
