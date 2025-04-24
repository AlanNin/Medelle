// vite.config.ts
import { defineConfig } from "file:///D:/VS%20Studio%20Main%20(Codes)/Work/patient-care/patient-care-project/node_modules/.pnpm/vite@5.4.9_@types+node@22.7.7/node_modules/vite/dist/node/index.js";
import path from "node:path";
import electron from "file:///D:/VS%20Studio%20Main%20(Codes)/Work/patient-care/patient-care-project/node_modules/.pnpm/vite-plugin-electron@0.28.8_6e9e5393ea9c4ccc34d07117698adaaa/node_modules/vite-plugin-electron/dist/simple.mjs";
import react from "file:///D:/VS%20Studio%20Main%20(Codes)/Work/patient-care/patient-care-project/node_modules/.pnpm/@vitejs+plugin-react@4.3.3_vite@5.4.9_@types+node@22.7.7_/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tsconfigPaths from "file:///D:/VS%20Studio%20Main%20(Codes)/Work/patient-care/patient-care-project/node_modules/.pnpm/vite-tsconfig-paths@5.0.1_t_39acf780d294de93ea2e94283eda3458/node_modules/vite-tsconfig-paths/dist/index.js";
import Unfonts from "file:///D:/VS%20Studio%20Main%20(Codes)/Work/patient-care/patient-care-project/node_modules/.pnpm/unplugin-fonts@1.1.1_vite@5.4.9_@types+node@22.7.7_/node_modules/unplugin-fonts/dist/vite.mjs";
import { TanStackRouterVite } from "file:///D:/VS%20Studio%20Main%20(Codes)/Work/patient-care/patient-care-project/node_modules/.pnpm/@tanstack+router-plugin@1.7_b413a0047a4b14c5ce0cce4f310b2d71/node_modules/@tanstack/router-plugin/dist/esm/vite.js";
import { loadEnv } from "file:///D:/VS%20Studio%20Main%20(Codes)/Work/patient-care/patient-care-project/node_modules/.pnpm/vite@5.4.9_@types+node@22.7.7/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "D:\\VS Studio Main (Codes)\\Work\\patient-care\\patient-care-project";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      react(),
      electron({
        main: {
          entry: "electron/main.ts"
        },
        preload: {
          input: path.join(__vite_injected_original_dirname, "electron/preload.ts")
        },
        renderer: process.env.NODE_ENV === "test" ? void 0 : {}
      }),
      tsconfigPaths(),
      Unfonts({
        custom: {
          families: [
            {
              name: "Geist",
              src: "./src/assets/fonts/geist/*.woff2"
            }
          ]
        }
      }),
      TanStackRouterVite()
    ],
    define: {
      "process.env": env
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__vite_injected_original_dirname, "index.html"),
          updater: path.resolve(__vite_injected_original_dirname, "updater.html")
        },
        output: {
          entryFileNames: "assets/[name]-[hash].js",
          chunkFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash].[ext]"
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxWUyBTdHVkaW8gTWFpbiAoQ29kZXMpXFxcXFdvcmtcXFxccGF0aWVudC1jYXJlXFxcXHBhdGllbnQtY2FyZS1wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxWUyBTdHVkaW8gTWFpbiAoQ29kZXMpXFxcXFdvcmtcXFxccGF0aWVudC1jYXJlXFxcXHBhdGllbnQtY2FyZS1wcm9qZWN0XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9WUyUyMFN0dWRpbyUyME1haW4lMjAoQ29kZXMpL1dvcmsvcGF0aWVudC1jYXJlL3BhdGllbnQtY2FyZS1wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Ly8gdml0ZS5jb25maWcudHNcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgZWxlY3Ryb24gZnJvbSBcInZpdGUtcGx1Z2luLWVsZWN0cm9uL3NpbXBsZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcbmltcG9ydCBVbmZvbnRzIGZyb20gXCJ1bnBsdWdpbi1mb250cy92aXRlXCI7XG5pbXBvcnQgeyBUYW5TdGFja1JvdXRlclZpdGUgfSBmcm9tIFwiQHRhbnN0YWNrL3JvdXRlci1wbHVnaW4vdml0ZVwiO1xuaW1wb3J0IHsgbG9hZEVudiB9IGZyb20gXCJ2aXRlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKTtcblxuICByZXR1cm4ge1xuICAgIHBsdWdpbnM6IFtcbiAgICAgIHJlYWN0KCksXG4gICAgICBlbGVjdHJvbih7XG4gICAgICAgIG1haW46IHtcbiAgICAgICAgICBlbnRyeTogXCJlbGVjdHJvbi9tYWluLnRzXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHByZWxvYWQ6IHtcbiAgICAgICAgICBpbnB1dDogcGF0aC5qb2luKF9fZGlybmFtZSwgXCJlbGVjdHJvbi9wcmVsb2FkLnRzXCIpLFxuICAgICAgICB9LFxuICAgICAgICByZW5kZXJlcjogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwidGVzdFwiID8gdW5kZWZpbmVkIDoge30sXG4gICAgICB9KSxcbiAgICAgIHRzY29uZmlnUGF0aHMoKSxcbiAgICAgIFVuZm9udHMoe1xuICAgICAgICBjdXN0b206IHtcbiAgICAgICAgICBmYW1pbGllczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiBcIkdlaXN0XCIsXG4gICAgICAgICAgICAgIHNyYzogXCIuL3NyYy9hc3NldHMvZm9udHMvZ2Vpc3QvKi53b2ZmMlwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgICBUYW5TdGFja1JvdXRlclZpdGUoKSxcbiAgICBdLFxuICAgIGRlZmluZToge1xuICAgICAgXCJwcm9jZXNzLmVudlwiOiBlbnYsXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBpbnB1dDoge1xuICAgICAgICAgIG1haW46IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiaW5kZXguaHRtbFwiKSxcbiAgICAgICAgICB1cGRhdGVyOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInVwZGF0ZXIuaHRtbFwiKSxcbiAgICAgICAgfSxcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgZW50cnlGaWxlTmFtZXM6IFwiYXNzZXRzL1tuYW1lXS1baGFzaF0uanNcIixcbiAgICAgICAgICBjaHVua0ZpbGVOYW1lczogXCJhc3NldHMvW25hbWVdLVtoYXNoXS5qc1wiLFxuICAgICAgICAgIGFzc2V0RmlsZU5hbWVzOiBcImFzc2V0cy9bbmFtZV0tW2hhc2hdLltleHRdXCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFVBQVU7QUFDakIsT0FBTyxjQUFjO0FBQ3JCLE9BQU8sV0FBVztBQUNsQixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLGFBQWE7QUFDcEIsU0FBUywwQkFBMEI7QUFDbkMsU0FBUyxlQUFlO0FBUnhCLElBQU0sbUNBQW1DO0FBVXpDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLENBQUM7QUFFdkMsU0FBTztBQUFBLElBQ0wsU0FBUztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLFFBQ1AsTUFBTTtBQUFBLFVBQ0osT0FBTztBQUFBLFFBQ1Q7QUFBQSxRQUNBLFNBQVM7QUFBQSxVQUNQLE9BQU8sS0FBSyxLQUFLLGtDQUFXLHFCQUFxQjtBQUFBLFFBQ25EO0FBQUEsUUFDQSxVQUFVLFFBQVEsSUFBSSxhQUFhLFNBQVMsU0FBWSxDQUFDO0FBQUEsTUFDM0QsQ0FBQztBQUFBLE1BQ0QsY0FBYztBQUFBLE1BQ2QsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLFVBQ04sVUFBVTtBQUFBLFlBQ1I7QUFBQSxjQUNFLE1BQU07QUFBQSxjQUNOLEtBQUs7QUFBQSxZQUNQO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGLENBQUM7QUFBQSxNQUNELG1CQUFtQjtBQUFBLElBQ3JCO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixlQUFlO0FBQUEsSUFDakI7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLGVBQWU7QUFBQSxRQUNiLE9BQU87QUFBQSxVQUNMLE1BQU0sS0FBSyxRQUFRLGtDQUFXLFlBQVk7QUFBQSxVQUMxQyxTQUFTLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsUUFDakQ7QUFBQSxRQUNBLFFBQVE7QUFBQSxVQUNOLGdCQUFnQjtBQUFBLFVBQ2hCLGdCQUFnQjtBQUFBLFVBQ2hCLGdCQUFnQjtBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
