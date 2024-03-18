import { GlitchText } from "./components/glitchText";

export default function Home() {
    return (
        <main className="flex h-screen flex-col justify-center lg:px-24 px-16">
            <h1 className="lg:mb-8 md:mb-6 mb-4">cod3d.dev</h1>
            <p className=" whitespace-pre">
                <span>Probably trying to hack you. </span>
                <br className="sm:hidden" />
                <span>Or sleeping.</span>
            </p>
            <GlitchText as="p" text="Or both." />
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute left-1/2 top-1/2">
                    <div className="absolute blur-3xl bg-sky-600 h-96 w-96 rounded-full animate-spin [animation-duration:18s] origin-top-right" />
                    <div className="absolute blur-3xl bg-yellow-300 h-96 w-96 rounded-full animate-spin [animation-duration:18s] [animation-delay:-9s] origin-top-right" />
                </div>
            </div>
        </main>
    );
}
