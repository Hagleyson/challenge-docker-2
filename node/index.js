const express = require("express");
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const app = express();
const port = 3000;

const mysql = require("mysql");
const connection = mysql.createConnection(config);

connection.query(
  "CREATE TABLE IF NOT EXISTS people ( id INTEGER PRIMARY KEY AUTO_INCREMENT, name TEXT)"
);
connection.query(`INSERT INTO people(name) values('Hagleyson')`);
connection.end();

app.get("/", async (req, res) => {
  const result = await selectPeople();
  res.send(result);
});

app.listen(port, () => {
  console.log(`rodando na porta ${port}`);
});

async function selectPeople() {
  const connection = mysql.createConnection(config);
  const result = new Promise((resolve) => {
    connection.query("SELECT * FROM people", (err, results, field) => {
      const body = [`<h1>Full Cycle Rocks!</h1>`];
      if (err) {
        body.push("<h2> Ocorreu um erro ao acessar o banco de dados </h2>");
      } else {
        const formattedValues = results.map((currentResult) => {
          return `<h2>${currentResult.name}</h2>`;
        });
        body.push(formattedValues.join(""));
      }

      connection.end();
      resolve(body.join(""));
    });
  });
  return result;
}
