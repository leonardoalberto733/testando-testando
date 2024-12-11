const db = require('../DB/db')

class ClientRepository{
    async findAll(){
        const rows = await db.query(
            `SELECT * FROM clientes;`
        )
        return rows
    }


    create(){

    }

    update(){

    }

    delete(){

    }
}
module.exports = new ClientRepository();