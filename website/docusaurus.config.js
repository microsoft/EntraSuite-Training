// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Microsoft Entra Suite',
  tagline: 'Training hub for Microsoft Entra Suite',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://microsoft.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/EntraSuite-Training',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'microsoft', // Usually your GitHub org/user name.
  projectName: 'EntraSuite-Training', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),

        },
        blog:false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/social-card.png',
      navbar: {
        title: 'Entra Suite - Training',
        logo: {
          alt: 'Entra Suite logo',
          src: 'img/EntraSuiteLogo.png',
        },
        items: [
          {
            href: 'https://github.com/microsoft/EntraSuiteTraining',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Resources',
                to: '/',
              },
            ],
          },
          {
            title: 'Quick Links',
            items: [
              {
                label: 'Entra ID Governance training hub',
                href: 'https://aka.ms/entraidgovernancetraining',
              },
              {
                label: 'Global Secure Access',
                href: 'https://aka.ms/globalsecureaccesstraining',
              },
              {
                label: 'Microsoft Entra Verified ID',
                href: 'https://www.microsoft.com/en-us/security/business/identity-access/microsoft-entra-verified-id',
              },
              {
                label: 'Microsoft Entra ID Protection',
                href: 'https://www.microsoft.com/en-us/security/business/identity-access/microsoft-entra-id-protection',
              },
            ],
          },
          {
            title: 'More',
            items: [
             
              {
                label: 'GitHub',
                href: 'https://github.com/microsoft/EntraSuite-Training',
              },
            ],
          },
        ],
        copyright: `Built by the Microsoft Identity Customer Acceleration Team.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
