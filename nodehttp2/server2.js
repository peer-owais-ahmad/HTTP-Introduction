const http = require('http');
const todos = [
    {id:1, text: 'to do one'},
    {id:2, text: 'to do two'},
    {id:3, text: 'to do three'}

]
const server = http.createServer((req,res) => {

    const {url, method} = req;
    res.statusCode = 404;
    //res.setHeader('Content-Type','text/html');
    //do this for clean look
    res.write('welcome to owaisz serverr');
    res.write("<h1>welcome to the server of owais</h1>");
    res.write("<h2>hi client</h2>");
    let body = [];
    req.on('data',(chunk) => {
        body.push(chunk);
    }).on('end',() => {
        body = Buffer.concat(body).toString();
        let status = 404;
        let response = {
            success: false,
            data: null
        }
        if(method === 'GET' && url === '/todos')
        {
            status = 200;
            response.success = true;
            response.data = todos; 
        }
        else if(method === 'POST' && url === '/todos'){
            const { id, text} = JSON.parse(body);
            todos.push({id, text});
            status = 201;
            response.success = true;
            response.data = todos;
        }
        res.writeHead(status,{ 
            'Content-Type': 'application/json',
            'X-Powered-By': 'Node.js'
        }); 
        res.end(JSON.stringify(response));
    })
    
})
const PORT = 5000;
server.listen(PORT,()=>console.log(`server running on port ${PORT}`));