import GithubIcon from '../../icons/github';
import MailIcon from '../../icons/mail';
import MatrixIcon from '../../icons/matrix';
import { ContactLink } from './link';

const NavContactsShowcase: React.FC = () => {
	return (
		<div className="relative w-full h-full flex flex-col justify-end group">
			<h2 className="text-5xl mb-4">Catch Me</h2>
			<div className="flex gap-4">
				<ContactLink>
					<a href="https://github.com/cod3ddot">
						<GithubIcon
							aria-hidden="true"
							focusable="false"
							className="w-full h-full fill-foreground"
						/>
					</a>
					<span className="sr-only">Github</span>
				</ContactLink>
				<ContactLink>
					<a href="mailto:cod3ddot@proton.me">
						<MailIcon
							aria-hidden="true"
							focusable="false"
							className="w-full h-full fill-foreground"
						/>
					</a>
					<span className="sr-only">Mail</span>
				</ContactLink>
				<ContactLink>
					<a href="mailto:cod3ddot@proton.me">
						<MatrixIcon
							aria-hidden="true"
							focusable="false"
							className="w-full h-full fill-foreground"
						/>
					</a>
					<span className="sr-only">Matrix</span>
				</ContactLink>
			</div>
		</div>
	);
};

export default NavContactsShowcase;
