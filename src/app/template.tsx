export default function Template({ children }: { children: React.ReactNode }) {
	return (
		<div className="opacity-0 animate-out duration-700 fade-out-100 fill-mode-forwards">
			{children}
		</div>
	);
}
