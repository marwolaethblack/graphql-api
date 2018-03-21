# graphql-api
GraphQL api runnng on Nodejs + Express using PostgressSQL for data persistence

Uses JWT for authentication.

Requires a config.js file with a secret and issuer in the auth folder
e. g.  ```const config = { secret: "SuperSecretString", issuer: "mydomain" }```

```yarn run dev``` to start
