import { GlitchText } from "./components/glitchText";
import { Cursor } from "./components/cursor/cursor";
import { Navigation } from "./components/navigation";
import { NavProjectsShowcase } from "./components/navigation/projects";

export default function Home() {
    return (
        <>
            <Cursor clickables={[".clickable"]} showSystemCursor={false} />
            <main className="flex min-h-screen flex-col justify-center lg:px-24 px-16">
                <h1 className="lg:mb-8 md:mb-6 mb-4">cod3d.dev</h1>
                <p className=" whitespace-pre">
                    <span>Probably trying to hack you. </span>
                    <br className="sm:hidden" />
                    <span>Or sleeping.</span>
                </p>
                <GlitchText text="Or both." />
                <Navigation>
                    <NavProjectsShowcase />
                </Navigation>
            </main>
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute left-1/2 top-1/2">
                    <div className="absolute blur-3xl bg-sky-600 h-96 w-96 rounded-full animate-spin [animation-duration:18s] origin-top-right" />
                    <div className="absolute blur-3xl bg-yellow-300 h-96 w-96 rounded-full animate-spin [animation-duration:18s] [animation-delay:-9s] origin-top-right" />
                </div>
                <svg className="absolute">
                    <filter id="noiseFilter">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.6"
                            stitchTiles="stitch"
                        />
                        <feColorMatrix
                            in="colorNoise"
                            type="matrix"
                            values="1.0 0.3 0.3 0.0 0.0
                        0.3 1.0 0.3 0.0 0.0
                        0.3 0.3 1.0 0.0 0.0
                        0.0 0.0 0.0 0.15 0.0"
                        />
                        <feComposite
                            operator="in"
                            in2="SourceGraphic"
                            result="monoNoise"
                        />
                        <feBlend
                            in="SourceGraphic"
                            in2="monoNoise"
                            mode="screen"
                        />
                    </filter>
                </svg>
            </div>
        </>
    );
}
