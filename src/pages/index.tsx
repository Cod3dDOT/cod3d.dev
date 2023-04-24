import { type NextPage } from 'next';
import { CodeBackground } from '~/components/code-background';

const Home: NextPage = () => {
	return (
		<>
			<div className="absolute">
				<CodeBackground />
			</div>
			<div className="h-screen w-full flex">
				<div className="self-center mx-auto text-8xl font-mono font-black text-neutral-500">
					<span>Hello there!</span>
					<br />
					<span className="ml-36">The name&apos;s </span>
					<span className="text-yellow-400">cod3d(.)</span>
				</div>
			</div>
		</>
	);
};

export default Home;
