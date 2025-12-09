import usuarioController from "../usuarios/usuario.controller.js";
import produtoController from "../produtos/produto.controller.js";
import { Router, Request, Response } from "express";
import carrinhoController from "../carrinho/carrinho.controller.js";
import Stripe from "stripe";
import { db } from "../database/banco-mongo.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);


const rotasAutenticadas = Router();

interface RequestAuth extends Request {
  usuarioId?: string;
}

// Rotas de usuários
// rotasAutenticadas.post("/usuarios", usuarioController.adicionar);

// Rotas de produtos
rotasAutenticadas.get("/produtos", produtoController.listar);

//  Rota de exclusão de produto
rotasAutenticadas.delete("/produtos/:id", produtoController.excluir);

rotasAutenticadas.post("/adicionarItem", carrinhoController.adicionarItem);

rotasAutenticadas.get("/carrinho", carrinhoController.listar);
rotasAutenticadas.delete("/carrinho/:produtoId", carrinhoController.removerItem);

rotasAutenticadas.delete("/carrinho", carrinhoController.removertodo);

//  Rota de pagamento com Stripe
rotasAutenticadas.post("/criar-pagamento-cartao", async (req: RequestAuth, res: Response) => {
  try {
    const usuarioId = req.usuarioId;
    if (!usuarioId) {
      return res.status(401).json({ mensagem: "Token não foi passado" });
    }

    // Buscar o carrinho do usuário que está no token para pegar o amount
    const carrinho = await db.collection("carrinhos").findOne({ usuarioId: usuarioId });

    if (!carrinho) {
      return res.status(404).json({ mensagem: "Carrinho não encontrado" });
    }

    // O amount aqui é em centavos, tem que fazer a conversão
    const amount = Math.round(carrinho.total*100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "brl",
      payment_method_types: ["card"],
      metadata: {
        pedido_id: carrinho._id.toString(),
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    if (err instanceof Error)
      return res.status(400).json({ mensagem: err.message });
    res.status(400).json({ mensagem: "Erro de pagamento desconhecido!" });
  }
  
});

export default rotasAutenticadas;