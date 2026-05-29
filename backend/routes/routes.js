const express = require("express")
const Router = express.Router();
const Job = require("../models/DevJob")

Router.get("/", (req, res) => {
res.send("jobs are working")

})

Router.post("/", (req, res) => {
    const { company, position, status, salary, link, notes } = req.body
    const newJob = new Job({ company, position, status, salary, link, notes })
    newJob.save()
    res.status(201).json(newJob)
})
module.exports = Router;