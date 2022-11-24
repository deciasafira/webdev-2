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

module.exports = route;