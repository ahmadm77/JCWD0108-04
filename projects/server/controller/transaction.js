const db = require('../models');
const trd = db.transDetail;
const tr = db.transaction;
const moment = require('moment');

const transController = {
  checkOut : async (req, res) => {
    try {
      const {userId, total, cash, change, details} = req.body;
      const date = moment().format('DDMMYYYhmmss');
      const inv = `INV-${userId}${date}`;
      const setTr = await tr.create({
        transactionId : inv, total: total, cash : cash, change: change
      });
      for (let i = 0; i < details.length; i++) {
        const setTrd = await trd.create({
          productName : details[i].productName,
          productPrice : details[i].productPrice,
          productCategory : details[i].productCategory,
          totalQty : details[i].totalItem,
          totalPriceItem : details[i].totalPriceItem,
          productId : details[i].productId,
          transactionId : inv,
          userId : userId
        });
      }
      res.status(200).send('success');
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
}

module.exports = transController;