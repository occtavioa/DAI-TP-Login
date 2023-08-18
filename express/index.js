import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import sqlConfig from './dbconfig.js'
import sql from "mssql"

const app = express()
const port = 5000

app.use(cors())
app.use(bodyParser.json())

const connection = sql.connect(sqlConfig)
  .then(pool => pool)
  .catch(error => {console.log(error);})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/login", (req, res) => {
  let {name, password} = req.body;

  if(name === "nombre" && password === "contraseña") {
      res.send("bien")
  } else {
      res.send("mal")
  }
})

app.post("/registro", (req, res) => {
  let usuario = req.body;

  if(usuario.nombre === "" || usuario.contraseña === "") {
      res.send("usuario invalido")
  } else {
    res.send("usuario añadido")
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
