import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  reporter: "line",
  use: { baseURL: "http://127.0.0.1:4321" },
  webServer: {
    command: "npm run preview -- --host 127.0.0.1 --port 4321 --ignore-lock",
    port: 4321,
    reuseExistingServer: true,
  },
  projects: [
    { name: "phone", use: { ...devices["Pixel 7"], viewport: { width: 390, height: 844 } } },
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
  ],
});
