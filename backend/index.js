const connectToMongo = require('./db');
connectToMongo();
const express = require('express')
var cors = require('cors')

const app = express()
const port = 5000


app.use(cors({
  origin: '*'
}));
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello rudy!s')
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})