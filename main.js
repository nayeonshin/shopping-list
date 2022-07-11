const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu, ipcMain } = electron;

// Sets env
process.env.NODE_ENV = "production";

let mainWindow;
let addWindow;

// Listens for app to be ready
app.on("ready", () => {
  // Creates new window
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

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

// Catches item:add
ipcMain.on("item:add", (e, item) => {
  mainWindow.webContents.send("item:add", item);
  addWindow.close();
});

function handleAddWindowClick() {
  addWindow = new BrowserWindow({
    height: 200,
    title: "Add a shopping list item",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    width: 300,
  });

  addWindow.loadURL(path.join(__dirname, "windows/add-window.html"));

  // Handles garbage collections
  addWindow.on("close", () => {
    addWindow = null;
  });
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
        click() {
          mainWindow.webContents.send("item:clear");
        },
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

// If Mac, adds empty object to menu
if (process.platform === "darwin") {
  mainMenuTemplate.unshift({});
}

// Adds developer tools item if not in production
if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Developer Tools",
    submenu: [
      {
        label: "Toggle DevTools",
        accelerator: process.platform === "darwin" ? "Command+I" : "Ctrl+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
      {
        role: "reload",
      },
    ],
  });
}
