import path from "path";

export default {
  build: {
    lib: {
      entry: {
        index: "./src/index.ts",
        button: "./src/test/test.component.ts",
        button2: "./src/test2/test2.component.ts",
      },
    },
  },
};
