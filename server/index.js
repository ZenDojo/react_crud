const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'cruddatebase'
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM movie_reviews"
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })
})

app.post('/api/insert', (req, res) => {
    console.log(123);
    const movieName = req.body.movieName
    const movieReview = req.body.movieReview
    const sqlInsert = 'INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)'
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(result);
    })
})

app.delete('/api/delete/:id', (req, res) => {
    const name = req.params.id
    const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?"
    db.query(sqlDelete, [name], (err, result) => {
        if (err) console.log(err);
    })
})

app.put('/api/update', (req, res) => {
    const name = req.body.movieName
    const review = req.body.movieReview
    const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?"
    db.query(sqlUpdate, [review, name], (err, result) => {
        if (err) console.log(err);
    })
})

app.listen(3001, () => {
    console.log('run on port 3001');
})