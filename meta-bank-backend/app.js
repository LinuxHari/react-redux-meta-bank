const express = require('express')

const app = express()

const CORS = require('cors')

const session = require('express-session')

const cookieParser = require('cookie-parser')

require('./model/dbConnect').connect()

const authRoute = require('./routes/authRoute')

app.use(express.json())

app.use(express.urlencoded())

app.use(cookieParser())

app.use(session({
    secret:'xhhckgiiuhuhylufutxdfybirvvbu',
    saveUninitialized:true,
    resave:true
}))

app.use(CORS({origin: 'http://localhost:3000',
credentials: true}))

app.use(authRoute)

app.listen(8000,()=>{
    console.log("Server is listening...",8000);
})