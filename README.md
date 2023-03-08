# aws-serverless-cognito-passwordless-auth-poc

A POC demonstrating how to create passwordless authentication system using AWS Cognito, Lambda and the Serverless framework.

The repository has two parts:
- the `backend` developed with serverless, aws and typescript and
- the `client` developed using react and typescript bootstrapped with [vite](https://vitejs.dev/).


## Download repository

```
git clone git@github.com:Collaborne/aws-serverless-cognito-passwordless-auth-poc.git
cd aws-serverless-cognito-passwordless-auth-poc
```
## Backend
#### 1. Install dependencies
```
cd backend
npm install
```

#### 2. Set up environment
- Open the `serverless.yml` file
- Set your values for:
    - provider.profile (serverlessUser)
    - provider.region
    - custom.emailFrom
#### 3. Build and deploy
```
npm run build
npx serverless deploy
```

#### 4 Get auth credentials
- Run `npx sls info --verbose` to get the values of `UserPoolClientId`, `UserPoolId` and `ServiceEndpoint` (You will need these for the client).


## Client
#### 1 Install dependencies
```
cd client
npm install
```

#### 2 Set environment variables
- Create a `.env` from the `.env.example` template
- Set the values of `VITE_REGION`,
`VITE_USER_POOL_ID`,
`VITE_USER_POOL_WEB_CLIENT_ID` and `VITE_LOGIN_API_ENDPOINT` (These are the values you get from step 4 above; `VITE_LOGIN_API_ENDPOINT` is the `ServiceEndpoint`).
#### 3. Run the web app
```
npm run dev
```
- In a browser, open the sign up page at `http://localhost:5173/sign-up` and you can sign in from `http://localhost:5173/sign-in`
