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
						<GithubIcon className="w-full h-full fill-foreground" />
					</a>
				</ContactLink>
				<ContactLink>
					<a href="mailto:cod3ddot@proton.me">
						<MailIcon className="w-full h-full fill-foreground" />
					</a>
				</ContactLink>
				<ContactLink>
					<a href="mailto:cod3ddot@proton.me">
						<MatrixIcon className="w-full h-full fill-foreground" />
					</a>
				</ContactLink>
			</div>
		</div>
	);
};

export default NavContactsShowcase;
