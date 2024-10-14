var express = require('express');
var router = express.Router();
//3. cau lenh ket noi + npm install mongoose
var mongoose = require('mongoose');

//2. ket noi mongodb
const mongoURL = 'mongodb+srv://longdh204:CIhS0hcSB3dC5VV8@cluster0.a6ezw.mongodb.net/libary';

//4.cau lenh ket noi
mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
  console.log("MongoDB Connected!");
});

//5. sau khi ket noi thanh cong thi co the viet lenh truy van
//5.1 dinh nghia schema : khung - cau truc cua collection
const bookSchema = new mongoose.Schema({
  title : String,
  author : String,
  genre : String,
  year : String,
  imageUrl : String,
})
//5.2 thay moi chi dinh nghia 1 vai cai con lai tu dinh nghia
const Book = mongoose.model('Books', bookSchema);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Do Long' });
});
//1. khi /listBooks thi no se hien ra thong tin ben duoi
router.get('/listBooks', function(req, res, next) {
  //6. lay danh sach (hien thi)
  Book.find({}).then((books)=>{
    res.send(books);
  })
});

//7. them danh sach
router.post('/addBook', function(req, res, next) {
  var data ={
    errorCode : 200,
    message : "Success",
  };
  const title = req.body.title;
  const author = req.body.author;
  const genre = req.body.genre;
  const year = req.body.year;
  const imageUrl = req.body.imageUrl;
  const newBook = new Book({
    title:title,
    author:author,
    genre:genre,
    year:year,
    imageUrl:imageUrl
  })
  newBook.save().then(()=>{
    res.send(data);
  });
});

//8. xoa danh sach
router.get('/deleteBook/{id}', function(req, res) {
  var data ={
    errorCode : 200,
    message : "Success",
  };
  const id = req.path.id;
  Book.deleteOne({_id: id}).then(()=>{
    res.send(data)
  }).catch((err)=>{
    data.message = err.message;
    res.send(data);
  });
});

//9.Sua
router.post('/updateBook', function(req, res) {
  var data ={
    errorCode : 200,
    message : "Success",
  }
  const title = req.body.title;
  const author = req.body.author;
  const genre = req.body.genre;
  const year = req.body.year;
  const imageUrl = req.body.imageUrl;

  Book.updateOne({_id: id},{
    title:title,
    author:author,
    genre:genre,
    year:year,
    imageUrl:imageUrl
  }).then(()=>{
    res.send(data);
  }).catch((err)=>{
    data.message = err.message;
    res.send(data);
  });
});

module.exports = router;
