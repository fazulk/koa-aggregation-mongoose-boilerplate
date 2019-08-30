// Must have a POSTMAN acct to use this file

require(`dotenv`).config()
const axios = require(`axios`)
const allRoutes = require(`require-all`)({
    dirname: __dirname + `/../routes`,
    recursive: true
})

const item = []
const url = `{{env}}`
const publicRoutes = allRoutes.public

for (const key in publicRoutes) {
    const folder = {
        name: key,
        item: []
    }

    publicRoutes[key].forEach(elm => {
        folder.item.push({
            name: key + elm.path,
            request: {
                url: `${url}${elm.path}`,

                method: elm.method.toUpperCase(),

                header: [
                    {
                        key: `Content-Type`,
                        value: `application/json`
                    }
                ],

                body: {
                    mode: `raw`,
                    raw: JSON.stringify(
                        elm.meta
                            ? elm.meta.postman.body
                                ? elm.meta.postman.body
                                : {}
                            : {}
                    )
                },

                description: elm.meta
                    ? elm.meta.postman.description
                        ? elm.meta.postman.description
                        : ``
                    : ``
            }
        })
    })
    item.push(folder)
}

const postCollection = async () => {
    let res = await axios({
        method: `put`,
        url: `https://api.getpostman.com/collections/2523884-f63bcdd7-8499-4774-9689-d6d809552312`,
        headers: {
            'X-Api-Key': process.env.POSTMAN_ID,
            'Content-Type': `application/json`
        },
        data: {
            collection: {
                info: {
                    name: `KOA Mongo Aggregation Boilerplate`,
                    description: `Auto Generated Postman routes`,
                    schema: `https://schema.getpostman.com/json/collection/v2.1.0/collection.json`
                },
                item: item
            }
        }
    })

    console.log(res.status == 200 ? `Postman Save Success` : `Fail`)
}
postCollection()
