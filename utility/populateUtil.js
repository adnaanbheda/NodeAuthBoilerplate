module.exports = {
    client: {
        path: "orderlist",
        populate: {
            path: "people.client"
        }
    },
    delivery: {
        path: "orderlist",
        populate: {
            path: "people.delivery"
        }
    },
    logistics: {
        path: "orderlist",
        populate: {
            path: "people.logistics"
        }
    },
    people: [
        {
            path: "orderlist",
            populate: {
                path: "people.client"
            }
        },
        {
            path: "orderlist",
            populate: {
                path: "people.delivery"
            }
        },
        {
            path: "orderlist",
            populate: {
                path: "people.logistics"
            }
        }
    ],
    order: "people.client people.delivery people.logistics"
}