const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow } = electron;

let mainWindow;

// Listens for app to be ready
app.on("ready", () => {
  // Creates new window
  mainWindow = new BrowserWindow({});

  // Loads HTML into window
  mainWindow.loadURL(path.join(__dirname, "main-window.html"));
});
