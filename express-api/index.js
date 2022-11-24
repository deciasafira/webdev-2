const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()
const port = 3000

//import route posts
// const postsRouter = require('./routes/posts');
const journalRoute = require("./routes/journal");

mongoose
	.connect("mongodb://127.0.0.1/journal")
	.then(() => {
		console.log("Database Connected!");
	})
	.catch((err) => {
		console.log(`Cannot connect to database`, err);
		process.exit();
	});
//import library CORS
const cors = require('cors')

//use cors
app.use(cors())

// use morgan
app.use(morgan("dev"))

//import body parser
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// app.use('/api/posts', postsRouter); // use route posts di Express
app.use('/api/journal', journalRoute)

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`)
})