# UdaySamsani

This blog is taken from AstroPaper, and is built with Astro and TinaCMS.

Feature Implementation:

- All the blog posts are stored in markdown only and will take few seconds to get deployed once you publish them from admin dashboard.
- All the media uploaded from admin dashboard is being sent to cloudinary CDN, which we have a free account of and has only **1GB** of space.
- All the blog posts will have an og image generated from astro itself so no point in editing one.
- In admin dashboard you can add FAQ questions in the blog which will be placed in the bottom of the blog posts.

## File Structure

```
/
├── public/
│   ├── assets/
│   │   └── logo.svg
│   │   └── logo.png
├── admin/
│   │   └── index.html
│   └── favicon.svg
│   └── robots.txt
│   └── toggle-theme.js
├── src/
│   ├── assets/
│   │   └── socialIcons.ts
│   ├── components/
│   ├── content/
│   │   |  blog/
│   │   |    └── some-blog-posts.md
│   │   └── config.ts
│   ├── layouts/
│   └── pages/
│   └── styles/
│   └── utils/
│   └── config.ts
│   └── types.ts
├── tina/
│   ├── config.ts
└── package.json
```

## 💻 Tech Stack

- **Main Framework** - [Astro](https://astro.build/)
- **Type Checking** - [TypeScript](https://www.typescriptlang.org/)
- **CMS** - [TinaCMS](https://tina.io/)
- **Component Framework** - [ReactJS](https://reactjs.org/)
- **Styling** - [TailwindCSS](https://tailwindcss.com/)
- **Fuzzy Search** - [FuseJS](https://fusejs.io/)
- **Icons** - [Boxicons](https://boxicons.com/) | [Tablers](https://tabler-icons.io/)
- **Code Formatting** - [Prettier](https://prettier.io/)
- **Linting** - [ESLint](https://eslint.org)

## 👨🏻‍💻 Running Locally

The easiest way to run this project locally is to run the following command in your directory.

```bash
npm run dev
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                                                                                                           |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `npm install`          | Installs dependencies                                                                                                            |
| `npm run dev`          | Starts local dev server at `localhost:4321`                                                                                      |
| `npm run build`        | Build your production site to `./dist/`                                                                                          |
| `npm run preview`      | Preview your build locally, before deploying                                                                                     |
| `npm run format:check` | Check code format with Prettier                                                                                                  |
| `npm run format`       | Format codes with Prettier                                                                                                       |
| `npm run sync`         | Generates TypeScript types for all Astro modules. [Learn more](https://docs.astro.build/en/reference/cli-reference/#astro-sync). |
| `npm run cz`           | Commit code changes with commitizen                                                                                              |
| `npm run lint`         | Lint with ESLint                                                                                                                 |
