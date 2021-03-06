const Router = require(`koa-joi-router`)
const Joi = Router.Joi.extend(require(`@hapi/joi-date`))
const CUSTOMER_CONTROLLER = require(`../../controllers/customer.controller`)

const routes = [
    {
        method: `get`,
        path: `/test`,
        handler: CUSTOMER_CONTROLLER.getCustomer
    }
]

module.exports = routes
