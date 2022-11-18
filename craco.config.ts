import path from "path";

const config = {
  webpack: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@constants": path.resolve(__dirname, "src/constants.ts"),
      "@types": path.resolve(__dirname, "src/types"),
      "@api": path.resolve(__dirname, "src/api"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@theme": path.resolve(__dirname, "src/theme.ts"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
    },
  },
};

export default config;
