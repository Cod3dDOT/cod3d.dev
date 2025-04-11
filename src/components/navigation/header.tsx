export const SectionHeader: React.FC<{ section: string }> = ({ section }) => {
	return (
		<h2 className="relative mb-8 cursor-default overflow-hidden text-[2.83rem] leading-none transition-all hover:-skew-x-6 hover:[text-shadow:4px_4px_0px_var(--accent-blue)] sm:text-[4rem] md:text-[5.65rem] dark:hover:[text-shadow:4px_4px_0px_var(--accent-yellow)]">
			{section}
		</h2>
	);
};
