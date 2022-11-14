const http = require('http');
const todos = [
    {id:1, text: 'to do one'},
    {id:2, text: 'to do two'},
    {id:3, text: 'to do three'}

]
const server = http.createServer((req,res) => {

    const {headers, url, method} = req;
    console.log(headers, url, method);
    res.statusCode = 404;
    //res.setHeader('Content-Type','text/html');
    res.writeHead(404,{ 
        'Content-Type': 'application/json'
    }); //do this for clean look
    res.write('welcome to owaisz serverr');
    res.write("<h1>welcome to the server of owais</h1>");
    res.write("<h2>hi client</h2>");
    let body = [];
    req.on('data',(chunk) => {
        body.push(chunk);
    }).on('end',() => {
        body = Buffer.concat(body).toString();
        console.log(body);
    })
    res.end(JSON.stringify({
        success: true,
        data: todos
    })

    );
})
const PORT = 5000;
server.listen(PORT,()=>console.log(`server running on port ${PORT}`));