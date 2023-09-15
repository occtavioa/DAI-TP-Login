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
  let { username, password } = req.body;
  if(!username || !password || username === "" || password === "") {
    res.status(400).send()
  } else {
    try {
      let result = await dbservice.selectUserId(username, password, connection)
      if(result.rowsAffected[0] === 0) {
        res.status(404).send()
      } else {
        res.status(200).send(result.recordset[0])
      }
    } catch (error) {
      console.error(error);
      res.status(500).send()
    }
  }
})

app.post("/register", async (req, res) => {
  let { username, password } = req.body;
  if(!username || !password || username === "" || password === "") {
    res.status(400).send()
  } else {
    try {
      if((await dbservice.selectUserId(username, password, connection)).rowsAffected[0] !== 0) {
        res.status(400).send()
      } else {
        await dbservice.insertUser(username, password, connection)
        res.status(204).send()
      }
    } catch (error) {
      console.error(error);
      res.status(500).send()
    }
  }
})

app.get("/users/:id", async(req, res) => {
  let {id} = req.params
  id = parseInt(id)
  if(!Number.isInteger(id)) {
    res.status(400).send()
  }
  try {
    let result = await dbservice.selectUserById(id)
    if(result.rowsAffected[0] === 0) {
      res.status(404).send()
    } else {
      res.status(200).send(result.recordset[0])
    }
  } catch (error) {
    console.error(error);
    res.status(500).send()
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
