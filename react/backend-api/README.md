To install backend dependencies, run

```
npm install
```

To configure the backend secrets, add ".env" file to the back-end root with the following content:

```
CONNECTIONSTRING=<mongo-db-connection-string>
PORT=<port-number>
JWTSECRET=<secret-phrase-or-password>
```

To start the backend server, run

```
npm run start
```
