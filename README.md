# glasp
GraphQL, Lerna, Aws Lambda, Serverless and PosgreSQL Repository

Setup a microservice and a gateway w/ pure Apollo GraphQL

## Step 1: Setup up your packages with Yarn and Lerna
```
yarn
lerna link
```

## Step 2: Go to a package
```
cd src/packages/auth
go serverless.yml 
profile: wet <- my local profile name to your local awscli name (Remove if set to default)
```

## Step 3: Deploy the package with serverless framework
```
cd src/packages/auth
serverless deploy --function graphql (change function name if you want)
sls info
```

## Step 4: Once provided with the deployed link if every thing with aws is successful
The link would look something like this
```
https://8pmskb88j3.execute-api.ap-southeast-1.amazonaws.com/dev/graphql
```
`src/gateway/schema.ts`
```
const link = createHttpLink({ uri: <Replace with your link here> })
```


## Step 5: Test or deploy the gateway
```
cd src/gateway
sls offline
```

Enjoy!
