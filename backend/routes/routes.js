const express = require("express")
const Router = express.Router();
const Job = require("../models/DevJob")

Router.get("/", (req, res) => {
res.send("jobs are working")

})

Router.post("/", async (req, res) => {
    const { company, position, status, salary, link, notes } = req.body
    try{
        const newJob = new Job({ company, position, status, salary, link, notes })
        await newJob.save()
        res.status(201).json({ message: "Job created", newJob })
    }catch(e){
        res.status(500).json({ message: "Error creating job", error: e.message })
    }
})

Router.delete("/:id", async (req,res) => {
    try{
        const deletedJob = await Job.findByIdAndDelete(req.params.id)
        if(!deletedJob){
            return res.status(404).json({ message: "Job not found" })
        }
        res.status(200).json({ message: "Job deleted", deletedJob })
    }catch(e){
        res.status(500).json({ message: "Error deleting job", error: e.message })
    }
})
module.exports = Router;