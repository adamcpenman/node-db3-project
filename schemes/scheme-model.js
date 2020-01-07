const db = require("../data/db-config")

function find() {
    return db("schemes")
}



module.exports = {
    find,
    // findById,
    // findSteps,
    // add,
    // update,
    // remove
}