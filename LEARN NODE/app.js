const express = require('express');
const articles = require('./Dependencies/news');
require('dotenv').config();
const app = express();

app.get('/',(req,res)=>{
  const data = articles;
  res.json(data).status(200);
})
app.get('/api/articles/:newsAuthor',(req,res)=>{
  const newsAuthor =  req.params.newsAuthor;
  const data = articles.filter(article=>article.author==newsAuthor)
  res.json(data).status(200);
})
app.get('/articles',(req,res)=>{
  const newsAuthor =  req.params.newsAuthor;
  const data = articles
  const dataHtml = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Custom HTML Page</title>
    <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f0f0f0;
      text-align: center;
    }

    h1 {
      color: #333;
    }
  </style>
  </head>
  <body>
  ${data.map(article => `<h1>${article.title}</h1><a href="${article.url}">Read full news</a>`).join('')}
  </body>
  </html>
  `
  res.send(dataHtml).status(200);
})

const port = process.env.PORT

app.listen(port,()=>{
  console.log(`The server is listening on port ${port}`);
})

