const Router = require(`koa-joi-router`)
const Joi = Router.Joi.extend(require(`@hapi/joi-date`))
const CUSTOMER_CONTROLLER = require(`../../controllers/customer.controller`)

const routes = [
    {
        method: `post`,
        path: `/customer`,
        handler: CUSTOMER_CONTROLLER.getCustomer,
        meta: { postman: { body: { name: `Bob Dobalinaz` } } }
    },
    {
        method: `get`,
        path: `/customer-2`,
        handler: CUSTOMER_CONTROLLER.getCustomer
    }
]

module.exports = routes
