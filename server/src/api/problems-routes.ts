import { Router } from "express";
import { prisma } from "../config/db";
import createHttpError from "http-errors";
import type {
  ApiResponse,
  ApiResponsePaginated,
} from "@shared/types/api-response";
import type { Problem } from "@shared/types/problem";

export const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const page = Number.parseInt(req.query.page as string) || 2;
    const pageSize = Number.parseInt(req.query.pageSize as string) || 30;
    const offset = (page - 1) * pageSize;

    const problems = await prisma.problemSet.findMany({
      skip: offset,
      take: pageSize,
      select: {
        id: true,
        name: true,
        slug: true,
        questionId: true,
        description: true,
        createdAt: true,
      },
    });

    const totalProblems = await prisma.problemSet.count();

    const response: ApiResponsePaginated<Problem> = {
      data: problems,
      meta: {
        page,
        pageSize,
        total: totalProblems,
        totalPages: Math.ceil(totalProblems / pageSize),
      },
    };

    res.status(200).json(response);
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

    const response: ApiResponse<Problem> = problem;

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});
