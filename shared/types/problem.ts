export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

// export type Problem = {
//   id: string;
//   name: string;
//   slug: string;
//   description: string;
//   solution?: string;
//   codeStub?: string;
//   solutionArticle?: string;
//   hasSolved?: boolean;
//   difficulty: "EASY" | "MEDIUM" | "HARD" | any;
//   questionId: number;
//   createdAt: string;
//   updatedAt?: string;
// };

export type Problem = {
  id: string;
  name: string;
  slug: string;
  description: string;
  questionId: number;
  createdAt: Date;
};
