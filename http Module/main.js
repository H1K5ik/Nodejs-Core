const http = require('http');
const url = require('url');

let tasks = [];
let nextId = 1;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    
    req.on('end', () => {
        let responseData = {};
        let statusCode = 200;

        if (trimmedPath === 'tasks') {
            switch(method) {
                case 'post':
                    const newTask = JSON.parse(body);
                    newTask.id = nextId++;
                    tasks.push(newTask);
                    responseData = newTask;
                    statusCode = 201;
                    break;
                case 'get':
                    responseData = tasks;
                    break;
                default:
                    statusCode = 405;
                    responseData = { error: 'Method Not Allowed' };
            }
        } else if (trimmedPath.startsWith('tasks/')) {
            const id = parseInt(trimmedPath.split('/')[1]);
            const taskIndex = tasks.findIndex(t => t.id === id);
            
            switch(method) {
                case 'get':
                    if (taskIndex !== -1) {
                        responseData = tasks[taskIndex];
                    } else {
                        statusCode = 404;
                        responseData = { error: 'Task not found' };
                    }
                    break;
                case 'put':
                    if (taskIndex !== -1) {
                        const updatedTask = JSON.parse(body);
                        tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
                        responseData = tasks[taskIndex];
                    } else {
                        statusCode = 404;
                        responseData = { error: 'Task not found' };
                    }
                    break;
                case 'delete':
                    if (taskIndex !== -1) {
                        tasks.splice(taskIndex, 1);
                        statusCode = 204;
                    } else {
                        statusCode = 404;
                        responseData = { error: 'Task not found' };
                    }
                    break;
                default:
                    statusCode = 405;
                    responseData = { error: 'Method Not Allowed' };
            }
        } else {
            statusCode = 404;
            responseData = { error: 'Not Found' };
        }

        res.setHeader('Content-Type', 'application/json');
        res.writeHead(statusCode);
        res.end(JSON.stringify(responseData));
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(` ${port}`);
});