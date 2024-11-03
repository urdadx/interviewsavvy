export declare enum Difficulty {
    EASY = "EASY",
    MEDIUM = "MEDIUM",
    HARD = "HARD"
}
export type Problem = {
    id: string;
    name: string;
    slug: string;
    description: string;
    questionId: number;
    createdAt: Date;
};
