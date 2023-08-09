const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/login", (req, res) => {
  let usuario = req.body;

  if(usuario.nombre === "nombre" && usuario.contraseña === "contraseña") {
      res.send("bien")
  } else {
      res.send("mal")
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
