import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import sqlConfig from './dbconfig.js'
import sql from "mssql"
import dbservice from './dbservice.js'

const app = express()
const port = 5000

app.use(cors())
app.use(bodyParser.json())

const connection = await sql.connect(sqlConfig)
  .then(pool => pool)
  .catch(error => { console.log(error); })

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/login", async (req, res) => {
  let { name, password } = req.body;
  console.log(name, password);
  try {
    let result = await dbservice.login(name, password, connection)
    if(result.recordset.length !== 0) {
      res.status(200).send("usuario logueado")
    } else {
      res.status(200).send("usuario invalido")
    }
  } catch (error) {
    res.status(400).send("error")
  }
})

app.post("/register", async (req, res) => {
  let { name, password } = req.body;
  console.log(name, password);
  try {
    let result = await dbservice.register(name, password, connection)
    console.log("usuario añadido", result);
    res.status(201).send("usuario añadido")
  } catch (error) {
    console.log("usuario invalido", error);
    res.status(400).send("usuario invalido")
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
