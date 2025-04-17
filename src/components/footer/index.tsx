import { Suspense } from "react";

import { getRandomPokemon } from "@/lib/utils/poke";
import { PrintFooter } from "./printFooter";
import { cn } from "@/lib/utils/cn";

const _Footer: React.FC = () => {
    const pokemon = getRandomPokemon();

    return (
        <>
            <footer className="bg-background px-10 py-8 md:px-20">
                <div className="container mx-auto flex justify-between xl:max-w-full">
                    <p>
                        <span>cod3d.dev</span>
                        <span> @ 2024</span>
                    </p>
                    <p>Made with ☕</p>
                </div>
            </footer>

            <PrintFooter />
            <aside className="-z-10 parallax-footer relative flex h-[50vh] w-full items-center overflow-clip bg-container px-12 md:px-24 print:hidden">
                <div>
                    <div
                        className={cn(
                            "text-justify font-medium text-6xl md:text-[10vw]",
                            "bg-gradient-to-br from-[var(--c)] via-[var(--c)] bg-clip-text text-transparent",
                            "selection:text-foreground",
                            pokemon.class
                        )}
                    >
                        {pokemon.name}
                    </div>

                    <p className="mt-4 md:w-[50vw] xl:text-xl">
                        {pokemon.description}
                    </p>
                </div>
                <picture
                    className={cn(
                        "-z-10 -translate-1/2 absolute top-1/2 left-1/2 aspect-square h-full opacity-20",
                        "xl:-translate-x-1/4 xl:right-0 xl:left-auto xl:opacity-100"
                    )}
                >
                    <img
                        loading="lazy"
                        src={pokemon.sprite}
                        alt={pokemon.name}
                        width={96}
                        height={96}
                        className="image-rendering-pixelated h-full w-full object-contain"
                    />
                </picture>
            </aside>
        </>
    );
};

export const Footer: React.FC = () => {
    return (
        <Suspense>
            <_Footer />
        </Suspense>
    );
};
