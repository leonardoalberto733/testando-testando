const ClientRepository = require('../repositories/ClientRepository')

class ClientController{
    async index(request, response){
        const clients = await ClientRepository.findAll()
        response.json(clients) 
    }

   async show(request, response){
        const {id} = request.params

        const clients = await ClientRepository.findById(id)
        if(!clients){
            return response.status(404).json({error: "Cliente não encontrado!"})
        }
        response.status(200).json(clients)
    }

    store(){
        //CADASTRAR UM CONTATO
    }

    update(){
        //ATUALIZAR UM CONTATO
    }

    delete(){
        //DELETAR UM CONTATO
    }

}

module.exports = new ClientController();