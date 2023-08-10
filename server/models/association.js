const {Customer} = require('./customer');
const {Contract} = require('./contract');

function initAssociations() {
  Customer.hasMany(Contract, {
    foreignKey: 'customerId',
    as : 'contracts'
  });

  Contract.belongsTo(Customer, {
    foreignKey: 'customerId',
  });
}

module.exports = initAssociations;