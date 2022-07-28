const express = require('express');
const mongoose = require('mongoose');
const task = require('./Tasks');
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(express.urlencoded({extended:true}));


const DBUri = 'mongodb+srv://aashish:aashish@cluster0.8bpt1.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DBUri)
.then((result)=>console.log("Connection made successfully"))
.catch((err)=>{
    console.log("Connection failed : " + err);
});

app.set('view engine', 'ejs');

app.listen(3000);

app.get('/', (req, res)=>{
    const task1 = task.find()

    
    .then((result)=>{
        
        res.render('index', {data : result});
    })
    
});

app.get('/addList', (req, res)=>{
    res.render('addList');
})

app.post('/delete', (req, res)=>{
    const val = req.body.id2;
    // console.log(val);
    // res.redirect('/');
    task.findByIdAndDelete(val)
    .then((result)=>{
        res.redirect('/');
    })
    .catch((err)=>{console.log(err);res.redirect('/');});
})

app.post('/save', (req, res)=>{
    const val = req.body.cnt;
    console.log(val);
    
    const tk = new task({
        body: val
    });
    tk.save()
    .then((result)=>{
        res.redirect('/');
    })
    .catch((err)=>console.log("Error!!!!: "+ err));

    res.redirect('/');
})

app.use((req, res)=>{
    res.send('<p>Bro khojeko page vetiyena ni</p>');
} )