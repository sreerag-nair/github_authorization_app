const express = require('express');
const app = express();
const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy
const body_parser = require('body-parser')
const LocalStrategy = require('passport-local').Strategy


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    next();
});

app.use(passport.initialize())
app.use(body_parser.json())
app.set('trust proxy', true)


passport.use(new LocalStrategy({
    session: false
}
    , function (username, password, done) {
        if (username === "sree" && password === "123") {
            done(null, { username: username, password: password })
        }
        else {
            done({ error: "ERROR... USERNAME PASSWORD NOT VALID" })
        }
    }))



passport.use('github', new GitHubStrategy({
    clientID: '3fb8c782622ac4a1d0a6',
    clientSecret: 'fe62abf8e17b91d71e2c94c367af00e6ba7ba8e6',
    callbackURL: 'http://localhost:3000/dashboard',
    scope: 'user:email',         //the dealbreaker!!!
},
    function (accessToken, refreshToken, profile, done) {

        console.log("accessToken : ", accessToken);
        // console.log("refreshToken : ", refreshToken);
        // console.log("profile : ", profile);
        // console.log("done : ", done);

        done(null, profile)
    }))


app.get('/fire', passport.authenticate('github'),


    // ,function (req, res, next) {

    //     passport.authenticate('gh', function (req, res, next) {

    // console.log('IN FIRE......')

    //         console.log('req error : ', req.error)
    //         console.log('req user : ', req.user)
    //         console.log('req info : ', req.authInfo)
    //     })(req, res, next);


    // }
)


app.post('/localstrategy', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {

        console.log("err : ", err)
        console.log("user : ", user)
        console.log("info : ", info)

        console.log("remote address : ", res.connection.localAddress)
        console.log("remote address : ", res.connection.remoteAddress)  //the required thing


    })(req, res, next)
})

app.get('/cb',
    function (req, res, next) {
        passport.authenticate('github', function (req, res, next) {

            console.log('HJGFNNYGBF')

            //returns undefined.....
            console.log('req : ', req)
            // console.log('req user : ', req.user)
            // console.log('req info : ', req.authInfo)

            // console.log("remote address : ", req.connection.localAddress)
            // console.log("remote address : ", req.connection.remoteAddress)


        })(req, res, next);

        res.end();
    })

app.listen(8001, function () {
    console.log("SERVER RUNNING IN PORT 8001")
})

