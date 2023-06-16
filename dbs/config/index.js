import "../../dotenv.js";

const { DB_USER, DB_PASS, DB_NAME, SERVER_HOST, DIALET } = process.env;

export default {
  development: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: SERVER_HOST,
    dialect: DIALET,
  },
};
