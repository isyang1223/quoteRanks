// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.json());
// Require path
var path = require('path');

app.use(express.static(path.join(__dirname, './authorsApp/dist')));


var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/authors');
mongoose.Promise = global.Promise;


var AuthorSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name needs to be at least 3 characters"], minlength: [3, "Name needs to be at least 3 characters"] },
    quotes: [{ 
        quote:{ type: String, required: [true, "Quote needs to be at least 3 characters"], minlength: [3, "Quote needs to be at least 3 characters"] },
        vote: { type: Number, default: 0 }
        }]
    },
    { timestamps: true });



mongoose.model('Author', AuthorSchema); // We are setting this Schema in our Models as 'User'
var Author = mongoose.model('Author') // We are retrieving this Schema from our Models, named 'User'





app.get('/authors', function (req, res) {
    Author.find({}, function (err, authors) {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({ message: "Error", error: err })
        }
        else {
            // respond with JSON
            res.json({ message: "Success", data: authors })
        }
    })
})


app.post('/author', function (req, res) {
    console.log("POST DATA" );
    var author = new Author();
    author.name = req.body.name;
    author.quotes = [];
    
    author.save(function (err) {
        // if there is an error console.log that something went wrong!
        if (err) {
            console.log("12425t3tsagfasd", author.errors);
            // respond with JSON

            res.json({ message: "Error", error: author.errors })

        }

        else { // else console.log that we did well and then redirect to the root route
            console.log('successfully added a author!');
            res.json({ message: "Success", data: author })
        }
    })
})

app.delete('/authors/remove/:id', function (req, res) {
    console.log("POST DATA", req.params.id);
    Author.remove({ _id: req.params.id }, function (err) {


        // if there is an error console.log that something went wrong!
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({ message: "Error", error: err })

        }
        else { // else console.log that we did well and then redirect to the root route

            console.log('successfully removed a author!');
            res.json({ message: "Success" })
        }
    })
})

app.get('/authors/:id', function (req, res) {
    console.log("POST DATA", req.params.id);
    Author.findOne({ _id: req.params.id }, function (err, author) {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({ message: "Error", error: err })
        }
        else {
            
        
            // respond with JSON
            console.log('successfully grab a author!');
            res.json({ message: "Success", data: author })
     

        }
    })
})

app.put('/author/edit/:id', function (req, res) {

    Author.findOne({ _id: req.params.id }, function (err, author) {
        if (author) {
            author.name = req.body.name;
  

            author.save(function (err) {

                if (err) {
                    console.log("Returned error", err);

                    // respond with JSON
                    res.json({ message: "Error", error: author.errors })
                }
                else {
                    // respond with JSON
                    console.log("SAVVVVEEEEEEEED");
                    res.json({ message: "Success", data: author })
                }
            })
        }
    })

})

app.put('/author/quote/:id', function (req, res) {

    Author.findOne({ _id: req.params.id }, function (err, author) {
       
            author.quotes.push({quote: req.body.quote});
            console.log("!!!!!!"+ author)
            author.save(function (err) {

                if (err) {
                    console.log("Returned error", err);

                    // respond with JSON
                    res.json({ message: "Error", error: author.errors })
                }
                else {
                    // respond with JSON
                    console.log("SAVVVVEEEEEEEED");
                    res.json({ message: "Success", data: author })
                }
            })
    })

})

app.put('/quotes/remove/:id', function (req, res) {
    console.log("POST DATA", req.params.id);
    Author.findOne({ _id: req.params.id }, function (err, author) {
        console.log(req.body)
        for(let i = 0; i < author.quotes.length; i++){
       if (req.body._id == author.quotes[i]._id){
           author.quotes.splice(i, 1)

            }
        }
        author.save(function (err) {

            if (err) {
                console.log("Returned error", err);

                // respond with JSON
                res.json({ message: "Error", error: author.errors })
            }
            else {
                // respond with JSON
                console.log("REMOVED QUOTES");
                res.json({ message: "Success", data: author })
            }
        })
 
    })
})

app.put('/quotes/up/:qid', function (req, res) {
    console.log("POST DATA", req.params.qid);
    console.log("POST DATA", req.body._id);
    Author.findOne({ _id: req.body._id }, function (err, author) {
        for (let i = 0; i < author.quotes.length; i++) {
            if (req.params.qid == author.quotes[i]._id) {
                author.quotes[i].vote += 1
            }
        }
        author.save(function (err) {

            if (err) {
                console.log("Returned error", err);

                // respond with JSON
                res.json({ message: "Error", error: author.errors })
            }
            else {
                // respond with JSON
                console.log("voted UP!!!");
                res.json({ message: "Success", data: author })
            }
        })
        
        
    

    })

    
})


app.put('/quotes/down/:qid', function (req, res) {
    console.log("POST DATA", req.params.qid);
    console.log("POST DATA", req.body._id);
    Author.findOne({ _id: req.body._id }, function (err, author) {
        for (let i = 0; i < author.quotes.length; i++) {
            if (req.params.qid == author.quotes[i]._id) {
                author.quotes[i].vote -= 1
            }
        }
        author.save(function (err) {

            if (err) {
                console.log("Returned error", err);

                // respond with JSON
                res.json({ message: "Error", error: author.errors })
            }
            else {
                // respond with JSON
                console.log("voted DOwn!!!");
                res.json({ message: "Success", data: author })
            }
        })




    })


})



app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./authorsApp/dist/index.html"))
});
// Setting our Server to Listen on Port: 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
})