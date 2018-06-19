const express = require('express');
const app = express();
const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy
const body_parser = require('body-parser')
const LocalStrategy = require('passport-local').Strategy
const axios = require('axios')

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
    callbackURL: 'http://localhost:3000/redirect',
    passReqToCallback: true,
    scope: 'user:email',         //the dealbreaker!!!
},
    function (req, accessToken, refreshToken, profile, done) {

        console.log("accessToken : ", accessToken);
        // console.log("refreshToken : ", refreshToken);
        // console.log("passport-req : ", req.connection.localPort);
        //GET THE PRIMARY EMAIL.....
        console.log("profile : ", profile.emails[0].value);


        if(profile.emails[0].value === 'fefadoy@loketa.com'){
            console.log("Same")
            done(null, profile)
        }
        else{
            console.log("different")
            done({err : "INVALID USER"})
        }

        // console.log("done : ", done.toString());
    }))

    //THIS METHOD WORKS!
/* app.get('/authenticate',
    passport.authenticate('github', {
        failureRedirect: '/',
        session: false
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        console.log("HELLO THERE");

        res.status(200).send({message : "Welcome back..."})
    }); */


    //this method works too.....
app.get('/authenticate', function(req, res, next){

    passport.authenticate('github', {
        session: false
    }, function (err, user, info) {
    
        console.log('HJGFNNYGBF')
        // res.send({ message: "Hello there" })
        //returns undefined.....
        console.log('req : ', err)
        console.log('res : ', user)
        console.log('info : ', info)
        // console.log('req user : ', req.user)
        // console.log('req info : ', req.authInfo)
    
        // console.log("remote address : ", req.connection.localPort)
        // console.log("remote address : ", req.connection.remotePort)
        // res.redirect("http://localhost:3000/dashboard")
    
        res.send({ message: "success" });
    
        })(req, res, next);
    
        // res.end();

})


app.get('/fire', function (req, res, next) {
    // passport.authenticate('github', function(x,y){


    console.log('IN FIRE......')

    // console.log('req error : ', res)
    console.log('req user : ', req.user)
    console.log('req info : ', req.authInfo)


    res.send({ file: 'hello there.....' })
    // })(req, res, next);

}
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




app.listen(8005, function () {
    console.log("SERVER RUNNING IN PORT 8005")
})

