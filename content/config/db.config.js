/**
 * Module dependencies.
 */
const util = require("util");
const dotenv = require("dotenv");

const db_config = {
	host: process.env.MONGO_HOST,
	user: process.env.MONGO_USER,
	password: process.env.MONGO_PASSWORD,
	database: process.env.MONGO_DATABASE,
};
users_mongo_uri = util.format(
	"mongodb+srv://%s:%s@%s/%s",
	db_config.user,
	db_config.password,
	db_config.host,
	db_config.database
);

users_mongo_uri = process.env.DB_ENV == 'CLOUD' ? users_mongo_uri : process.env.MONGO_LOCAL+ '?retryWrites=true&w=majority';

module.exports = { users_mongo_uri };
