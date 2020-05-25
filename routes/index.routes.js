const express = require('express');
const ObjectId = require('mongodb').ObjectID;

const router = express.Router();

router.get('/appointments', (req, res) => {
    req.collection.find().toArray().then(result => {
        // res.status(200).json({ success: true, data: result });
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ success: false, error: error.message });
    })
})

router.post('/appointments', (req, res) => {
    const { date, email, name } = req.body;
    if (!date || !email || !name) {
        return res.status(400).json({ message: 'Date, name and email are required.' })
    }

    const payload = { date, name, email };
    req.collection.insertOne(payload).then(result => {
        // res.status(201).json({ success: true, data: result.ops[0] });
        res.status(201).json(result.ops[0]);
        // res.status(201).json({ success: true, message: 'inserted successfully.' });
    }).catch(error => {
        res.status(500).json({ success: false, error: error.message });
    })
})

router.delete('/appointments/:id', (req, res) => {
    const _id = ObjectId(req.params.id);
    req.collection.deleteOne({ _id }).then(() => {
        res.status(200).json({ success: true, message: 'deleted successfully.' });
    }).catch(error => {
        res.status(500).json({ success: false, error: error.message });
    })
})


module.exports = router;