import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Бази даних",
  description: "Лабораторні роботи з дисципліни Організація баз даних",
  lang: "uk",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Головна", link: "/" },
      { text: "Зміст", link: "/intro/README" },
      { text: "Автори", link: "/authors" },
    ],

    footer: {
      copyright: "MIT Licensed | Copyright © 2025 TockePie"
    },

    search: {
      provider: 'local'
    },

    sidebar: [
      {
        text: "Зміст",
        items: [
          { text: "Вступ", link: "/intro/README" },
          {
            text: "Розроблення загальних вимог до системи",
            items: [
              { text: "Аналіз предметної області", link: "/requirements/state-of-the-art" },
              {
                text: "Потреби зацікавлених сторін",
                link: "/requirements/stakeholders-needs",
              },
            ],
          },
          {
            text: "Розроблення вимог до функціональности системи",
            link: "/use cases/README",
          },
          {
            text: "Проектування інформаційного забезпечення",
            link: "/design/README",
          },
          {
            text: "Реалізація інформаційного та програмного забезпечення",
            link: "/software/README",
          },
          {
            text: "Тестування працездатності системи",
            link: "/test/README",
          },
          {
            text: "Висновки",
            link: "/conclusion/README",
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/TockePie/db_labs" },
    ],
  },
});
