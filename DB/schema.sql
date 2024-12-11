DROP DATABASE IF EXISTS xique;
CREATE DATABASE xique;
USE xique;


CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(200),
    email VARCHAR(200) UNIQUE,
    telefone VARCHAR(11),
    cpf VARCHAR(11),
    endereco VARCHAR(200),
    dataNasc date);
    

SHOW TABLES;
DESCRIBE clientes;


SELECT * FROM clientes;