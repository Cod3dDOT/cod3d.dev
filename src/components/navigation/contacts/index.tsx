import GithubIcon from '../../icons/github';
import MailIcon from '../../icons/mail';
import MatrixIcon from '../../icons/matrix';
import { ContactButton, ContactLink } from './link';

const NavContactsShowcase: React.FC = () => {
	return (
		<div className="group space-y-4">
			<h2>Catch Me</h2>
			<div className="flex gap-4">
				<ContactLink href="https://github.com/cod3ddot" text="GitHub">
					<GithubIcon
						aria-hidden="true"
						focusable="false"
						className="w-full h-full fill-foreground"
					/>
				</ContactLink>
				<ContactLink href="mailto:dot@cod3d.dev" text="Mail">
					<MailIcon
						aria-hidden="true"
						focusable="false"
						className="w-full h-full fill-foreground"
					/>
				</ContactLink>
				<ContactButton text="Matrix" copy="matrix.org:@cod3ddot:matrix.org">
					<MatrixIcon
						aria-hidden="true"
						focusable="false"
						className="w-full h-full fill-foreground"
					/>
				</ContactButton>
			</div>
		</div>
	);
};

export default NavContactsShowcase;
