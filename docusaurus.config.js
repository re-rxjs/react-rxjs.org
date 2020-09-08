module.exports = {
  title: "React-RxJS",
  tagline: "React bindings for RxJS",
  url: "https://re-rxjs.github.io",
  baseUrl: "/react-rxjs.org/",
  favicon: "img/favicon.ico",
  organizationName: "re-rxjs", // Usually your GitHub org/user name.
  projectName: "react-rxjs.org", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "React-RxJS",
      logo: {
        alt: "React-RxJS Logo",
        src: "img/logo-128.png",
      },
      items: [
        {
          to: "docs/getting-started",
          activeBasePath: "docs",
          label: "Docs",
          position: "left",
        },
        {
          to: "docs/tutorial/github-issues",
          activeBasePath: "docs",
          label: "Tutorial",
          position: "left",
        },
        {
          to: "docs/api/core/bind",
          activeBasePath: "docs",
          label: "API",
          position: "left",
        },
        {
          href: "https://github.com/re-rxjs/react-rxjs",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Learn",
          items: [
            {
              label: "Getting Started",
              to: "docs/getting-started/",
            },
            {
              label: "Core Concepts",
              to: "docs/core-concepts/",
            },
            {
              label: "API Reference",
              to: "docs/api/core/bind/",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/react-rxjs",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/ReactRxJS",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/re-rxjs/react-rxjs",
            },
          ],
        },
      ],
      copyright: `Built with Docusaurus.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/re-rxjs/react-rxjs.org/tree/master/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/re-rxjs/react-rxjs.org/tree/master/blog/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
}
