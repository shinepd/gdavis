# Environment Variables for G. Davis & Associates Website

This project uses Sanity.io for content management. You'll need to set up the following environment variables to connect your Next.js application to Sanity.

Create a `.env.local` file in the root of your project with the following variables:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

## How to find your Sanity Project ID

1. Log in to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. The Project ID will be displayed in the project dashboard

## Development vs. Production

- For development, the CORS settings in your Sanity project should include `http://localhost:3000`
- For production, add your production domain to the CORS settings in your Sanity project dashboard

## Optional Environment Variables

For additional configuration, you may want to add:

```
NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
SANITY_API_TOKEN=your-sanity-api-token  # For private dataset access
```

The API token is only required if you need to access private datasets or perform write operations.
