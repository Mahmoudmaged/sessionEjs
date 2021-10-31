const express = require('express')
const connectDB = require('./model/config')
const { userRouter } = require('./router/app')
const app = express()
const port = process.env.PORT || 3000
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
var flash = require('connect-flash');
app.use(express.urlencoded({ extended: false })) ///        ======= app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(flash());
var store = new MongoDBStore({
    uri: 'mongodb+srv://MahmoudElwan:01015776658@mahmoudelwan-nodejs.jfspq.mongodb.net/ejsSession',
    collection: 'mySessions'
});
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store
}))
app.use(userRouter)
connectDB()
app.listen(port, () => console.log(`Example app listening on port port!`))