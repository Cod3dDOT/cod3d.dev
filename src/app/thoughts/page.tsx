import { clsx } from 'clsx';
import { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import { Footer } from '@/components/footer';

export const metadata: Metadata = {
	title: "cod3d's thoughts",
	description: 'Probably trying to hack you. Or sleeping. Or both.',
	creator: 'cod3d',
	keywords: 'blog, projects, coding',
	robots: 'index, nofollow'
};

const font = Roboto({
	subsets: ['latin'],
	weight: ['100', '300', '400', '500', '700', '900'],
	display: 'swap',
	variable: '--font-roboto'
});

const Thoughts: React.FC = () => {
	return (
		<div className={clsx(font.variable, 'font-roboto overflow-hidden')}>
			<div className="container mx-auto sm:py-64 py-24 sm:px-16 px-12">
				<h1 className="lg:text-6xl md:text-4xl text-2xl">
					Archiving thoughts
					<br />
					<span
						className="text-[smaller] lg:text-background
                lg:[text-shadow:-1px_-1px_0_var(--foreground),1px_-1px_0_var(--foreground),-1px_1px_0_var(--foreground),1px_1px_0_var(--foreground)]"
					>
						so that my brain doesn&apos;t have to...
					</span>
				</h1>

				<div className="sm:mt-48 mt-24 space-y-16">
					<div className="w-full xl:space-y-8">
						<div className="relative py-16">
							<h2 className="lg:text-9xl md:text-6xl text-4xl leading-relaxed">
								2024
							</h2>
							<p>We will see what I write here</p>
							<div
								className="-z-10 absolute inset-0 -inset-x-1/2 opacity-50 overflow-hidden
                                [background-image:repeating-radial-gradient(circle_at_0_0,transparent_0,var(--background)_11px),repeating-linear-gradient(#e34b1b55,#e34b1b)]"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 48 48"
									className="absolute right-1/3 top-1/2 h-[50rem] -translate-y-1/2"
								>
									<path d="M46.125,38.868c-0.192-0.815-0.481-1.618-0.919-2.346c-0.871-1.466-2.199-2.585-3.594-3.489  c-1.409-0.901-2.916-1.624-4.458-2.219c-2.953-1.141-2.81-1.103-4.803-1.814c-4.416-1.574-6.868-3.914-7.022-6.452  c-0.074-1.229,1.126-5.234,6.074-4.282c1.175,0.226,2.287,0.543,3.382,1.037c1.009,0.456,3.954,1.884,4.986,3.917v0  c0.078,0.897,0.394,1.244,1.656,1.84c0.949,0.448,1.907,0.935,1.993,2.039c0.005,0.06,0.051,0.109,0.131,0.121  c0.052,0,0.1-0.031,0.121-0.081c0.182-0.439,0.915-0.989,1.461-0.839c0.063,0.016,0.119-0.009,0.148-0.061  c0.03-0.052,0.02-0.116-0.021-0.158l-0.863-0.854c-0.311-0.31-0.651-0.721-0.939-1.249c-0.078-0.142-0.145-0.282-0.204-0.417  c-0.038-0.094-0.076-0.187-0.114-0.281c-0.724-1.895-2.073-3.925-3.465-5.24c-0.756-0.727-1.588-1.367-2.475-1.913  c-0.891-0.538-1.819-1.016-2.833-1.302l-0.074,0.256c0.947,0.327,1.833,0.849,2.662,1.419c0.828,0.579,1.593,1.243,2.273,1.979  c0.971,1.032,1.736,2.23,2.282,3.512l-1.993-2.477l0.055,0.858l-1.633-1.841l0.101,0.862l-1.586-1.279l0.136,0.584  c-0.357-0.236-3.525-1.496-5.106-2.09s-4.705-3.524-3.804-7.232c0,0-1.477-0.574-2.535-0.965c-1.043-0.376-2.09-0.717-3.14-1.046  c-2.1-0.658-4.212-1.258-6.335-1.818c-2.123-0.557-4.26-1.062-6.409-1.508c-2.15-0.441-4.312-0.834-6.5-1.053L2.722,3.319  C4.875,3.65,7,4.152,9.109,4.701c2.108,0.555,4.202,1.166,6.279,1.829c2.076,0.665,4.139,1.37,6.177,2.128  c1.018,0.379,2.033,0.769,3.027,1.188c0.211,0.088,0.426,0.18,0.641,0.272c-1.224-0.241-2.448-0.432-3.673-0.591  c-2.211-0.281-4.424-0.458-6.639-0.558c-2.214-0.1-4.43-0.116-6.642-0.034C6.068,9.021,3.856,9.194,1.674,9.568l0.043,0.304  c2.18-0.224,4.375-0.246,6.563-0.183c2.189,0.067,4.374,0.231,6.547,0.477c2.172,0.246,4.335,0.567,6.469,0.986  c1.316,0.261,2.624,0.564,3.903,0.921c-1.011-0.101-2.017-0.127-3.014-0.115c-1.977,0.03-3.926,0.247-5.848,0.574  c-1.922,0.33-3.818,0.773-5.675,1.346c-1.851,0.579-3.681,1.267-5.361,2.249l0.116,0.208c1.72-0.828,3.568-1.358,5.426-1.779  c1.862-0.414,3.751-0.698,5.644-0.868c1.891-0.168,3.792-0.224,5.663-0.101c1.664,0.11,3.317,0.363,4.83,0.849c0,0,0,0,0,0  c0.065,0.445,0.366,1.346,0.511,1.796c0,0,0,0,0,0c-4.255,1.957-4.794,5.477-4.446,7.365c0.409,2.214,2.011,3.902,3.904,4.995  c1.567,0.891,3.168,1.459,4.726,2.047c1.555,0.583,3.095,1.143,4.467,1.918c1.352,0.747,2.476,1.901,3.391,3.21  c1.837,2.638,2.572,5.964,2.792,9.245l0.365-0.01c0.008-3.323-0.47-6.802-2.252-9.812c-0.588-0.986-1.314-1.921-2.171-2.733  c0.992,0.384,1.961,0.818,2.887,1.333c1.373,0.779,2.667,1.749,3.548,3.051c0.444,0.647,0.755,1.375,0.983,2.133  c0.202,0.767,0.295,1.565,0.329,2.371h0.312C46.337,40.522,46.291,39.69,46.125,38.868z" />
								</svg>
							</div>
						</div>
						<div>
							<div className="py-4 border-b-2">
								<p>this is a name of a thought</p>
							</div>
							<div className="py-4 border-b-2">
								<p>this is a name of a thought</p>
							</div>
							<div className="py-4 border-b-2">
								<p>this is a name of a thought</p>
							</div>
							<div className="py-4 border-b-2">
								<p>this is a name of a thought</p>
							</div>
						</div>
					</div>
					<div className="w-full xl:space-y-8">
						<div className="relative py-8">
							<h2 className="leading-relaxed">2023</h2>
							<p>Those who sacrifice liberty for security deserve neither.</p>
						</div>
						<div>
							<div className="py-4 border-b-2">
								<p>this is a name of a thought</p>
							</div>
							<div className="py-4 border-b-2">
								<p>this is a name of a thought</p>
							</div>
							<div className="py-4 border-b-2">
								<p>this is a name of a thought</p>
							</div>
							<div className="py-4 border-b-2">
								<p>this is a name of a thought</p>
							</div>
						</div>
					</div>
					<div>
						<h2>2022</h2>
						<p>Winning is a curse.</p>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Thoughts;
