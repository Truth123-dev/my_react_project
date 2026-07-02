import { NextFunction, Request, Response } from "express";
import * as todoService from "../Services/todoService";

export async function createTodo(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authReq = req as Request & { user?: { id: string } };
    const userId = authReq.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized." });
    }

    const { title, description } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Todo title is required." });
    }

    const todo = await todoService.createTodo(userId, title, description);

    res.status(201).json({ success: true, todo });
  } catch (error) {
    next(error);
  }
}

export async function getTodos(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authReq = req as Request & { user?: { id: string } };
    const userId = authReq.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized." });
    }

    const todos = await todoService.getTodosByUser(userId);
    res.status(200).json({ success: true, todos });
  } catch (error) {
    next(error);
  }
}

export async function getTodoById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authReq = req as Request & { user?: { id: string } };
    const userId = authReq.user?.id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized." });
    }

    const todo = await todoService.getTodoById(id);

    if (!todo || todo.userId !== userId) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found." });
    }

    res.status(200).json({ success: true, todo });
  } catch (error) {
    next(error);
  }
}

export async function updateTodo(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authReq = req as Request & { user?: { id: string } };
    const userId = authReq.user?.id;
    const { id } = req.params;
    const { title, description, completed } = req.body;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized." });
    }

    const todo = await todoService.getTodoById(id);

    if (!todo || todo.userId !== userId) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found." });
    }

    const updatedTodo = await todoService.updateTodo(id, {
      title,
      description,
      completed,
    });

    res.status(200).json({ success: true, todo: updatedTodo });
  } catch (error) {
    next(error);
  }
}

export async function deleteTodo(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authReq = req as Request & { user?: { id: string } };
    const userId = authReq.user?.id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized." });
    }

    const todo = await todoService.getTodoById(id);

    if (!todo || todo.userId !== userId) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found." });
    }

    await todoService.deleteTodo(id);
    res.status(200).json({ success: true, message: "Todo deleted." });
  } catch (error) {
    next(error);
  }
}
