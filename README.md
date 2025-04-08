# 💼 Software Engineering Internship Project

## 📝 Task Manager Frontend

This is the **frontend** for the Task Manager Web App — a simple yet powerful tool to manage your daily tasks. Built with **React**, **TypeScript**, and **Tailwind CSS**, it offers a clean interface, user authentication, and secure task handling via JWT.

---

## 🔥 Features

- 🔐 User registration & login
- ⚙️ JWT-based authentication with token expiration
- ⏱️ Real-time session countdown timer (auto logout)
- 📋 Add, filter, and delete tasks
- 💡 Minimal & responsive UI with Tailwind CSS
- 🛡️ Protected routes using context-based auth
- 🚪 Logout functionality with immediate UI updates

---

## 🧠 What's New?

- ✅ Implemented **global Auth Context** for managing login state
- ✅ Navbar now **auto-updates** after login/logout without page reload
- ✅ Added real-time token countdown inside the Navbar
- ✅ Fully dynamic user session handling

---

## 🛠 Tech Stack

- **React + TypeScript**
- **Tailwind CSS**
- **React Hook Form**
- **React Router DOM**
- **Axios**
- **JWT (JSON Web Tokens)**
- **Context API for Authentication**

---

## 🧰 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Ashik302/taskmanager-Frontend.git
cd taskmanager-Frontend

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})