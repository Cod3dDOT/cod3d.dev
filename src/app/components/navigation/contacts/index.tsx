import GithubIcon from '../../icons/github';
import MailIcon from '../../icons/mail';
import MatrixIcon from '../../icons/matrix';

const NavContactsShowcase = async () => {
	return (
		<div className="w-full h-full flex flex-col justify-end">
			<h2 className="text-5xl mb-4">Catch Me</h2>
			<div className="flex">
				<a href="https://github.com/cod3ddot" className="pr-4 cursor">
					<GithubIcon className="w-12 h-12 fill-[var(--foreground)]" />
				</a>
				<a href="mailto:cod3ddot@proton.me" className="px-4 cursor">
					<MailIcon className="w-12 h-12 fill-[var(--foreground)]" />
				</a>
				<a href="mailto:cod3ddot@proton.me" className="pl-4 cursor">
					<MatrixIcon className="w-12 h-12 fill-[var(--foreground)]" />
				</a>
			</div>
		</div>
	);
};

export default NavContactsShowcase;
