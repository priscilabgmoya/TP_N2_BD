const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const {connection} = require("../db/db.db");
const usuarioRouter  = require('../router/user.router');


class Server {
    constructor() {
        this.app = express();
        this.app.PORT = process.env.DB_PORT;
        this.#middlewares();
        this.#DBconexion();
        this.#routers();
    }
    #middlewares() {
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static('public'));
    }
    async #DBconexion() {
        await connection();
    }
    #routers() {
        this.app.use(usuarioRouter);
    }
    listen(){
        this.app.listen(this.app.PORT, ()=> {
            console.log(`se esta escuchando en el puerto ${this.app.PORT}`);
            console.log(`url: http://localhost:${this.app.PORT}`);
        })
    }
}

module.exports = Server; 