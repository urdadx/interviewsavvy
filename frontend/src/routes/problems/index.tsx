import { Button } from "@lemonsqueezy/wedges";
import { createFileRoute } from "@tanstack/react-router";
import {
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { Checkbox } from "../../components/ui/checkbox";

import { Input } from "../../components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../components/ui/table";

export const Route = createFileRoute("/problems/")({
	component: Problems,
});

type Problem = {
	id: number;
	title: string;
	difficulty: "Easy" | "Medium" | "Hard";
	topics: string[];
	status: boolean;
	description: string;
};

const data: Problem[] = [
	{
		id: 1,
		title: "Two Sum",
		difficulty: "Easy",
		topics: ["Arrays", "Hash Table"],
		status: true,
		description: "Find two numbers in an array that add up to a target",
	},
	{
		id: 2,
		title: "Valid Parentheses",
		difficulty: "Easy",
		topics: ["Stack", "Strings"],
		status: true,
		description: "Check if string has valid parentheses matching",
	},
	{
		id: 3,
		title: "Merge K Sorted Lists",
		difficulty: "Hard",
		topics: ["Linked List", "Divide & Conquer", "Heap"],
		status: false,
		description: "Merge k sorted linked lists into one sorted list",
	},
	{
		id: 4,
		title: "Longest Palindromic Substring",
		difficulty: "Medium",
		topics: ["Strings", "Dynamic Programming"],
		status: false,
		description: "Find the longest palindromic substring in a string",
	},
	{
		id: 5,
		title: "Binary Tree Level Order Traversal",
		difficulty: "Medium",
		topics: ["Trees", "BFS"],
		status: true,
		description: "Traverse binary tree in level order",
	},
	{
		id: 6,
		title: "Maximum Subarray",
		difficulty: "Easy",
		topics: ["Arrays", "Dynamic Programming"],
		status: true,
		description: "Find contiguous subarray with largest sum",
	},
	{
		id: 7,
		title: "Course Schedule",
		difficulty: "Medium",
		topics: ["Graph", "DFS", "BFS"],
		status: false,
		description: "Determine if you can finish all courses",
	},
	{
		id: 8,
		title: "Trapping Rain Water",
		difficulty: "Hard",
		topics: ["Arrays", "Two Pointers", "Stack"],
		status: false,
		description: "Calculate how much water can be trapped between bars",
	},
	{
		id: 9,
		title: "LRU Cache",
		difficulty: "Medium",
		topics: ["Hash Table", "Linked List", "Design"],
		status: true,
		description: "Design and implement a Least Recently Used cache",
	},
	{
		id: 10,
		title: "Word Break",
		difficulty: "Medium",
		topics: ["Dynamic Programming", "Trie"],
		status: false,
		description: "Determine if string can be segmented into dictionary words",
	},
];

const columns: ColumnDef<Problem>[] = [
	{
		id: "select",
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (
			<Checkbox
				className="rounded-full"
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "title",
		header: "Title",
	},
	{
		accessorKey: "difficulty",
		header: "Difficulty",
		cell: ({ row }) => {
			const difficulty = row.getValue("difficulty") as string;
			const colorClass =
				difficulty === "Easy"
					? "text-green-600"
					: difficulty === "Medium"
						? "text-yellow-600"
						: "text-red-600";

			return <div className={`font-medium ${colorClass}`}>{difficulty}</div>;
		},
	},
	{
		accessorKey: "topics",
		header: "Topics",
		cell: ({ row }) => {
			const topics = row.getValue("topics") as string[];
			return (
				<div className="flex flex-wrap gap-1">
					{topics.map((topic) => (
						<span
							key={topic}
							className="px-2 py-1 text-xs bg-gray-100 rounded-full"
						>
							{topic}
						</span>
					))}
				</div>
			);
		},
	},
];

export function Problems() {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		state: {
			sorting,
			columnFilters,
		},
	});

	return (
		<div className="w-full max-w-4xl mx-auto">
			<div className="flex items-center py-4">
				<Input
					placeholder="Filter titles..."
					value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("title")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
			</div>
			<div className="rounded-lg border">
				<Table>
					<TableHeader className="bg-slate-50 rounded-md">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									className={row.index % 2 === 0 ? "" : "bg-slate-50"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Previous
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Next
				</Button>
			</div>
		</div>
	);
}
