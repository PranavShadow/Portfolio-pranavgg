# Premium SEO-Rich Developer Portfolio

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-ff0055?style=for-the-badge&logo=framer" alt="Framer Motion" />
</div>

---

## ✨ Overview

This is a high-performance, aesthetically pleasing developer portfolio built with the latest web technologies. Designed for developers who want to showcase their work with a premium feel, seamless animations, and top-tier SEO.

> [!TIP]
> **Star this repository** if you find it useful or plan to use it for your own portfolio! ⭐

---

## 🚀 Features

- **Dynamic Content Integration:** 
  - **GitHub API:** Automatically fetches and displays repositories with star counts, forks, and language tags.
  - **Technical Blog:** Seamlessly syncs latest articles from **Hashnode** and **Medium** via GQL and RSS.
- **Modern Aesthetics:** Glassmorphism, mesh gradients, and Framer Motion micro-animations.
- **High Performance:** Optimized with Next.js 15+ and Turbopack for near-instant loading.
- **SEO Ready:** Dynamic metadata, OG images, and structured data out of the box.
- **Fully Responsive:** Beautifully crafted for all screen sizes.
- **Theming:** Smooth Dark/Light mode transitions.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router, Turbopack)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
- **Analytics:** Vercel Analytics & Speed Insights

---

## 🏗️ Architecture & Benefits

### 1. Configuration-Driven Design
Most of the site's content (SEO, social links, navigation, etc.) is managed via a central `site.config.ts`. This makes rebranding and updating your info incredibly easy without touching the core logic.

### 2. Cutting-Edge Performance
Leveraging Next.js 15+ and Turbopack, the project ensures lightning-fast build times and near-instant page transitions. It uses React Server Components (RSC) to minimize client-side JavaScript.

### 3. Premium Aesthetics
Built with a focus on "Rich Aesthetics," the portfolio features:
- **Glassmorphism** and subtle mesh gradients.
- **Micro-animations** for interactive elements.
- **Dark Mode by default** with seamless toggling.

### 4. SEO & Accessibility
- **Dynamic Metadata:** Automated OG tags, Twitter cards, and JSON-LD structured data.
- **Semantic HTML:** Fully accessible components following ARIA patterns.
- **Fast LCP/FID:** Optimized for Core Web Vitals.

---

## 🚀 Getting Started

Follow these steps to set up the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/PranavShadow/Portfolio-website.git
cd Portfolio-website
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory (refer to `.env-example`):
```bash
cp .env-example .env.local
```
*Note: Fill in your specific environment variables for Authentication and Analytics if needed.*

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## 📂 Project Structure

```text
src/
├── app/            # Next.js App Router (Pages & API)
├── components/     # Reusable UI components (Shadcn + Custom)
├── config/         # Central configuration (site.config.ts)
├── hooks/          # Custom React hooks
├── lib/            # Utility functions & shared logic
└── public/         # Static assets (images, icons)
```

---

## 🎨 Customization

To personalize the portfolio:
1. Open `src/config/site.config.ts`.
2. Update the `siteConfig` object with your details, social links, and SEO metadata.
3. Replace images in the `public/` folder.

---

## 🤝 Contributing

Contributions are welcome! If you have a suggestion that would make this better, please fork the repo and create a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  Built by <a href="https://github.com/PranavShadow">Pranav Gupta</a>
</div>
