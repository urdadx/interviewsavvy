import express, { type Request, type Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("<span>server is working</span>");
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`listening on port ${process.env.PORT || 8000}`);
});
