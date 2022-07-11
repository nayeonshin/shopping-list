const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let addWindow;

// Listens for app to be ready
app.on("ready", () => {
  // Creates new window
  mainWindow = new BrowserWindow({});

  // Loads HTML into window
  mainWindow.loadURL(path.join(__dirname, "windows/main-window.html"));

  // Quits app when closed
  mainWindow.on("closed", () => {
    app.quit();
  });

  // Builds menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Inserts menu
  Menu.setApplicationMenu(mainMenu);
});

function handleAddWindowClick() {
  addWindow = new BrowserWindow({
    height: 200,
    title: "Add a shopping list item",
    width: 300,
  });

  addWindow.loadURL(path.join(__dirname, "windows/add-window.html"));
}

// Creates menu template
const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Add item",
        click() {
          handleAddWindowClick();
        },
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
