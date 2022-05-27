var express = require('express');
var cors = require('cors');
require('dotenv').config()
let bodyParser = require('body-parser')

var app = express();

//Set up multer
const multer = require("multer");
const upload = multer({ dest: "public/files" });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single("upfile"), (req,res) =>{
  console.log(req.file);
  if (req.file)
  {
    res.json({ name: req.file.originalname, type: req.file.mimetype, size: req.file.size});
  }
  else
  {
    res.json({ error: "File not found!"})
  }
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
