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
      links: [
        {
          to: "docs/",
          activeBasePath: "docs",
          label: "Docs",
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
              to: "docs/",
            },
            {
              label: "Core Concepts",
              to: "docs/coreConcepts/",
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
              href: "https://twitter.com/react-rxjs",
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
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: "gettingStarted",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/re-rxjs/react-rxjs.org/tree/master/",
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
};
