const express = require ("express");
const mongoose = require("mongoose");
//Database
const database = require("./database");
var bodyParser = require("body-parser");
// Initialize express
const booky = express();
booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());

//Establish Database connection
mongoose.connect(
"mongodb+srv://Muthukrishnan:Muthukrishnan@shapeai.5sse4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
).then(()=> console.log("connection is established!!!"));

//Get All Books
/*
Route       /
Description Get All Books
Access      Public
Parameter   NONE
Methods     Get
*/
booky.get("/",(req,res)=>{
  return res.json({books: database.books});
});
//Get Specific Books
/*
Route       /
Description Get Specific Books
Access      Public
Parameter   isbn
Methods     Get
*/
booky.get("/is/:isbn",(req,res)=>{
  const getSpecificBook = database.books.filter(
    (book)=> book.ISBN === req.params.isbn
    );
    if(getSpecificBook.length===0){
  return res.json( {
    error:`No Book found for ISBN of ${req.params.isbn}`
  });
}
return res.json({book: getSpecificBook});
});
//Get Books on specific category
/*
Route       /
Description Get Books on Specific category
Access      Public
Parameter   category
Methods     Get
*/
booky.get("/c/:category", (req,res)=>{
  const getSpecificBook = database.books.filter(
    (book)=> book.category.includes(req.params.category)
    );
    if(getSpecificBook.length===0){
  return res.json( {
    error:`No Book found for category of ${req.params.category}`
  });
}
return res.json({book: getSpecificBook});
})
//Get Books on specific language
/*
Route       /
Description Get Books on Specific language
Access      Public
Parameter   language
Methods     Get
*/
booky.get("/ca/:language",(req,res)=>{
  const getSpecificBook = database.books.filter(
    (book)=> book.language === req.params.language
    );
    if(getSpecificBook.length===0){
  return res.json( {
    error:`No Book found for language of ${req.params.language}`
  });
}
return res.json({book: getSpecificBook});
});
//Get All Authors
/*
Route       /
Description Get all Authors
Access      Public
Parameter   NONE
Methods     Get
*/
booky.get("/authors",(req,res)=>{
  return res.json({author: database.author});
});
//Get  Authors based on books
/*
Route       /
Description Get Authors based on books
Access      Public
Parameter   books
Methods     Get
*/
booky.get("/authors/book/:isbn",(req,res)=>{
  const getSpecificAuthor = database.author.filter (
    (author)=>author.books.includes(req.params.isbn)
  );
  if(getSpecificAuthor.length===0){
    return res.json({
    error:`No auhors found for the ISBN ${req.params.isbn}`
  });
}
return res.json({auhtors:getSpecificAuthor});
});
//Get List of Authors based on books
/*
Route       /
Description Get List of Authors based on books
Access      Public
Parameter   books
Methods     Get
*/
booky.get("/authors/:isbn",(req,res)=>{
  const getAllAuthors = database.author.filter(
    (author)=> author.books.includes (req.params.isbn)
    );
    if(getAllAuthors.length===0){
  return res.json( {
    error:`No Author found for book of ${req.params.isbn}`
  });
}
return res.json({book: getAllAuthors});
});
//Get All Publications
/*
Route       /publications
Description Get all publications
Access      Public
Parameter   NONE
Methods     Get
*/
booky.get("/publications",(req,res)=>{
  return res.json({publications: database.publication});
});
//Get  Publications based on books
/*
Route       /
Description Get publications based on books
Access      Public
Parameter   books
Methods     Get
*/
booky.get("/publications/:isbn",(req,res)=>{
  const getSpecificPublication = database.publication.filter(
    (publication) => publication.books.includes(req.params.isbn)
  );
  if(getSpecificPublication.length===0){
    return res.json({
      error:`No Publications found on the isbn ${req.params.isbn}`
    });
  }
  return res.json({publications:database.publication})
});
//Add New Books
/*
Route       /book/new
Description Add new book
Access      Public
Parameter   NONE
Methods     POST
*/
booky.post("/book/new",(req,res) =>{
  const newBook = req.body;
  database.books.push(newBook)
  return res.json({updatedBooks: database.books});
});
//Add New Author
/*
Route       /author/new
Description Add new author
Access      Public
Parameter   NONE
Methods     POST
*/
booky.post("/author/new",(req,res) =>{
  const newAuthor = req.body;
  database.author.push(newAuthor)
  return res.json({updatedAuthor: database.author});
});
//Add New Publication
/*
Route       /publications/new
Description Add new publication
Access      Public
Parameter   NONE
Methods     POST
*/
booky.post("/publication/new",(req,res) =>{
  const newPublication = req.body;
  database.publication.push(newPublication)
  return res.json({updatedPublication: database.publication});
});
//UPDATE Pub and date
/*
Route       /publication/update/book
Description Update the pub and the date
Access      Public
Parameter   NONE
Methods     PUT
*/
booky.put("/publication/update/book/:isbn", (req,res)=>{
  //UPDATE THE PUB DB
  database.publication.forEach((pub) => {
    if(pub.id === req.body.pubId){
      return pub.books.push(req.params.isbn);
    }
    //UPDATE THE BOOK DB
    database.books.forEach((book)=>{
      if(book.ISBN == req.params.isbn){
        book.publucations = req.body.pubId;
        return;
      }
    });
    return res.json({
      books: database.books,
      publications: database.publication,
      message: "Successfully Updated"
    })
  })
})
//DELETE A BOOK
/*
Route       /book/delete
Description Update the pub and the date
Access      Public
Parameter   isbn
Methods     DELETE
*/
booky.delete("/book/delete/:isbn", (req,res)=>{
  const updateBookDatabase = database.books.filter(

    (book )=> book.ISBN !== req.params.isbn
      )
      database.books= updateBookDatabase;
      return res.json({books: database.books});
  
});
//DELETE AN AUTHOR FROM A BOOK AND VICE VERSA
/*
Route       /book/delete/author
Description delete an author from book
Access      Public
Parameter   isbn, authorId
Methods     DELETE
*/

booky.delete("/book/delete/author/:isbn/:authorId", (req,res)=>{
  //UPDATE THE BOOK DB
  database.books.forEach((book)=>{
    if(book.ISBN===req.params.isbn)
{
  const newAuthorList = book.author.filter(
    (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
  );
  book.author=newAuthorList;
  return;
}
  });
// UPDATE AUTHOR DB
database.author.forEach((eachAuthor)=>{
  if(eachAuthor.authorId === parseInt(req.params.authorId)){
    const newBookList = eachAuthor.books.filter(
      (book) => book !== req.params.isbn
    );
    eachAuthor.books=newBookList;
    return;
  }
});
return res.json({
  book: database.books,
  author: database.author,
  message: "Author and Book were deleted"

});
});
booky.listen(3000,() => console.log("Server is up and running"));
