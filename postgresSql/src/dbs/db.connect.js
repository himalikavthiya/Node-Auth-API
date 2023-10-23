const { Client } = require('pg');

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "1234",
    database: "MyDatabase"
})
try{
    console.log("Database connect succesfully !");
}
catch(err){
    console.log("Database connect error ",err);

}

module.exports = client 
