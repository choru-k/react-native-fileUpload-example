var express = require('express')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var app = express()

app.post('/single', upload.single('photo'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.body)
  console.log(req.file)
  res.status(201).send('success')
})

app.post('/array', upload.array('photos', 12), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  console.log(req.body)
  console.log(req.files)
  res.status(201).send('success')
})

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
})
