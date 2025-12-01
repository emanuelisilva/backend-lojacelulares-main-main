import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global { //Ana Luíza
  namespace Express {
    interface Request { //Ana Luíza
      usuarioId?: any;
    } //Ana Luíza
  } 
} //Ana Luíza

const SECRET = process.env.JWT_SECRET || "segredo";

// jessica ✅ Verifica token
export const verificarToken = (req: Request, res: Response, next: NextFunction) => {
   const authHeader = req.headers.authorization
    if(!authHeader)
        return res.status(401).json({mensagem:"Token não fornecido!"})
    const token = authHeader.split(" ")[1]!
    jwt.verify(token,process.env.JWT_SECRET!,(err,decoded)=>{
        if(err){
            console.log(err)
            return res.status(401).json({mensagem:"Token inválido!"})
        }
        if(typeof decoded==="string"||!decoded||!("usuarioId" in decoded))
            return res.status(401).json({mensagem:"Payload inválido!"})

        req.usuarioId = decoded.usuarioId;
        next()

    })
}


// jessica ✅ Verifica se o usuário é admin
export const verificarAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user.tipo || user.tipo !== "admin") {
        return res.status(403).json({ msg: "Acesso negado: Admin apenas" });
    }
    next();
};

