import { promisePool } from "../../utils/database.mjs";


/**
 * Fetch user from database based on user name/password pair
 * 
 * @param {object} userCreds - Contains {ussername, password} properties
 * @returns user object
 */
const login = async (userCreds) => {
  try {
    // mitä tarvitaan tietokannasta ja mitä tarvitaan tallentaa tokenina
		const sql = `SELECT user_id, username, user_level_id FROM Users WHERE username = ? AND password = ?`;
		const params = [userCreds.username, userCreds.password];
    const result = await promisePool.query(sql, params);
    const [rows] = result;
    console.log('rows', rows);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
}

const fetchAllUsers = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM Users');
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};


const fetchUser = async (id) => {
  try {
		const sql = `SELECT * FROM Users WHERE user_id =?`;
		const params = [id]
    const [rows] = await promisePool.query(sql, params);
    console.log('rows', rows);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
}

const addUser = async (newUser) => {
  const {username, password, user_level_id, email} = newUser;
  const sql = `INSERT INTO Users (username, password, email, user_level_id) 
  VALUES (?, ?, ?, ?);`
  const params = [username, password, email, user_level_id];
  console.log(sql);
  try {
    const [rows] = await promisePool.query(sql, params);
    return {user_id: rows.insertId};
    } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
}

export {fetchAllUsers, fetchUser, addUser, login};