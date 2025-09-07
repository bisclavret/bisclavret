# Bisclavret

> Transforming stories through AI

A modern, AI-driven story editor built with Tauri, React, TypeScript, and SCSS.

## ✨ Features

- 🖥️ **Native Desktop App** - Built with Tauri for cross-platform support (currently targeted for Windows)
- ⚛️ **Modern UI** - React with TypeScript and SCSS
- 🌙 To be continued...

## 🚀 Getting Started
- 🌙 To be continued...

### Prerequisites

- Node.js 18+ 
- Rust 1.70+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bisclavret/bisclavret.git
   cd bisclavret
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run in development mode**
   ```bash
   npm run tauri dev
   ```

### Internationalization Setup

The app supports multiple languages. To add or modify translations:

1. Edit JSON files in `src/locales/` (e.g., `en.json`, `fr.json`, `de.json`)
2. Use the `useTranslation` hook in components: `const { t } = useTranslation();`
3. Access translations with `t('key')`

For more details, see the i18next documentation.

### Building

```bash
# Build for production
npm run build

# Build Tauri app
npm run tauri build
```

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, SCSS
- **Desktop**: Tauri 2.x
- **Build Tool**: Vite
- **Styling**: SCSS with variables and mixins

## 📁 Project Structure

```
bisclavret/
├── src/                    # React application
│   ├── assets/            # Static assets (icons, images)
│   ├── components/        # Reusable React components
│   ├── hooks/             # Custom React hooks
│   ├── locales/           # Internationalization files (JSON)
│   ├── styles/            # SCSS stylesheets with variables and mixins
│   ├── views/             # Page/screen components
│   ├── App.tsx            # Main app component
│   ├── i18n.ts            # i18next configuration
│   ├── main.tsx           # Application entry point
│   └── vite-env.d.ts      # Vite type definitions
├── src-tauri/             # Tauri backend
│   ├── src/               # Rust source code
│   ├── Cargo.toml         # Rust dependencies
│   ├── tauri.conf.json    # Tauri configuration
│   └── icons/             # App icons
├── public/                # Public static assets
└── package.json           # Node.js dependencies and scripts
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Feature: description'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [GitHub Repository](https://github.com/bisclavret/bisclavret)
- [Organization](https://github.com/bisclavret)

---

**Note**: This project is currently in active development. Features and APIs may change.
