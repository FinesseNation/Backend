const {body, validationResult} = require("express-validator");

const Event = require("../model/event");

exports.getEvents = function(req, res) {
    Event.find({}).exec(function(err, listEvents) {
        if(err) {
            console.log("Error: unable to get events");
            res.status(400).end();
        } else {
            res.json(listEvents);
        }
    });
};

exports.addEvent = [
    // Validate fields
    body("eventTitle", "Please enter a valid event title").isLength({min: 1}).trim(),
    // body("description", "Please enter a valid description").isLength({min: 1}).trim(),
    body("location", "Please enter a valid location").isLength({min: 1}).trim(),
    // body("duration", "Please enter a valid duration").isLength({min: 1}).trim(),
    body("postedTime", "Please enter a valid time posted").isLength({min: 1}).trim(),
    // body("image", "Please enter a valid image string binary").isLength({min: 1}).trim(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Error Happened");
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {eventTitle, emailId, school, description, location, isActive, image, postedTime, duration, category} = req.body;

        let newEvent = new Event({
            "eventTitle": eventTitle,
            "emailId": emailId,
            "school": school,
            "description": description,
            "location": location,
            "isActive" : isActive,
            "image": image,
            "postedTime": postedTime,
            "duration": duration,
            "category" : category
        });

        await newEvent.save(function(err) {
            if(err) {
                res.send({"Error": "adding new event = " + eventTitle});
                console.log(err);
                res.status(400).end();
            } else {
                let logMessage = "Success: added new event = " + eventTitle;
                console.log(logMessage);
                res.send(logMessage);
            }
        });
    }
];

exports.updateEvent = [
    // Validate fields
    body("eventTitle", "Please enter a valid event title").isLength({min: 1}).trim(),
    // body("description", "Please enter a valid description").isLength({min: 1}).trim(),
    body("location", "Please enter a valid location").isLength({min: 1}).trim(),
    // body("duration", "Please enter a valid duration").isLength({min: 1}).trim(),
    body("postedTime", "Please enter a valid time posted").isLength({min: 1}).trim(),
    // body("image", "Please enter a valid image string binary").isLength({min: 1}).trim(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Error Happened");
            return res.status(400).json({
                errors: errors.array()
            });
        }

        //TODO: decide on what all fields are modifiable!!!
        const {eventTitle, emailId, school, description, location, isActive, image, postedTime, duration, category} = req.body;

        //Treating eventTitle as the unique ID
        let currEvent = await Event.findOne({"eventTitle": eventTitle});
        if(currEvent) {
            currEvent.eventTitle = eventTitle;
            currEvent.emailId = emailId;
            currEvent.school = school;
            currEvent.description = description;
            currEvent.location = location;
            currEvent.isActive = isActive;
            currEvent.image = image;
            currEvent.postedTime = postedTime;
            currEvent.duration = duration;
            currEvent.category = category;
            await currEvent.save(function(err) {
                if(err) {
                    res.send({"Error": "updating event _id = " + eventTitle});
                    res.status(400).end();
                } else {
                    let logMessage = "Success: updated event _id = " + eventTitle;
                    console.log(logMessage);
                    res.send(logMessage);
                }
            });
        } else {
            console.log("Error: unable to find event to update _id = " + eventTitle);
            res.status(400).end();
        }
    }
];

exports.deleteEvent = function(req, res) {
    let rawEventId = req.body._id;
    Event.findByIdAndDelete(rawEventId, function(err) {
        if(err) {
            res.send({"Error": "deleting event _id = " + rawEventId});
            res.status(400).end();
        } else {
            let logMessage = "Success: deleted event _id = " + rawEventId;
            console.log(logMessage);
            res.send(logMessage);
        }
    });
};

