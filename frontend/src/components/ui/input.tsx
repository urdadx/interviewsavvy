import * as React from "react";

import { cn } from "../../lib/utils";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					"flex grow rounded-lg border px-4 py-2 text-sm leading-6 shadow-wg-xs transition-colors duration-100 placeholder:text-surface-500",
					"outline-primary focus:outline focus:outline-2 focus:-outline-offset-1",
					!props.disabled &&
						"bg-background text-surface-900 hover:border-surface-300 dark:hover:border-surface-200",
					props.disabled &&
						"cursor-not-allowed bg-surface-50 text-surface-300 placeholder:text-surface-300 dark:bg-white/5 dark:text-surface-200 dark:placeholder:text-surface-200",

					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = "Input";

export { Input };
