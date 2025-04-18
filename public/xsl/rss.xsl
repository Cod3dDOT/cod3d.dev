<?xml version="1.1" encoding="utf-8"?>
<xsl:stylesheet version="3.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:atom="http://www.w3.org/2005/Atom">

    <xsl:output method="html" version="5.0" encoding="UTF-8" indent="yes" />

    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
            <head>
                <title>
                    RSS •
                    <xsl:value-of select="/rss/channel/title" />
                </title>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
                <link rel="stylesheet" href="/xsl/styles.css" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Geist+Mono" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Geist" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700" rel="stylesheet" />

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
            <body class="bg-[var(--background)] text-[var(--foreground)] geist transition-colors">
                <div class="max-w-3xl w-full mx-auto px-6 py-10 space-y-12">
                    <nav class="p-4 text-sm bg-[var(--accent-blue)]/20 rounded-xl border-[var(--accent-blue)] border-2">
                        <span>
                            <strong>This is a web feed</strong>
                        </span>
                        <span>, also known as an </span>
                        <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg" color="var(--foreground)" class="inline mb-2">
                            <path d="M12 19C12 14.8 9.2 12 5 12" stroke="var(--foreground)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M19 19C19 10.6 13.4 5 5 5" stroke="var(--foreground)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M5 19.01L5.01 18.9989" stroke="var(--foreground)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                        <span> RSS feed. </span>
                        <span>
                            <strong>Subscribe</strong>
                        </span>
                        <span> by copying the URL from the address bar into your newsreader.</span>
                    </nav>

                    <header>
                        <h1 class="text-xl text-[var(--accent-blue)]">
                            <xsl:value-of select="/rss/channel/title" />
                        </h1>
                        <p class="mt-2 text-lg">
                            <xsl:value-of select="/rss/channel/description" />
                        </p>
                        <a class="text-[var(--accent-blue)] hover:underline inline-block mt-2" target="_blank">
                            <xsl:attribute name="href">
                                <xsl:value-of select="/rss/channel/link" />
                            </xsl:attribute>
                            <span>Visit Website →</span>
                        </a>
                    </header>

                    <section>
                        <h2 class="text-2xl font-semibold mb-4">Recent Items</h2>
                        <xsl:for-each select="/rss/channel/item">
                            <a target="_blank" class="relative space-y-2 px-4 py-2 mb-4 rounded-xl border-2 border-[var(--container)] overflow-hidden block hover:border-[var(--accent-yellow)] transition-colors" style="background: radial-gradient(circle at top right, rgb(224,191,81) 0%, var(--background) 50%);">
                                <xsl:attribute name="href">
                                    <xsl:value-of select="link" />
                                </xsl:attribute>

                                <!-- Tags -->
                                <div class="flex gap-4 text-sm">
                                    <xsl:for-each select="category[position() &lt;= 3]">
                                        <span class="text-[var(--accent-blue)]">
                                            <xsl:value-of select="." />
                                        </span>
                                    </xsl:for-each>
                                </div>

                                <!-- Title -->
                                <h3 class="text-xl">
                                    <xsl:value-of select="title" />
                                </h3>

                                <!-- Date + cod3d.dev -->
                                <div class="flex justify-between geist-mono text-sm">
                                    <time>
                                        <xsl:value-of select="pubDate" />
                                    </time>
                                    <span>cod3d.dev</span>
                                </div>
                            </a>
                        </xsl:for-each>
                    </section>
                </div>

                <button id="theme-toggle" class="group aspect-square cursor-pointer touch-manipulation hover:scale-95 fixed top-4 right-4 z-50 w-8 h-8" aria-label="Theme switch">
                    <svg class="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
                        <circle class="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor" />
                        <g class="sun-beams" stroke="currentColor">
                            <line x1="12" y1="1" x2="12" y2="3" />
                            <line x1="12" y1="21" x2="12" y2="23" />
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                            <line x1="1" y1="12" x2="3" y2="12" />
                            <line x1="21" y1="12" x2="23" y2="12" />
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </g>
                        <mask class="moon" id="moon-mask">
                            <rect x="0" y="0" width="100%" height="100%" fill="white" />
                            <circle cx="24" cy="10" r="6" fill="black" />
                        </mask>
                    </svg>
                </button>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
