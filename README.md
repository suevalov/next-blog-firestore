# Next Blog Firestore

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

This blog uses Next.js for SSR & Firebase Firestore API for storing and fetching data. Create and edit your content in simple custom content management
system built with React, Mobx State Tree and Styled Components.

Clone this repo and use it as starting point to create your own fancy blog.

## Technology stack:

  * [React](https://github.com/facebook/react)
  * [Next.js](https://github.com/zeit/next.js)
  * [Firebase Firestore & Auth](https://firebase.google.com/)
  * [Styled-Components](https://github.com/styled-components/styled-components)
  * [Mobx-State-Tree](https://github.com/mobxjs/mobx-state-tree)
  * [Ant Design](https://github.com/ant-design/ant-design)
  * [Marksy](https://github.com/storybooks/marksy)
  * [ESLint](https://github.com/eslint/eslint)
  * [Prettier](https://github.com/prettier/prettier)
  * [Webpack](https://github.com/webpack/webpack)
  * [Husky](https://github.com/typicode/husky) & [Lint-Staged](https://github.com/okonet/lint-staged)

## What you get:

  * Posts feed
  * Featured posts
  * Posts by tags and category
  * Multi language support
  * Multi author support
  * Markdown with ability to use custom React components
  * Simple and convenient CMS inspired by Ghost
  * CMS is protected by Firebase Auth
  * Quick and SEO-friendly responses with SSR
  * Good results in Lighthouse

## Getting started

**Step 1** Create [Firebase account](https://console.firebase.google.com)

**Step 2** Setup Authentication 
 
  * Click "Set up sign-in method" on Authentication section.
  * Enable just Google authentication provider.
  * Add your domain (if you have one) to "Authorized domains".
 
**Step 3** Create Firestore database

Go to "Database" section and create Firestore instance. Firestore is still in beta, but we don't care.
 
**Step 4** Database configuration.
 
* Go to "Rules" section in your database and paste configuration from `.firebase-rules` in project root.
* Publish new rules.
 
**Step 5** Set up Firebase secret keys for our app.

* Create `.env` at the root of the project. Do not commit this file. It is personal data that should not be available for everyone.
* Go to "Project settings" in Firebase console (click on the gear icon next to "Project Overview"). 
* Copy data from this page to `.env` in the following format:
 
 ```bash
 F_PROJECT_ID=<your Project ID>
 F_AUTH_DOMAIN=<your Project ID>.firebaseapp.com
 F_API_KEY=<your Web API Key>
 ```

**Step 6** Set up Firebase Admin SDK key for importing/exporting data from database

In order to be able to initialize database with initial seed we need to generate
private Firebase Admin service key.

Go to "Project Settings" => "Service Accounts" and click "Generate new private key" button.
Save downloaded file as `firebase-service-key.json` at project root. Do not commit this file. It's added to `.gitignore` by default.

**Step 7** Initialize database with initial data

We almost finished. Let's initialize our database with initial data.

```bash
yarn run seed
```

**Step 8** Setup database indexes.

**Step 9** Run blog locally

**Step 10** Sign in to admin part

**Step 11** Ready to go! Create new post or edit existing and publish changes.


## License

Licensed under the MIT License, Copyright © 2018-present Alexander Suevalov

See [LICENSE](./LICENSE) for more information.
