const books = [{
  ISBN:"12345Book",
  title: "Getting Started",
  pubDate: "2021-11-25",
  language: "en",
  numPage: 250,
  author:[1,2],
  publucations:[1],
  category:["tech","programming","education"]
}];

const author =[{
  id: 1,
  name: "Aradhana",
  books:["12345Book","Mybook"]
},
  {
    id:2,
    name: "Elon Musk",
    books:["12345Book"]
  }
];

const publication =[
  {
    id:1,
    name: "Writex",
    books:["12345Book"]
  },
  {
    id:2,
    name: "Writen",
    books:["Mybook"]
  }
];
module.exports = {books,author,publication};