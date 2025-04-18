import GithubIcon from "@/components/icons/github";
import MailIcon from "@/components/icons/mail";
import MatrixIcon from "@/components/icons/matrix";
import { SectionHeader } from "../header";
import { ContactButton, ContactLink } from "./link";

const NavContactsShowcase: React.FC = () => {
	return (
		<section className="group relative space-y-4">
			<SectionHeader section="Catch me" />
			<div className="flex flex-wrap gap-2 md:gap-4">
				<ContactLink href="https://github.com/cod3ddot" text="GitHub">
					<GithubIcon
						aria-hidden="true"
						focusable="false"
						className="aspect-square h-full fill-foreground"
					/>
				</ContactLink>
				<ContactLink
					href="/"
					text="Mail"
					protectedBytes={[
						0, 0, 0, 0, 0, 110, 7, 10, 18, 51, 100, 46, 100, 101, 118
					]}
				>
					<MailIcon
						aria-hidden="true"
						focusable="false"
						className="aspect-square h-full fill-foreground"
					/>
				</ContactLink>
				<ContactButton text="Matrix" copy="@cod3ddot:matrix.org">
					<MatrixIcon
						aria-hidden="true"
						focusable="false"
						className="aspect-square h-full fill-foreground"
					/>
				</ContactButton>
			</div>
			<img
				loading="lazy"
				className="image-rendering-pixelated md:-translate-y-1/2 absolute top-0 right-0 aspect-square w-1/2 translate-x-1/2 md:top-full"
				src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA/BAMAAAClcQ3sAAAAJ1BMVEUAAAAAAAAAAACAgICFhYX///////+gev/h4feHh8QAAABeSJb6+v9tQX7FAAAAB3RSTlMA881IGQkfxnrzFAAAAb9JREFUSMeV1T2O2zAQBWAiQRp1uUKOlSq3oGFt71HgA4isVCwg6e0BFjAv4IKH2hG51pAe04t9jWHPp8fxH2TKdNgyGZV9PFtrj8DjOU9veUR+dbbIUZ/TzSXow6TOty8xkoh9V7n+5UqnsgN3IMYr2SI1mLfridQaJaB8gKQEsAdSoL/s4q9lwFvGGoRdgAG/Eq91RwLyGXEBne4rMkCe0+E5OJws2ToCblHgNa3QBiEB+Fqo72N5Ai4JDJibYOIVaABaO4QMPFccAcwagE8g8sBxocF5DS4JOGAhzlBX9BuYNjB4BjESoS7YkgBX8JyFn6sCAYRzJIpc1QLLmWgTJQgVIAX6B+BMbi4KNKCrvNH+ISAB4QsQWgDvMi/B/zEDj7fAJJSgS2AdcwEnlLkYBlnkgpS3ooDBmIHbCgZfgfzfWnIFnPNEm5BzAAFEwJIfJBmsVMX5e9CNTbF6AaVw7nPuvNGAMzBJ8xYgd8uUwEq6IocLknCtBtyAG1WBnCBAFfh/Jue3CL2iBk4DA36m595IVvdZ4oqgAFidCibzTHiZN4C6qdVzfWP8+acCk1HgR2NBCYB9QdOI/BC/kQ8Rjmu3Dz8t9QAAAABJRU5ErkJggg=="
				alt="pokeball"
			/>
		</section>
	);
};

export default NavContactsShowcase;
