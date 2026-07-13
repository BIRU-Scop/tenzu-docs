import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Tenzu Documentation',
  tagline: 'Documentation of Tenzu project',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docs',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

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
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
      } satisfies Preset.Options,
    ],      
  ],
  stylesheets: [
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
  ],
  markdown: {
    mermaid: true,
  },
  themes: [
    '@docusaurus/theme-mermaid',
    'docusaurus-theme-github-codeblock'
  ],
  themeConfig: {
    image: 'img/logo_tenzu.svg',
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    navbar: {
      title: 'Tenzu documentation',
      logo: {
        alt: 'Tenzu logo',
        src: 'img/logo_tenzu.svg',
      },
      items: [
        {
          label: 'Website',
          to: 'https://tenzu.net/',
          target: '_self',
        },
        {
          href: 'https://github.com/BIRU-Scop',
          label: 'GitHub',
          external: true,
          position: 'right',
        },
      ],
    },
    // github codeblock theme configuration
    codeblock: {
      showGithubLink: true,
      githubLinkLabel: 'View on GitHub',
      showRunmeLink: false,
      runmeLinkLabel: 'Checkout via Runme'
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Quickstart',
              to: '/quickstart/',
            },
            {
              label: 'Configuration',
              to: '/configuration/',
            },
            {
              label: 'Docker Compose',
              to: '/deployment/docker-compose/',
            },
            {
              label: 'Kubernetes',
              to: '/deployment/kubernetes/',
            },
          ],
        },
        {
          title: 'Tenzu',
          items: [
            {
              label: 'Website',
              to: 'https://tenzu.net/',
              target: '_self',
            },
            {
              label: 'Community',
              href: 'https://community.tenzu.net/',
            }
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/BIRU-Scop',
            },
            {
              label: 'Biru',
              href: 'https://biru.sh/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} BIRU. Built with Docusaurus.`,
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    prism: {
      darkTheme: prismThemes.dracula,
      theme: prismThemes.github,
      additionalLanguages: ['bash', 'docker'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
