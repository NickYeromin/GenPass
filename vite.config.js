import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	base: "/GenPass/", // 🔑 обязательно имя репозитория!
	plugins: [react()],
	server: {
		host: true,
		port: 5173,
		https: false,
	},
});
