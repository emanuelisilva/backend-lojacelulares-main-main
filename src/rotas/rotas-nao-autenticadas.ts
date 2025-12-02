
import { Router } from "express";
import usuarioController from "../usuarios/usuario.controller.js"; // ajuste se necessário

const rotasNaoAutenticadas = Router();

// Rota de login
rotasNaoAutenticadas.post('/login', usuarioController.login);


rotasNaoAutenticadas.post("/usuarios", usuarioController.adicionar);

// Rota de teste sem autenticação
rotasNaoAutenticadas.get('/b2', (req, res) => {
  res.send("Rota B2 funcionando sem token!");
});

export default rotasNaoAutenticadas;
