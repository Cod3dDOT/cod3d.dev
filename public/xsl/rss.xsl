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
                <link rel="stylesheet" href="/xsl/styles.css" />

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
            <body>
                <div class="container">
                    <nav class="nav">
                        <strong>This is a web feed</strong>
                        <span>, also known as an</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke-width="1.5"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 19C12 14.8 9.2 12 5 12" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M19 19C19 10.6 13.4 5 5 5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5 19.01L5.01 18.9989" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>RSS feed. </span>
                        <strong>Subscribe</strong>
                        <span> by copying the URL from the address bar into your newsreader.</span>
                    </nav>

                    <header class="feed-header">
                        <h1>
                            <xsl:value-of select="/rss/channel/title"/>
                        </h1>
                        <p>
                            <xsl:value-of select="/rss/channel/description"/>
                        </p>
                        <a target="_blank">
                            <xsl:attribute name="href">
                                <xsl:value-of select="/rss/channel/link" />
                            </xsl:attribute>
                            <span>Visit Website →</span>
                        </a>
                    </header>

                    <section class="recent-items">
                        <h2>Recent Items</h2>
                        <xsl:for-each select="/rss/channel/item">
                            <a class="feed-item" href="{link}" target="_blank">
                                <div class="feed-item-tags">
                                    <xsl:for-each select="category[position() &lt;= 3]">
                                        <span>
                                            <xsl:value-of select="."/>
                                        </span>
                                    </xsl:for-each>
                                </div>
                                <h3 class="feed-item-title">
                                    <xsl:value-of select="title"/>
                                </h3>
                                <div class="feed-item-meta">
                                    <time>
                                        <xsl:value-of select="pubDate"/>
                                    </time>
                                    <span>cod3d.dev</span>
                                </div>
                            </a>
                        </xsl:for-each>
                    </section>
                </div>

                <button id="theme-toggle" aria-label="Theme switch">
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
