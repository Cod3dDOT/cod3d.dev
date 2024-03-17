import GithubIcon from "../../icons/github";
import MailIcon from "../../icons/mail";
import MatrixIcon from "../../icons/matrix";

const NavContactsShowcase: React.FC = async () => {
    return (
        <div className="mt-auto">
            <h2 className="text-5xl mb-4">Catch Me</h2>
            <div className="flex gap-8">
                <a href="https://github.com/cod3ddot">
                    <GithubIcon className="w-12 h-12 cursor fill-[var(--foreground)]" />
                </a>
                <a href="mailto:cod3ddot@proton.me">
                    <MailIcon className="w-12 h-12 cursor fill-[var(--foreground)]" />
                </a>
                <a href="mailto:cod3ddot@proton.me">
                    <MatrixIcon className="w-12 h-12 cursor fill-[var(--foreground)]" />
                </a>
            </div>
        </div>
    );
};

export default NavContactsShowcase;
