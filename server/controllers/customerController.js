const Customer = require('../models/customer')


// CREATE CUSTOMER
exports.addCustomer = (req, res, next) => {

    Customer.create(req.body)
        .then(result => {
            res.status(201).json({
                message: 'Client ajouté avec succès.',
                customer: result
            })
        })
        .catch(err => console.log('Une erreur est survenue :', err))
}

// UPDATE CUSTOMER

// DELETE CUSTOMER

// CUSTOMER ID
exports.customerId = (req, res, next) => {
    const customerId = req.params.customerId
    Customer.findByPk(customerId)
        .then(customer => {
            if (!customer) {
                return res.status(404).json({ message: 'Client introuvable.' });
            }
            res.status(200).json({ customer: customer })
        })
        .catch(err => console.log(err));
};


// ALL CUSTOMERS
exports.allCustomers = (req, res, next) => {
    Customer.findAll()
        .then(customers => {
            res.status(200).json(customers);
        })
        .catch(err => console.log(err));
}

const getCustomerId = async (req, res, next) => {
    const customerId = req.params.customerId
    try {
        const customer = await Customer.findByPk(customerId)

        if (customer) {
            res.status(httpStatus.OK).json(customer);
        } else {
            res.status(httpStatus.NOT_FOUND).send()
        }

    } catch (error) {
        next(error);
    }
}


