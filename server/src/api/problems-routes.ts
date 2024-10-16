import { Router } from "express";
import { prisma } from "../config/db";
import createHttpError from "http-errors";

export const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const page = Number.parseInt(req.query.page as string) || 2;
    const perPage = Number.parseInt(req.query.perPage as string) || 30;
    const offset = (page - 1) * perPage;

    const problems = await prisma.problemSet.findMany({
      skip: offset,
      take: perPage,
      select: {
        id: true,
        name: true,
        slug: true,
        questionId: true,
        difficulty: true,
        description: true,
        createdAt: true,
      },
    });

    const totalProblems = await prisma.problemSet.count();

    res.status(200).json({
      data: problems,
      meta: {
        page,
        perPage,
        total: totalProblems,
        totalPages: Math.ceil(totalProblems / perPage),
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:problemId", async (req, res, next) => {
  try {
    const { problemId } = req.params;

    const problem = await prisma.problemSet.findFirst({
      where: {
        OR: [{ id: problemId }, { slug: problemId }],
      },
      select: {
        id: true,
        name: true,
        slug: true,
        questionId: true,
        difficulty: true,
        description: true,
        createdAt: true,
        codeStub: true,
      },
    });

    if (!problem) {
      throw createHttpError(404, "Problem with id given not found");
    }

    res.status(200).json({ ...problem });
  } catch (error) {
    next(error);
  }
});
