import GithubIcon from "../../icons/github";
import MailIcon from "../../icons/mail";
import MatrixIcon from "../../icons/matrix";

const NavContactsShowcase: React.FC = async () => {
    return (
        <div className="mt-auto">
            <h2 className="text-5xl mb-4">Catch Me</h2>
            <div className="flex">
                <a
                    href="https://github.com/cod3ddot"
                    className="pr-4 cursor-height"
                >
                    <GithubIcon className="w-12 h-12 fill-[var(--foreground)]" />
                </a>
                <a
                    href="mailto:cod3ddot@proton.me"
                    className="px-4 cursor-height"
                >
                    <MailIcon className="w-12 h-12 fill-[var(--foreground)]" />
                </a>
                <a
                    href="mailto:cod3ddot@proton.me"
                    className="pl-4 cursor-height"
                >
                    <MatrixIcon className="w-12 h-12 fill-[var(--foreground)]" />
                </a>
            </div>
        </div>
    );
};

export default NavContactsShowcase;
