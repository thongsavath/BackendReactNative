const express = require('express')
const app = express()
const port = 3000
const bodyparser = require('body-parser')
const mysql = require('mysql')

const con = mysql.createConnection({
    host: '159.89.206.43',
    user: 'jack',
    password: '123456',
    database: 'wannabedev'
})
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))

con.connect()

// app.get('/getData', (req, res) => {
//     res.send('Hello')//
// })

app.get('/getData', (req, res) => {

    const qeury = "select * from user"
    const params = []

    con.query(qeury, params, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})


app.post('/login', (req, res) => {
    // res.send(req.body)

    const { email, passwords } = req.body

    const qeury = "select user_id from user where email=? and passwords=?"
    const params = [email, passwords]

    con.query(qeury, params, (err, result) => {
        if (err) throw err


        if (result.length>0)
        {
            res.send('Login Success !!')
        }
        else
        {
            res.send('Login fail !!')
        }
      
    })
})

app.post('/register', (req, res) => {

    const { email, passwords, username } = req.body

    const qeury = "INSERT INTO USER(email,passwords,username) values(?,?,?)"
    const params = [email, passwords, username]

    con.query(qeury, params, (err, result) => {
        if (err) throw err
        res.send('Register Success !!')
    })
    // res.send(username)
})



app.put('/updateUser', (req, res) => {
    res.send('Update success !!')
})

app.put('/UserUpdate', (req, res) => {
    const { email, passwords, username,user_id} = req.body

    const qeury = "UPDATE User set email=?,passwords=?,username=? where user_id=?"
    const params = [email, passwords, username,user_id]

    con.query(qeury, params, (err, result) => {
        if (err) throw err
        res.send('Update Success !!')
    })
})


app.delete('/deleteUser', (req, res) => {
    res.send('Deleted success !!')
})


app.delete('/DelUser', (req, res) => {
    const {user_id} = req.body

    const qeury = "Delete from User where user_id=?"
    const params = [user_id]

    con.query(qeury, params, (err, result) => {
        if (err) throw err
        res.send('Delete Success !!')
    })
})



app.listen(port)