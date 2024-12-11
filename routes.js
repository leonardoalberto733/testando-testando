const express = require("express");
const router = express.Router();
const db = require("./DB/db");

// Rota para cadastrar clientes
router.post("/cadastrar", async (req, res) => {
  const { nome, cpf, email, endereco, numero, nascimento } = req.body;

  // Verifique se os campos estão completos
  if (!nome || !cpf || !email || !endereco || !numero || !nascimento) {
    return res.status(400).send("Todos os campos são obrigatórios.");
  }

  try {
    const query = `
      INSERT INTO clientes (nome, cpf, email, endereco, telefone, dataNasc)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [nome, cpf, email, endereco, numero, nascimento];
    await db.query(query, values);

    res.status(201).send("Cliente cadastrado com sucesso!");
  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);
    res.status(500).send("Erro ao cadastrar cliente.");
  }
});

// Rota para listar todos os clientes
router.get("/clientes", async (req, res) => {
    try {
      const query = "SELECT * FROM clientes;";
      const clients = await db.query(query);
      res.status(200).json(clients);
    } catch (error) {
      console.error("Erro ao listar clientes:", error);
      res.status(500).send("Erro ao listar clientes.");
    }
  });

  // Rota para editar um cliente
router.put("/clientes/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, cpf, email, endereco, numero, nascimento } = req.body;

    if (!nome || !cpf || !email || !endereco || !numero || !nascimento) {
        return res.status(400).send("Todos os campos são obrigatórios.");
    }

    try {
        const query = `
            UPDATE clientes
            SET nome = ?, cpf = ?, email = ?, endereco = ?, telefone = ?, dataNasc = ?
            WHERE id = ?
        `;
        const values = [nome, cpf, email, endereco, numero, nascimento, id];
        await db.query(query, values);

        res.status(200).send("Cliente atualizado com sucesso!");
    } catch (error) {
        console.error("Erro ao atualizar cliente:", error);
        res.status(500).send("Erro ao atualizar cliente.");
    }
});

  // Rota para deletar cliente
router.delete("/clientes/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const query = "DELETE FROM clientes WHERE id = ?";
        const values = [id];

        // Execute a query para excluir o cliente
        const result = await db.query(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).send("Cliente não encontrado.");
        }

        res.status(200).send("Cliente deletado com sucesso!");
    } catch (error) {
        console.error("Erro ao deletar cliente:", error);
        res.status(500).send("Erro ao deletar cliente.");
    }
});

  // Rota para buscar cliente por ID
router.get("/clientes/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const query = "SELECT * FROM clientes WHERE id = ?";
        const results = await db.query(query, [id]);

        if (results.length === 0) {
            return res.status(404).send("Cliente não encontrado.");
        }

        res.status(200).json(results[0]); // Retorna o cliente encontrado como JSON
    } catch (error) {
        console.error("Erro ao buscar cliente:", error);
        res.status(500).send("Erro ao buscar cliente.");
    }
});


module.exports = router;
