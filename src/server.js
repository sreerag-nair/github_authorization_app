import express from 'express';
const app = express();
const passport = require('passport')
const gitStrategy = require('passport-github').Strategy




app.get('/fire', function(req, res, next){

})

app.listen(8001, function(){
    console.log("SERVER RUNNING IN PORT 8001")
})