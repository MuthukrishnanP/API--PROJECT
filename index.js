const express = require ("express");

const database = require("./database");
// Initialize express
const booky = express();
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
booky.listen(3000,() => console.log("Server is up and running"));
