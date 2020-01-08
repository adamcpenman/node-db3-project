const db = require("../data/db-config")

function find() {
    return db("schemes")
}

function findById(id) {
    return db("schemes")
        .where({ id })
        .first()
}

function findSteps(id) {
    return db('schemes')
        .select('steps.id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions')
        .join('steps', 'schemes.id', 'steps.scheme_id')
        .where({ scheme_id: id })
}

function add(scheme) {
    return db('schemes')
        .insert(scheme)
        .then( id => {
            return findById(id[0])
        })
}

function addStep(data, id) {
     const stepData = { scheme_id: id, ...data }

    return db('steps')
        .insert(stepData)
        .then(id => ({...stepData, id: id[0]}))
}

function update(changes, id) {
    return db('schemes')
        .where({ id })
        .update(changes)
        .then(id => {
            if (id > 0) {
                findById(id)
            } else {
                return null
            }
    })
}

function remove(id) {
    return db('schemes')
        .where({ id })
        .del()
}
  


module.exports = {
    find,
    findById,
    findSteps,
    add,
    addStep,
    update,
    remove,
}