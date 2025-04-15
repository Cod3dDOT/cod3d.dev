import GithubIcon from "@/components/icons/github";
import MailIcon from "@/components/icons/mail";
import MatrixIcon from "@/components/icons/matrix";
import { SectionHeader } from "../header";
import { ContactButton, ContactLink } from "./link";

const NavContactsShowcase: React.FC = () => {
	return (
		<section className="group space-y-4">
			<SectionHeader section="Catch me" />
			<div className="flex space-x-4">
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
		</section>
	);
};

export default NavContactsShowcase;
