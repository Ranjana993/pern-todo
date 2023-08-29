const express = require("express")
require("dotenv").config();
const pool = require("./dbConfig/dbConnection")
const app = express();


// Middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;



app.get("/", (req, res) => {
    res.send("<h1> Hello , App is running on PORT <h1/>");
})

// ADDING TODOS......
app.post("/addTodo", async (req, res) => {
    const { description } = req.body;
    const newTodo = await pool.query("INSERT INTO todos (description) VALUES($1)", [description])
    res.send(newTodo)
})

// GETTING ALL TODOS 
app.get("/getAllTodos", async(req, res) => {
    const allTodos = await pool.query("SELECT * FROM todos");
    res.send(allTodos.rows)

})

// GET A SINGLE TODO  ....
app.get("/todo/:id" , async(req ,res) =>{
    const {id} = req.params;
    const todo = await pool.query("SELECT * FROM todos WHERE todo_id = $1" , [id]);
    res.send(todo);
    console.log(todo.rows);
})


// UPDATE TODOS....
app.put("/updateTodo/:id" , async(req , res) =>{
    const {id} = req.params;
    const {description} = req.body;
    const updatedTodo = await pool.query("UPDATE todos SET description = $1 WHERE todo_id = $2 " , [ description , id]);
    res.send("todp was updated ") ; 
})

// DELETE TODOS 
app.delete("/deleteTodo/:id" , async(req , res) =>{
    const {id} = req.params;
    const deletedTodos = await pool.query("DELETE FROM todos WHERE todo_id = $1" , [id]);
    res.send("todo is deleted successfully ");
})



app.listen(PORT, () => console.log(`app is running on http://localhost:${PORT}`));



