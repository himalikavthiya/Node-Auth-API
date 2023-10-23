const client = require("../dbs/db.connect");

/**create User  */
const createUser = (req, res) => {
  const user = req.body;
  let insertQuery = `insert into test(id, username, contactno) 
                       values(${user.id}, '${user.username}', '${user.contactno}')`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Insertion was successful");
    } else {
      console.log(err.message);
    }
  });
};

/**get all users list */
const userList = (req, res) => {
  client.query(`Select * from test`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      console.error("Error executing query", err);
      res.status(500).send("Internal Server Error");
    }
  });
};

/**get user list by id */
const userListById = (req, res) => {
  client.query(`select *from test where id=${req.params.id}`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
};

/**update data by id */
const updateUser = (req, res) => {
  let testupdate = req.body;
 
  console.log(testupdate);

  let updateQuery = `UPDATE test
    SET username = '${testupdate.username}',
        contactno = '${testupdate.contactno}'
    WHERE id = ${testupdate.id}`;

  console.log(updateQuery);
  client.query(updateQuery, (err, result) => {
    if (!err) {
      res.send("Update was successful");
    } else {
      console.log(err.message);
        res.status(500).send("Internal Server Error");
    }
  });
};

/**Delete user */
const deleteUser = (req, res) => {
  let insertQuery = `delete from test where id=${req.params.id}`;
  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Deletion was successful");
    } else {
      console.log("Data delete successful !");
    }
  });
  console.log(insertQuery);
};

module.exports = {
  createUser,
  userList,
  userListById,
  updateUser,
  deleteUser,
};
