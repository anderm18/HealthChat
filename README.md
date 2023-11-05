# HealthChat
### An AI engine to search the web and generate instant results aiming to connect doctors with patients.

HealthChat is a Web application that can be used across any device. It's goal is to offer medical information assistance to those in new or different areas, as well as those just looking for who to see for an issue. HealthChat uses the **Bing Chat AI engine** in order to combine the power of **GPT-4** and **Bing** to search for what specialty doctor fits a patients medical issue, as well suggests possible causes.

### NOTE: HealthChat should not be used to make diagnoses! It is simply to help patients better understand where and how they can get medical attention!

HealthChat is different than your standard Google search. **Powered by AI, HealthChat can process natural language in order to make predictions on what might be causing you issues, and suggest who you should see if you are concerned, without you needing to search at all!**

All of this is packaged nicely into a text-message format interface that is easy to pick up for all users. HealthChat was built from the ground up using **Next.js** with usability in mind!


## Development 
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes] This project has two API routes:

/api/askMed - POST \
{\
    "MEDICAL_ISSUE": string,\
    "CITY": string,\
    "STATE": string,\
    "INSURANCE": string\
}\
\
\
/api/searchMed - POST \
{\
    "MEDICAL_ISSUE": string\
}


The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deployment on Vercel

The [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) hosts this site

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
