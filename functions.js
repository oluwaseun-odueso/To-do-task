const express = require('express');
const connection = require('./databaseConnection');
require('dotenv').config()

// Necessary functions
function addToDo(item) {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO to_do (items, set_date) VALUES ('${item}', now())`
        connection.query(sql, (error, results) => {
            if (error) reject(error)
            resolve(true)
        })
    })
}

function returnItemId(){
    return new Promise((resolve, reject) => {
        connection.query("SELECT MAX(id) AS last_entry FROM to_do", (error, result) => {
            if (error) reject(error)
            resolve(result)
        })
    })
}


function getAToDo (id) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM to_do WHERE id = '${id}';`
        connection.query(sql, (error, results) => {
            if (error) reject(error)
            resolve(results)
        })
    })
}


function getAllToDo () {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM todo.to_do;"
        connection.query(sql, (error, results) => {
            if (error) reject(error)
            resolve(results)
        })
    })
}


function updateToDo (id, item) {
    return new Promise((resolve, reject) => {
        let sql = `UPDATE to_do SET items = '${item}' WHERE id = ${id};`
        connection.query(sql, (error, results) => {
            if (error) reject(error)
            resolve(results)
        })
    })
}


function deleteToDo (id) {
    return new Promise((resolve, reject) => {
        let sql = `DELETE FROM to_do WHERE id = ${id};`
        connection.query(sql, (error, results) => {
            if (error) reject(error)
            resolve(results)
        })
    })
}

const functions = {
    addToDo,
    getAToDo,
    getAllToDo,
    returnItemId,
    updateToDo,
    deleteToDo
}

module.exports = functions
