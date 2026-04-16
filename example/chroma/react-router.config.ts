import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "app",
  ssr: false,
  prerender: ["/"],
  future: {
    unstable_optimizeDeps: true,
  },
} satisfies Config;
