module.exports = {
  apps: [
    {
      name: "ui-web-site",
      script: "npm",
      args: "run serve",
      cwd: ".",
      watch: [".", "!node_modules"],
    },
  ],
};
