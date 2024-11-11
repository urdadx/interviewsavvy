import * as fs from "node:fs";
import { PrismaClient } from "@prisma/client";

type Problem = {
	id: number;
	title: string;
	content: string;
	followup: string | null;
	python_code: string;
	analysis: string;
	annotated_code: string;
	user_content: string;
	system_content: string;
	text: string;
	test_case_system_prompt: string;
	test_case_user_prompt: string;
	test_cases: string;
	Difficulty: string;
};

let data: Problem[];
const prisma = new PrismaClient();

try {
	data = JSON.parse(fs.readFileSync("./data/q_dump.json", "utf-8"));
} catch (error) {
	throw new Error("Error reading file");
}

async function seed() {
	for (const item of data) {
		await prisma.problemSet.create({
			data: {
				name: item.title,
				slug: generateSlug(item.title),
				description: item.content,
				difficulty: item.Difficulty.toUpperCase() as "EASY" | "MEDIUM" | "HARD",
				codeStub: "",
				solution: "",
			},
		});
	}

	console.log("Seeding completed!");
}

function generateSlug(title: string): string {
	return title
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^\w\-]+/g, "");
}

seed()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
