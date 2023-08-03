const { log } = require("handlebars");
const db = require("../models");
const category = db.category;
const user = db.user;
const product = db.product;
const { Op, Sequelize } = require('sequelize');

module.exports = {
    addProduct: async (req, res) => {
        try {
            const { productName, productPrice, productDesc, CategoryId, productQty } = req.body;
            const productImg = req.file.filename;
            const result = await product.create({ productImg, productName, productPrice, productDesc, CategoryId, productQty });
            res.status(200).send("Success to add product");
        } catch (error) {
            res.status(400).send({ error, msg: "Failed to add product" });
        }
    },
    getProduct: async (req, res) => {
        try {
            const id = req.params.id;
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 10;
            const offset = (page - 1) * limit;
            const search = req.query.search;
            const catId = +req.query.catId;
            const sort = req.query.sort || 'DESC';
            const sortBy = req.query.sortBy || 'createdAt';
            const condition = {};

            if (search) {
                condition[Op.or] = [{ productName: { [Op.like]: `${search}%` } }];
            }

            if (catId) {
                condition.CategoryId = catId;
            }

            const result = await product.findAll({
                include: [
                    {
                        model: category,
                        attributes: { exclude: ['createdAt', 'updatedAt', 'isDeleted'] },
                    },
                ],
                attributes: [
                    'id',
                    'productName',
                    'productImg', // Fixed productImage to productImg
                    'productDesc', // Fixed productDescription to productDesc
                    'productPrice',
                    'CategoryId',
                    'productQty',
                    'isDeleted',
                ],
                where: condition,
                subQuery: false,
                offset,
                limit,
            });

            const total = await product.count({ where: condition });

            res.status(200).send({
                totalPage: Math.ceil(total / limit),
                currentPage: page,
                totalProduct: total,
                result,
            });
        } catch (error) {
            res.status(400).send(error);
        }
    },

};
