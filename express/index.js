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
  if (!username || !password || username.trim() === "" || password.trim() === "") {
    res.sendStatus(400)
  } else {
    try {
      let result = await dbservice.selectUserByCredentials(username, password, connection)
      if (result.recordset.length === 0) {
        res.sendStatus(404)
      } else {
        res.status(200).json({ Id: result.recordset[0].Id })
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500)
    }
  }
})

app.post("/register", async (req, res) => {
  let { username, password } = req.body;
  if (!username || !password || username.trim() === "" || password.trim() === "") {
    res.sendStatus(400)
  } else {
    try {
      if ((await dbservice.selectUserByUsername(username, connection)).recordset.length !== 0) {
        res.sendStatus(400)
      } else {
        await dbservice.insertUser(username, password, connection)
        res.sendStatus(204)
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500)
    }
  }
})

app.get("/users/:id", async (req, res) => {
  let { id } = req.params
  id = parseInt(id)
  if (!Number.isInteger(id)) {
    res.sendStatus(400)
  } else {
    try {
      let result = await dbservice.selectUserById(id)
      if (result.recordset.length === 0) {
        res.sendStatus(404)
      } else {
        res.status(200).json(result.recordset[0])
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500)
    }
  }
})

app.put("/users/:id", async (req, res) => {
  let { id } = req.params
  id = parseInt(id)
  let user = req.body
  if (!Number.isInteger(id) || !user.username || !user.password || user.username.trim() === "" || user.password.trim() === "") {
    res.sendStatus(400)
  } else {
    try {
      let checkedUser = await dbservice.selectUserByUsername(user.username, connection)
      if (checkedUser.recordset.length !== 0 && checkedUser.recordset[0].Id !== id) {
        res.sendStatus(400)
      } else if ((await dbservice.updateUser(id, user, connection)).rowsAffected[0] === 0) {
        res.sendStatus(400)
      } else {
        res.sendStatus(200)
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500)
    }
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
