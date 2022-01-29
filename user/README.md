## User Service

## Requests

---

|       Path       | Method |                                                                Body?                                                                |         Goal         |
| :--------------: | :----: | :---------------------------------------------------------------------------------------------------------------------------------: | :------------------: |
|      /user       |  POST  | {username: string, password: string, firstname: string, lastname: string, email_id: string, isd_code: string, phone_number: string} |  Create a new user   |
| /user/{username} |  GET   |                                                                 {}                                                                  |    Get user info     |
| /user/{username} |  PUT   |                                                         {password: string}                                                          | Update user password |
| /user/{username} | DELETE |                                                                 {}                                                                  |     Delete user      |

---

For environment variables, see the [Environment Variables](#environment-variables) section.

# environment-variables

````MONGO_HOST=<host>.mongodb.net
MONGO_USER=<user>
MONGO_PASSWORD=<password>
MONGO_DATABASE=db
JWT_SECRET=<secret>
PORT=3002
DB_ENV=CLOUD
MONGO_LOCAL=```
````
