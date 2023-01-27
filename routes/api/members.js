const express = require('express');
const router = express.Router();
const members = require('../../members');
const uuid = require('uuid');

//Get all members
router.get('/', (req, res) => res.json(members));

//Get single member
router.get('/:id', (req, res) => {
    try {
        const found = members.some(member => member.id === parseInt(req.params.id));

        if (!found) {
            throw new Error(`Member with id ${req.params.id} not found!`);
        }

        res.json(members.filter(member => member.id === parseInt(req.params.id)));

    } catch (error) {
        res.status(400).json({message: error.message});
    };

    //or
    // try {
    //     const member = members.find((m) => m.id === Number(req.params.id));
        
    //     if (!member) {
    //         throw new Error("Member not found!");
    //     };

    //     res.json(member);

    // } catch (error) {
    //     res.status(400).json({message: error});
    // };
});

router.post('/', (req, res) => {
    try {
        if (!req.body.name || !req.body.email) {
            throw new Error('Required field (name or email) is Empty!');
        };

        const member = {
            id: uuid.v4(),
            name: req.body.name,
            email: req.body.email,
            status: 'active'
        };
        
        members.push(member)

        res.redirect('/');
    } catch (error) {
        res.json({code: 404, message: error.message})
    };
});

router.put('/:id', (req, res) => {
    try {
        const found = members.some(member => member.id === parseInt(req.params.id));

        if (!found) {
            throw new Error(`Member with id ${req.params.id} not found!`);
        };
        
        const updMember = req.body;

        members.forEach((member) => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;
                member.status = updMember.status ? updMember.status : member.status;

                res.json({message: 'Memeber Updated!', member});
            }
        });
    } catch (error) {
        res.json({code: 404, message: error.message})
    };
});

router.delete('/:id', (req, res) => {
    try {
        const found = members.some(member => member.id === parseInt(req.params.id));

        if (!found) {
            throw new Error(`Member with id ${req.params.id} not found!`);
        };
        
        res.json({
            message: 'Member deleted!',
            members: members.filter(member => member.id !== parseInt(req.params.id))
        });
    } catch (error) {
        res.json({code: 404, message: error.message})
    };
});

module.exports = router;