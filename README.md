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
## Env
![image](https://github.com/nonwiz/express-starter/assets/93533702/cf46cce7-72a7-4e12-9fde-a9fe12629cdc)


## Microsoft Auth
```bash
# Get: /v1/auth/microsoft/login-url
Retrive microsoft_login_url

# Redirect to: /v1/auth/microsoft/callback
Redirect back to frontend (can be any url) with token in the query.
```

