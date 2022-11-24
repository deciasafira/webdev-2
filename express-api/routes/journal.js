const Journal = require("../models/journal")
const route = require("express").Router()

route.get("/", async (req,res) => {
    try {
        const response = await Journal.find()
        res.json(response)
    } catch (error) {
        res.status(500).send(error)
    }
})

route.post("/", async (req,res) => {
    const {question}  = req.body
    console.log(question)
    const schema = new Journal({
        journal: question 
    });
    
    try {
        const schemaCreate = await schema.save()
        res.json(schemaCreate)
    } catch (error) {
        res.status(500).send(error)
    }
})

route.post("/newdate", async (req,res) => {
    const date = req.body.date;

    const schema = new Journal({
        date: new Date(date)
    })
    try {
        const schemaCreate = await schema.save()
        res.json(schemaCreate)
    } catch (error) {
        res.status(500).send(error)
    }
})

route.patch("/:id", async (req,res)=> {
    let response = await Journal.findById(req.params.id);

    response.journal = req.body.question
    try {
        const updatedJournal = await response.save();
        res.json(updatedJournal);
    } catch (error) {
        res.status.send(error)
    }
})

module.exports = route;