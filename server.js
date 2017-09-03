const express = require('express');
const app = express();
app.use(express.static("public"));
const formidable = require('express-formidable');
app.use(formidable());
const fs = require('fs');
app.get('/', function(req, res) {
    res.send('index.html')
})
app.post('/create-post', function(req, res) {
    console.log(req.fields)
    const fileDir = __dirname + '/data/posts.json';
    var postContent = fs.readFileSync(fileDir)
    var posts = JSON.parse(postContent);
    const myDate = Date.now();
    var newPost = req.fields.blogpost;
    posts[myDate] = newPost;
    console.log(posts);
    var sendPost = JSON.stringify(posts);
    fs.writeFile(fileDir, sendPost, function(err) {
        if (err) throw err;
    })
})
app.get('/post', function(req, res) {
    const fileDir = __dirname + '/data/posts.json';
    var postContent = fs.readFileSync(fileDir)
    var posts = JSON.parse(postContent);
    console.log(posts);
    res.send(posts);

})

app.listen(3000);