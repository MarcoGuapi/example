var express = require("express");
var checkout = require('./checkout');
var app = express()
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/checkout', checkout);


app.listen(3000,function(){
    console.log("server runing");
})

