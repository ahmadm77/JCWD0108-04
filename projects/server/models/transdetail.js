'use strict';
const {
  Model, ForeignKeyConstraintError
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transDetail.belongsTo(models.transaction, {foreignKey : 'transactionId'});
      transDetail.belongsTo(models.user);
      transDetail.belongsTo(models.product);

    }
  }
  transDetail.init({
    productName : {
      type : DataTypes.STRING,
      allowNull : false
    },
    productPrice : {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    productCategory : {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    totalQty : {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    totalPriceItem : {
      type : DataTypes.INTEGER,
      allowNull : false
    }
  },{
    sequelize,
    modelName: 'transDetail',
    freezeTableName: true,
    updatedAt : false
  });
  transDetail.removeAttribute('id');
  return transDetail;
};