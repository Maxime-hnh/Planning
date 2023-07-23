const Customer = require('../models/customer');
const httpStatus = require('http-status');


// CREATE CUSTOMER
const addCustomer = async (req, res, next) => {
    try {
        models.sequelize
            .transaction(async () => {
                const customer = await Customer.create(req.body)
                res.status(httpStatus.OK).json(customer);
            })
        }
    catch (error) {
        next(error);
    }
};

// UPDATE CUSTOMER
const updateCustomer = async (req, res, next) => {
    const { body } = req;
    const customerId = req.params.customerId
    try {
        const customer = await models.Event.findByPk(customerId)   
        if (!customer) {
            res.status(httpStatus.NOT_FOUND).send();
        } else {
            customer.set(body);
            await customer.save()
            res.status(httpStatus.OK).json(customer);
        }
    } catch (error) {
        next(error);
    }
}

// DELETE CUSTOMER
const deleteCustomer = async (req, res, next) => {
    const customerId = req.params.customerId
    try {
        const customer = await Customer.findByPk(customerId)

        if (!customer) {
            res.status(httpStatus.NOT_FOUND).send()
        } else {
            await models.sequelize.transaction(async () => {
                await customer.destroy()
                res.status(httpStatus.NO_CONTENT).send();
            })
        }
    } catch (error) {
        next(error);
    }
};

// CUSTOMER ID
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
};

//ALL CUSTOMERS
const allCustomers = async (req, res, next) => {
    try {
        const customers = await Customer.findAll()

        if (customers) {
            res.status(httpStatus.OK).json(customers)
        } else {
            res.status(httpStatus.NOT_FOUND).send()
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerId,
    allCustomers
  };





