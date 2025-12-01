import usuarioController from "../usuarios/usuario.controller.js";
import produtoController from "../produtos/produto.controller.js";
import { Router } from "express";
import carrinhoController from "../carrinho/carrinho.controller.js"; //importando o carrinho controller

const rotasAutenticadas = Router();

// Rotas de usuários
rotasAutenticadas.post("/usuarios", usuarioController.adicionar);
rotasAutenticadas.get("/usuarios", usuarioController.listar);

// Rotas de produtos
rotasAutenticadas.post("/produtos", produtoController.adicionar);
rotasAutenticadas.get("/produtos", produtoController.listar);

// 🆕 Rota de exclusão de produto
rotasAutenticadas.delete("/produtos/:id", produtoController.excluir);

rotasAutenticadas.post("/adicionarItem", carrinhoController.adicionarItem);

rotasAutenticadas.get("/carrinho", carrinhoController.listar);
export default rotasAutenticadas;
