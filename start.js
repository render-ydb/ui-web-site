const pm2 = require("pm2");

async function startUiWebSite() {
  try {
    // List all running processes
    const processes = (await pm2.list()) || [];

    // Find the existing 'docusaurus-serve' process (if any)
    const existingProcess = processes.find((p) => p.name === "ui-web-site");

    if (existingProcess) {
      console.log(
        `Stopping and deleting existing 'ui-web-site' process (PID: ${existingProcess.pid})`
      );
      await pm2.stop(existingProcess.name);
      await pm2.delete(existingProcess.name);
    }

    console.log("Starting new Docusaurus service");
    await pm2.start({
      name: "ui-web-site",
      script: "npm",
      args: "run serve",
      cwd: ".",
      watch: [".", "!node_modules"],
    });

    console.log("Docusaurus service started successfully.");
  } catch (err) {
    console.error("Error starting Docusaurus service:", err);
    process.exit(1);
  }
}

startUiWebSite();
