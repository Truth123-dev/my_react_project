import { Router } from "express";

const router = Router();

const users = [
  {
    id: 1,
    name: "John",
    email: "john@gmail.com",
  },

  {
    id: 2,
    name: "Joe",
    email: "joe@gmail.com",
  },

  {
    id: 3,
    name: "Joel",
    email: "joel@gmail.com",
  },

  {
    id: 4,
    name: "reo",
    email: "roe@gmail.com",
  },

  {
    id: 5,
    name: "peer",
    email: "peer@gmail.com",
  },
];

router.get("/", (_req, res) => {
  res.json(users);
});
export default router;
