// server.js
// where your node app starts

// init project
const express = require('express')
const app = express()

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

// http://expressjs.com/en/starter/basic-routing.html
app.get("/test", (request, response) => {
  response.sendFile(__dirname + '/views/test.html')
})

// Simple in-memory store
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
]

// const rekkids = function() {
//   let newData = []
//   var api_call = "https://api.discogs.com/users/phebus/collection/folders/0/releases?callback=&sort=artist&sort_order=asc&per_page=500"
//   jQuery.getJSON(api_call, function(data) {
//     var pages = data.pagination.pages

//     for (var i = 2; i < pages + 1; i++) {
//       jQuery.getJSON(api_call + `&page=${i}`, function(more) {
//         newData = data.releases.concat(more.releases)
//             console.log(newData)

//       });
//     }
//   });
//   return ;
// }

// app.get("/rekkids", (request, response) => {
//   response.send(rekkids)
// })

app.get("/dreams", (request, response) => {
  response.send(dreams)
})

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", (request, response) => {
  dreams.push(request.query.dream)
  response.sendStatus(200)
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
