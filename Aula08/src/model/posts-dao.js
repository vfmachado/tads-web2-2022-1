const { getConnection } = require("../config/database");

class PostsDao {
  static async findAll() {
    const con = await getConnection();
    const result = await con.query('select * from posts');
    console.log({ result })
    return result.rows;
  }

  static async findById(id) {
    try {
      const con = await getConnection();
      const result = await con.query('select * from posts where id = $1', [id]);
      console.log({ result })
      return result.rows[0];
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = { PostsDao };
