require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))
morgan.token('body',(req)=>(req.method==='POST'? JSON.stringify(req.body):''))

app.use(morgan(':method :url :status - :response-time ms :body'))
let persons=[
    {
        id:1,
        name:"Arto Hellas",
        number:"040-123456"
    },
    {
        id:2,
        name:"Ada Lovelace",
        number:"39-44-5323523"
    },
    {
        id:3,
        name:"Dan Abramov",
        number:"12-43-234345"
    },
    {
        id:4,
        name:"Mary Poppendick",
        number:"39-23-6423122"
    }
]
const generateId = ()=>{
    const maxId = notes.length>0
      ?Math.max(...notes.map(n=>n.id))
      :0
    return maxId+1
}
const getRandomId=()=>(Math.floor(Math.random()*999))

app.get('/',(req,res)=>{
    res.send('<h1>Ponebook-Api is running</h1>')
})
app.get('/api/persons',(req,res)=>{
    res.json(persons)
})
app.get('/api/persons/:id',(req,res)=>{
    const id = Number(req.params.id)
    const person = persons.find(p=>p.id===id)
    if(person){
        res.json(person)
    }else{
        res.status(404).end()
    }
})
app.post('/api/persons',(req,res)=>{
    const body = req.body
    if(!body.name){
        return res.status(400).json({
            error:'name missing'
        })
    }
    if(!body.number){
        return res.status(400).json({
            error:'number missing'
        })
    }
    console.log(persons.findIndex(p=>p.name===body.name))
    if((persons.findIndex(p=>p.name===body.name)!==-1)){    
        return res.status(400).json({
            error:'name must be unique'
        })
    }
    const person = {
        id:getRandomId(),
        name:body.name,
        number:body.number,
    }
    persons = persons.concat(person)
    res.json(person)

    
})
app.get('/info',(req,res)=>{
    const len = persons.length
    const date = new Date()
    res.send(`
    <p>Phonebook has info for ${len} people</p>
    <p>${date}</p>
    `)
})
app.delete('/api/persons/:id',(req,res)=>{
    const id = Number(req.params.id)
    persons = persons.filter(p=>p.id!==id)
    res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})