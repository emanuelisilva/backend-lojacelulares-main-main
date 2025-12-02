import { Router } from "express";
import ProdutoController from "../produtos/produto.controller.js";
import CarrinhoController from "../carrinho/carrinho.controller.js";


const router = Router();

// router.get("/produtos", ProdutoController.listar); // qualquer usuário
router.post("/produtos",  ProdutoController.adicionar); // admin apenas
router.put("/produtos/:id",  ProdutoController.editar); // admin apenas
router.delete("/produtos/:id", ProdutoController.excluir); // admin apenas
//excluir todo carrinho 
router.delete('/carrinho/:usuarioId', CarrinhoController.removertodo);


export default router;
