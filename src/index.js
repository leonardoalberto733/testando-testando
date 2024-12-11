const express = require("express");
const db = require("../DB/db");
const routes = require("../routes");
const app = express();
const port = 3000;
const cors = require("cors");

db.testConnection().catch((err) => {
  console.error(
    "Não foi possível conectar ao banco de dados. Encerrando o aplicativo."
  );
  process.exit(1);
});

app.use(express.json()); // Middleware para lidar com JSON
app.use(express.urlencoded({ extended: true })); // Middleware para lidar com dados de formulários

app.use(cors());
app.use(routes); // As rotas estão sendo corretamente importadas e usadas

app.listen(port, () => {
  console.log(`Servidor rodando em: http://localhost:${port}`);
});
