

import { Request , Response } from "express";
import { chatWithAI } from "../Services/ai.service";

export async function chat(req: Request , res: Response ) {
    try {
       const { message } = req.body;

       const reply = await chatWithAI(message);

       res.status(200).json({
        success: true,
        reply,
       });
} catch ( error ) {
    console.error("Chat error:", error);
    res.status(500).json({
        success: false,
        message: "something went wrong.",
    });
}
}