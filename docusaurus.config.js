// @flow

module.exports = {
  title: 'Tbergq',
  tagline: '',
  url: 'https://tbergq-hompage.now.sh',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'tbergq', // Usually your GitHub org/user name.
  projectName: 'homepage', // Usually your repo name.
  themeConfig: {
    navbar: {
      links: [
        {
          to: 'docs/aboutme',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/tbergq',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/tbergq',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/trond-bergquist-bb3004a6/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Trond Bergquist. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: (require.resolve('./sidebars.js') /*: string */),
          // Please change this to your repo.
          editUrl: 'https://github.com/tbergq',
        },
        theme: {
          customCss: (require.resolve('./src/css/custom.css') /*: string */),
        },
      },
    ],
  ],
};
