const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

// Listens for app to be ready
app.on("ready", () => {
  // Creates new window
  mainWindow = new BrowserWindow({});

  // Loads HTML into window
  mainWindow.loadURL(path.join(__dirname, "main-window.html"));

  // Builds menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Inserts menu
  Menu.setApplicationMenu(mainMenu);
});

// Creates menu template
const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Add item",
      },
      {
        label: "Clear items",
      },
      {
        label: "Quit",
        accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        },
      },
    ],
  },
];
