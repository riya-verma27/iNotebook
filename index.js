require('dotenv').config();
const connectToMongo= require('./db');
var cors= require('cors');
connectToMongo();
const express = require('express')
const app = express()
const port = 3001

app.use(cors());
app.use(express.json());
app.use(express.json())
//Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/user', require('./routes/user'));
app.listen(port, () => {
  console.log(`iNotebook app listening on port http://localhost:${port}`)
})
