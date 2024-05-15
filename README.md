# Express starter

My personal boiler plate for zod-express-api with jwt, auth, docs generation.

To learn more about express-zod-api: https://www.npmjs.com/package/express-zod-api

## Getting started

Installing the dependencies
```bash
yarn install
```

Start the development server
```bash
yarn dev
```

To generate API - Specs
```bash
yarn generate:docs
```

To generate Client TS
```bash
yarn generate:client
```

## Microsoft Auth
```bash
# Get: /v1/auth/microsoft/login
This would redirect user to login their microsoft account and redirect to the url below

# Redirect to: /v1/auth/microsoft/callback
This would return a valid token that contain user information like name and email.
```
