const { Contract } = require('../models/contract');
const { Customer, sequelize } = require('../models/customer');
const httpStatus = require('http-status');
const moment = require('moment');

// CREATE CUSTOMER
const addCustomer = async (req, res) => {
    const { body } = req
    const t = await sequelize.transaction();
    try {
        const customer = await Customer.create(body, { transaction: t });
        const contract = await Contract.create({ ...body.contract, customerId: customer.id }, { transaction: t });
        contract.setCustomer(customer, { transaction: t })
        await t.commit();
        res.status(httpStatus.OK).json({ customer: customer, contract: contract });
    } catch (error) {
        await t.rollback();
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Erreur lors de la création du client.' });
    }
}

// UPDATE CUSTOMER
const updateCustomer = async (req, res, next) => {
    const { body } = req;
    const customerId = req.params.customerId
    const t = await sequelize.transaction();
    try {
        const customer = await Customer.findByPk(
            customerId,
            { include: [{ model: Contract }] },
            { transaction: t }
        )
        if (!customer) {
            await t.rollback();
            res.status(httpStatus.NOT_FOUND).send();
        } else {
            await customer.update(body, { transaction: t });
            await t.commit();
            res.status(httpStatus.OK).json(customer);
        }
    } catch (error) {
        await t.rollback();
        next(error);
    }
}

// DELETE CUSTOMER
const deleteCustomer = async (req, res, next) => {
    const customerId = req.params.customerId
    const t = await sequelize.transaction()
    try {
        const customer = await Customer.findByPk(customerId, { transaction: t })
        if (!customer) {
            await t.rollback()
            res.status(httpStatus.NOT_FOUND).send()
        } else {
            await customer.destroy()
            await t.commit();
            res.status(httpStatus.NO_CONTENT).send();
        }
    } catch (error) {
        await t.rollback()
        next(error);
    }
};

// CUSTOMER ID
const getCustomerById = async (req, res, next) => {
    const customerId = req.params.customerId
    try {
        const customer = await Customer.findByPk(
            customerId,
            { include: [{ model: Contract }] },
        );
        if (!customer) {
            res.status(httpStatus.NOT_FOUND).send()
        }
        res.status(httpStatus.OK).json(customer);
    } catch (error) {
        next(error);
    }
};

const getHaveApproved = async (req, res, next) => {
    try {
        const customers = await Customer.findAll({
            where: { hasApproved: true },
            include: [{ model: Contract }]
        })
        if (customers) {
            res.status(httpStatus.OK).json(customers)
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
        const customers = await Customer.findAll({ include: [{ model: Contract }] },
        )
        if (customers) {
            res.status(httpStatus.OK).json(customers)
        } else {
            res.status(httpStatus.NOT_FOUND).send()
        }
    } catch (error) {
        next(error);
    }
};

//DATA FOR TABLE
// const dataForTable = async (req, res, next) => {
//     try {
//         const customers = await Customer.findAll({ include: [{ model: Contract }] },
//         )
//         if (customers) {
//             const AddProps = customers.map((customer) => {
//                 return {
//                     id : customer.id,
//                     firstName1 : customer.firstName1,
//                     lastName1 : customer.lastName1,
//                     mail1: customer.mail1,
//                     phoneNumber1 : customer.phoneNumber2,
//                     firstName2 : customer.firstName2,
//                     lastName2 : customer.lastName2,
//                     mail2: customer.mail2,
//                     phoneNumber2 : customer.phoneNumber2,
//                     OpinionAsked : customer.opinionAsked,
//                     Date : moment(customer.contracts[0].validateDate).locale('fr').format('DD/MM/YYYY'),
//                     deadlineTotal : moment(customer.contracts[0].deadlineTotal).locale('fr').format('DD/MM/YYYY'),
//                     deposit : customer.contracts[0].deposit,
//                     balance : customer.contracts[0].balance,
//                     reminderTotal : customer.contracts[0].remiderTotal,
//                     invoiceTotalSent : customer.contracts[0].invoiceTotalSent,
//                     eventType : customer.contracts[0].eventType,
//                     note : customer.contracts[0].note,
//                     id : customer.contracts[0].id,
//                     total : customer.contracts[0].total,
//                     waitingDeposit : customer.contracts[0].waitingDeposit,
//                 }
//             })
//             res.status(httpStatus.OK).json(AddProps)
//         } else {
//             res.status(httpStatus.NOT_FOUND).send()
//         }
//     } catch (error) {
//         next(error);
//     }
// };

module.exports = {
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerById,
    getHaveApproved,
    allCustomers
};





