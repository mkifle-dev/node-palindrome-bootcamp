const http = require('http');  //import a module, some other code not in this file/codebase 
const fs = require('fs') //files 
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet') //package we installed with node. 

const server = http.createServer(function(req, res) { // creating a server. we are accessing http module here; createserver=method we are using in this instance. 
  const page = url.parse(req.url).pathname; //path name thats' being used (inpoint being hit from front end)
  const params = querystring.parse(url.parse(req.url).query);
  // creating an object called params that will hold all of our query parameters 
  //example: queryparameter is ?student=value
  // excample of params object {student: value}

  console.log(page); // object of all the parameter of all the urls
  if (page == '/') { // just the url ex: "facebook.com/"
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  } // 
  else if (page == '/api') {  // slash api gives data to send back, not sending to api. 
    let lowParam = params['student'].toLowerCase()
    let checker = lowParam.split('').reverse().join('') //rev
    let determinePalidrome =  lowParam == checker ? 'Yes' : 'No'
    if('student' in params){  //storing relv info into obj
      // we are looking for students in the params object 
        if(params['student'] ){ //? student (front) 
      
          res.writeHead(200, {'Content-Type': 'application/json'});
          const objToJson = {
            isPalindrome: determinePalidrome,
          }
          res.end(JSON.stringify(objToJson));
        }//student = leon noel
  
      }//student if
  }//else if
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
}else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);


// const http = require('http');
// const fs = require('fs')
// const url = require('url');
// const querystring = require('querystring');
// const figlet = require('figlet')

// const server = http.createServer(function(req, res) {
//   const page = url.parse(req.url).pathname;
//   const params = querystring.parse(url.parse(req.url).query);
//   console.log(page);
//   if (page == '/') {
//     fs.readFile('index.html', function(err, data) {
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.write(data);
//       res.end();
//     });
//   }
//   else if (page == '/api') {
// 	let lowParam = params['student'].toLowerCase()   //dem
// 	let checker = lowPram.split('').reverse().join('') //dem
// 	let isItPalidrom = lowParam == checker ? 'Yes' : 'No' //dem
//     if('student' in params){
//       if(params['student'] == ''){
//         res.writeHead(200, {'Content-Type': 'application/json'});
//         const objToJson = {
// 			isPalindrome: isItpalidrome,  //dem
// 		  input: params['student'], 
//           status: "Boss Man",
//           currentOccupation: "Baller"
//         }
//         res.end(JSON.stringify(objToJson));
//       }//student != leon
//     }//student if
//   }//else if
//   else if (page == '/css/style.css'){
//     fs.readFile('css/style.css', function(err, data) {
//       res.write(data);
//       res.end();
//     });
//   }else if (page == '/js/main.js'){
//     fs.readFile('js/main.js', function(err, data) {
//       res.writeHead(200, {'Content-Type': 'text/javascript'});
//       res.write(data);
//       res.end();
//     });
//   }else{
//     figlet('404!!', function(err, data) {
//       if (err) {
//           console.log('Something went wrong...');
//           console.dir(err);
//           return;
//       }
//       res.write(data);
//       res.end();
//     });
//   }
// });

// server.listen(8000);


// //