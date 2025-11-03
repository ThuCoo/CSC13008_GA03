const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.use(express.static('img'))

// const port = 3000
const PORT = process.env.PORT || 3000

// Set EJS as the templating engine
app.set('view engine', 'ejs')
app.set('views', './views')

// Sample data
const todos = [
    {
        id: 1, title: 'Đi chợ', completed: false
    },
    {
        id: 2, title: 'Học bài', completed: true
    },
    {
        id: 3, title: 'Làm deadline', completed: false
    },
]

// Route to render products with EJS
app.get('/api/todos', (req, res) => {
    res.json(todos)
})

app.post('/api/todos', (req, res) => {
    const todo = {
        ...req.body,
        id: todos.length + 1,
    }
    todos.push(todo)
    res.json(todo)
})

app.put('/api/todos/:id', (req, res) => {
    const todo = req.body
    const id = req.params.id
    const found = todos.find(t => t.id === parseInt(id))
    found.completed = todo.completed
    res.json(found)
})

app.delete('/api/todos/:id', (req, res) => {
    const id = req.params.id
    const index = todos.findIndex(t => t.id === parseInt(id));

    const [deleteTodo] = todos.splice(index, 1)
    res.status(204).send()
})

app.get('/todos', (req, res) => {
    res.render('todos', {
        title: 'TODO list',
        todos: todos
    })
})

// Root route
app.get('/', (req, res) => {
    res.render('index', {title: 'TODOGARDEN', message: 'Welcome to my TODO GARDEN!'})
})

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${port}`)
})