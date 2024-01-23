const express = require('express');
const routerBooks = express.Router();
const books = require('../data');
const Joi = require('joi')

const bookSchema = Joi.object({
    title: Joi.string().required().label('title'),
    author: Joi.string().required().label('author'),
});

//Get Books
routerBooks.get('/', (req, res, next) => {
    try{
        res.json(books);
    } catch(err){
        next(err);
    }
});

//Get Book by ID

routerBooks.get('/:id', (req, res, next) => {
    try{
        const book = books.find(book => book.id === req.params.id);
        if(!book){
            const error = new Error('Book not found for id ' + req.params.id)
            error.status = 404;
            throw error;
        }
        res.json(book);
    } catch(err){
        next(err);
    }
});

//Create Book
routerBooks.post('/create', (req, res, next) => {
    try{
        const value = req.body;
        const result = bookSchema.validate(value);
        if(result.error){
            const error = new Error(result.error.details[0].message);
            error.status = 400;
            throw error;
        }
        const {title, author} = result;
        const newBook = {
            id: books.length + 1,
            title,
            author,
        };

        books.push(newBook);
        res.status(201).json(newBook);
    } catch(err){
        next(err);
    }
});

//Update Book
routerBooks.put('/:id', (req, res, next) =>{
    try{
        const id = req.params.id;
        const value = req.body;
        const result = bookSchema.validate(value);
        if(result.error){
            const error = new Error(result.error.details[0].message);
            error.status = 400;
            throw error;
        }
        const {title, author} = result;
        const book = books.find(book => book.id === req.params.id);
        if(!book){
            const error = new Error('Book not found for id'+ req.params.id)
            error.status = 404;
            throw error;
        }
        book.title = title || book.title;
        book.author = author || book.author;
        res.json(book);
    } catch(err){
        next(err);
    }
});

//Delete Book

routerBooks.delete('/:id', (req, res, next) => {
    try{
        const id = req.params.id;
        const index = books.findIndex(book => book.id === req.params.id);
        if(index === -1){
            const error = new Error('Book not found for id'+ req.params.id)
            error.status = 404;
            throw error;
        }

        const deleteBook = books.splice(index, 1);
        res.json(deleteBook[0]);
    } catch(err){
        next(err);
    }
});

module.exports = routerBooks;