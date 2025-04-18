<?xml version="1.1" encoding="utf-8"?>
<xsl:stylesheet version="3.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns="http://www.w3.org/1999/xhtml">

    <xsl:output method="html" version="5.0" encoding="UTF-8" indent="yes"/>

    <xsl:template match="/urlset">
        <html lang="en">
            <head>
                <title>
                    Sitemap •
                    <xsl:value-of select="//url/loc[1]"/>
                </title>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
                <link rel="stylesheet" href="/xsl/styles.css"/>
                <!-- Fonts -->
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Geist+Mono" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;700" rel="stylesheet"/>
                <!-- Theme initializer -->
                <script>
                    document.addEventListener("DOMContentLoaded", () => {
                        const button = document.getElementById("theme-toggle");
                        button?.addEventListener("click", () => {
                            document.documentElement.classList.toggle("dark");
                            localStorage.setItem("theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
                        });

                        const saved = localStorage.getItem("theme");
                        if (saved === "dark") document.documentElement.classList.add("dark");
                    });
                </script>
            </head>
            <body class="bg-[var(--background)] text-[var(--foreground)] pixelify transition-colors">
                <!-- Theme toggle -->
                <button id="theme-toggle" aria-label="Theme switch" class="group fixed top-4 right-4 z-50 w-10 h-10 rounded-full border-2 border-black/20 dark:border-white/30 bg-[var(--container)] dark:bg-[var(--foreground)] flex items-center justify-center hover:scale-95 transition-all">
                    <svg aria-hidden="true" viewBox="0 0 24 24" class="w-6 h-6 fill-[var(--foreground)] dark:fill-[var(--background)] transition-colors">
                        <mask id="moon-mask">
                            <rect width="100%" height="100%" fill="white"/>
                            <circle cx="24" cy="10" r="6" fill="black" class="origin-center transition-[cx] duration-300 dark:[cx:17]"/>
                        </mask>
                        <circle cx="12" cy="12" r="6" mask="url(#moon-mask)" class="origin-center transition-transform duration-600 group-hover:scale-110 dark:scale-[1.75]"/>
                        <g class="sun-beams stroke-[var(--foreground)] stroke-2 origin-center transition-all delay-150 duration-600 group-hover:opacity-70 dark:opacity-0">
                            <line x1="12" y1="1" x2="12" y2="3"/>
                            <line x1="12" y1="21" x2="12" y2="23"/>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                            <line x1="1" y1="12" x2="3" y2="12"/>
                            <line x1="21" y1="12" x2="23" y2="12"/>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                        </g>
                    </svg>
                </button>

                <div class="max-w-3xl mx-auto px-6 py-12 space-y-8">
                    <header>
                        <h1 class="text-3xl font-bold text-[var(--accent-blue)] mb-2">Sitemap</h1>
                        <p class="text-lg text-gray-600">An overview of all available URLs on this site.</p>
                    </header>

                    <section class="grid gap-6">
                        <xsl:for-each select="url">
                            <xsl:sort select="loc"/>
                            <article class="block p-6 rounded-[2rem] border-2 border-[var(--container)] shadow-lg hover:shadow-xl transition-shadow" style="background: radial-gradient(circle at top right, rgb(224,191,81) 0%, var(--background) 50%);">
                                <a target="_blank" class="text-xl font-mono mb-1 block text-[var(--accent-blue)] hover:underline" href="{loc}">
                                    <xsl:value-of select="loc"/>
                                </a>
                                <xsl:if test="lastmod">
                                    <time class="text-sm text-gray-500">
                    Last updated: <xsl:value-of select="lastmod"/>
                                    </time>
                                </xsl:if>
                            </article>
                        </xsl:for-each>
                    </section>
                </div>
            </body>
        </html>
    </xsl:template>

</xsl:stylesheet>
