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
`VITE_USER_POOL_ID` and
`VITE_USER_POOL_WEB_CLIENT_ID` (These are the values you get from step 4 above).
#### 3. Run the web app
```
npm run dev
```
- In a browser, open the sign up page at `http://localhost:5173/sign-up` and you can sign in from `http://localhost:5173/sign-in`


### Issues
The authentication process is not secured since only an email is required to register and login. The implication of this is that any email can be used to register and the knowledge of someone's email can get me access to their account (since emails are not private entities).

### Suggestions
There should be a limit of operations that can be performed by users with this type of authentication. Deleting and Editing should be restricted to users with more secure authentication methods.
