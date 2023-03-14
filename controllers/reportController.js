const Report = require('../models/reportModel');

// create and save a new Report
exports.create = (req, res) => {
    // validate request

    if(!req.body.title || !req.body.description) {
        return res.status(400).send({ message: "either title or description is empty in the request." });
    }

    
    // create a Report
    
    const report = new Report({
        title: req.body.title,
        description: req.body.description
    });
    
    //  console.log(Report.title);
    
    // save Report in the database
    report.save().then(data => {
        res.status(201).send(data);
        console.log("data is stored in database")
    }).catch(err => {
        res.status(500).send({ message: err.message || "Some error occurred while creating the Report." });
    });
   
    //console.log("code is working fine till here")
};

// retrieve and return all Reports
exports.findAll = (req, res) => {
    Report.find().then(Reports => {
        res.status(200).send(Reports);
    }).catch(err => {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving Reports." });
    });
};

// find a single Report by id
exports.findOne = (req, res) => {
    Report.findById(req.params.id).then(Report => {
        if(!Report) {
            return res.status(404).send({ message: "Report not found with id " + req.params.id });
        }
        res.status(200).send(Report);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({ message: "Report not found with id " + req.params.id });
        }
        return res.status(500).send({ message: "Error retrieving Report with id " + req.params.id });
    });
};

// update a Report by id
exports.update = (req, res) => {
    // validate request
    if(!req.body.title || !req.body.description) {
        return res.status(400).send({ message: "Report content cannot be empty." });
    }

    // find and update Report
    Report.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description
    }, { new: true }).then(Report => {
        if(!Report) {
            return res.status(404).send({ message: "Report not found with id " + req.params.id });
        }
        res.status(200).send(Report);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({ message: "Report not found with id " + req.params.id });
        }
        return res.status(500).send({ message: "Error updating Report with id " + req.params.id });
    });
};

// delete a Report by id
exports.delete = (req, res) => {
    Report.findByIdAndRemove(req.params.id).then(Report => {
        if(!Report) {
            return res.status(404).send({ message: "Report not found with id " + req.params.id });
        }
        res.status(200).send({ message: "Report deleted successfully!" });
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({ message: "Report not found with id " + req.params.id });
        }
        return res.status(500).send({ message: "Could not delete Report with id " + req.params.id });
    });
};


exports.findbyDay = (req, res) => {
    let day = req.params.day;
    console.log(`day is ${day}`)
    Report.find({day}).then(reports => {
        if(!reports) {
            return res.status(404).send({ message: "Report not found with day " + req.params.id });
        }
        res.status(200).send(reports);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({ message: "Report not found with id " + req.params.id });
        }
        return res.status(500).send({ message: "Error retrieving Report with id " + req.params.id });
    });
}