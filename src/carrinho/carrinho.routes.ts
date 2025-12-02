// import express from "express";
// import Carrinho from "../models/carrinho.model.js"; //jessica; Ana Luíza
// import Produto from "../models/produto.model.js"; //Ana Luíza
// import { verificarToken } from "../middleware/auth.js"; //jessica; Ana Luíza
// const { auth, requireAdmin } = require("../middleware/auth");


// const router = express.Router();

// // Alterar quantidade de item no carrinho //jessica
// router.put("/carrinho/:produtoId", verificarToken, async (req, res) => {
//   try {
//     const userId = (req as any).user.id; //jessica

//     const { produtoId } = req.params; //jessica
//     const { quantidade } = req.body; //jessica

//     const carrinho = await Carrinho.findOne({ usuario: userId }); //jessica
//     if (!carrinho) return res.status(404).json({ message: "Carrinho não encontrado" }); //jessica

//     const item = carrinho.itens.find(i => i.produto.toString() === produtoId); //jessica
//     if (!item) return res.status(404).json({ message: "Item não encontrado no carrinho" }); //jessica

//     item.quantidade = quantidade; //jessica
//     await carrinho.save(); //jessica

//     res.status(200).json({ message: "Quantidade atualizada com sucesso", carrinho }); //jessica
//   } catch (error) {
//     console.error(error); //jessica
//     res.status(500).json({ message: "Erro ao atualizar quantidade", error }); //jessica
//   }
// });

// //Remover item do carrinho
// // router.delete("/carrinho/:produtoId", async (req, res) => { //Ana Luíza 
// //   try {
// //     const userId = (req as any).usuarioId ;
// //     const { produtoId } = req.params; //Ana Luíza 

// //     const carrinho = await Carrinho.findOne({ usuario: userId }); //Ana Luíza 
// //     if (!carrinho)
// //       return res.status(404).json({ msg: "Carrinho não encontrado." }); //Ana Luíza 

// //     carrinho.itens = carrinho.itens.filter( //Ana Luíza 
// //       (item) => item.produto.toString() !== produtoId
// //     ) as any; //Ana Luíza 

// //     await carrinho.save(); //Ana Luíza 

// //     res.json({ msg: "Item removido com sucesso.", carrinho }); //Ana Luíza 
// //   } catch (err) {
// //     console.error(err); //Ana Luíza 
// //     res.status(500).json({ msg: "Erro ao remover item." }); //Ana Luíza 
// //   }
// // }); //Ana Luíza 

// //Exibir o total atualizado do carrinho
// router.get("/carrinho", verificarToken, async (req, res) => { //Ana Luíza
//   try {
//     const userId = (req as any).user.id; //Ana Luíza 

//     const carrinho = await Carrinho.findOne({ usuario: userId }); //Ana Luíza 
//     if (!carrinho)
//       return res.status(404).json({ msg: "Carrinho vazio" }); //Ana Luíza 

//     const produtosIds = carrinho.itens.map(item => item.produto); //Ana Luíza 

//     const produtos = await Produto.find({ //Ana Luíza 
//       _id: { $in: produtosIds }
//     });

//     const total = carrinho.itens.reduce((soma, item) => { //Ana Luíza 
//       const produtoInfo = produtos.find(
//         (p: any) => p._id.toString() === item.produto.toString() //Ana Luíza 
//       );

//       const preco = produtoInfo?.preco || 0; //Ana Luíza 

//       return soma + preco * item.quantidade; //Ana Luíza 
//     }, 0);

//     res.json({ carrinho, total }); //Ana Luíza 

//   } catch (err) { //Ana Luíza 
//     console.error(err);
//     res.status(500).json({ msg: "Erro ao buscar carrinho" }); //Ana Luíza 
//   }
// }); //Ana Luíza 

// ////////////// jessica
// router.delete("/cart", auth, async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const cart = await Carrinho.findOne({ userId });
//     if (!cart) {
//       return res.json({ message: "Carrinho já estava vazio." });
//     }

//     // limpa o array do jeito correto
//     cart.itens.splice(0, cart.itens.length);

//     await cart.save();

//     res.json({ message: "Carrinho apagado com sucesso!" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Erro ao limpar o carrinho." });
//   }
// });





// export default router; //jessica 


