import { cn } from "@/lib/utils/cn";

const NotFoundPage: React.FC = () => {
	return (
		<div
			className={cn(
				"relative mx-auto flex h-screen flex-col items-center justify-center overflow-hidden text-center lg:flex-row"
			)}
		>
			<picture className="image-rendering-pixelated">
				<img
					loading="eager"
					src="/img/sad-togepi.webp"
					className="aspect-square w-[50vw] md:h-[24rem] md:w-auto xl:h-[32rem]"
					alt="Sad togepi pokemon"
				/>
			</picture>
			<h1 className="h-[1lh] text-[8rem] md:text-[18rem] xl:text-[32rem]">
				404
			</h1>
		</div>
	);
};

export default NotFoundPage;
