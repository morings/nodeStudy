const express = require('express')
const app = express()
const port = 3000

app.get('/', function (req, res) {
  throw new Error('BROKEN') // Express will catch this on its own.
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))