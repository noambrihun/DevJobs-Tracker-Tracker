const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["applied", "interview", "rejected", "accepted"],
        default: "applied"
    },
    salary: {
        type: Number,
    },
    link: {
        type: String,
    },
    notes: {
        type: String,
        
    },
},
{
    timestamps: true,
}
)

module.exports = mongoose.model("Job", jobSchema)