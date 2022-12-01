const { Router } = require("express")
const journal = require("../models/journal")
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

route.get("/detail/:id", async (req,res) => {
    try {
        const response = await Journal.findById(req.params.id)
        res.json(response)
    } catch (error) {
        res.status(500).send(error)
    }
})

route.post("/", async (req,res) => {
    const {question}  = req.body
    console.log(question)
    const schema = new Journal({
        journals: question 
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
    const journal = req.body.journal;
    const checkDate = await Journal.find({ date : date });

    if (checkDate.length > 0) {
        console.log(checkDate.length)
        res.json({ message : "Data Tersebut Sudah Ada !"})
        return
    }
    const schema = new Journal({
        date: new Date(date),
        journals: journal
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

    response.journals = req.body.question
    try {
        const updatedJournal = await response.save();
        res.json(updatedJournal);
    } catch (error) {
        res.status(500).send(error)
    }
})

route.delete("/:id", async (req,res)=> {
    try {
        const deleteJournal = await Journal.deleteOne({_id : req.params.id})
        res.json(deleteJournal);
    } catch (error) {
        res.status(500).send(error)
    }
})

route.put("/:Journalid/:id", async (req, res) => {
    const idGrid = req.params.Journalid;
    const journalId = req.params.id;
    try {
        const editedJournal = await Journal.updateOne(
        {
            _id : idGrid, 
            "journals._id" : journalId
        },
        {
            $set : {
                "journals.$.answer" : req.body.answer
            }
        })

        res.json(editedJournal)
    } catch (err) {
        console.log(err)
    }
})

route.get("/today", async (req,res) => {
    const a = new Date()
    a.setHours(0,0,0,0)

    const today = a.getFullYear() + "-" + a.getMonth() + "-" + a.getDate()
    const journal = await Journal.findOne({ date : new Date(today)})
    res.json(journal)
})

module.exports = route;