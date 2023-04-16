const { app, BrowserWindow, Tray, Menu, ipcMain} = require('electron');

let tray;

app.on('ready', () => {
  const win = new BrowserWindow({
    show: false,
    autoHideMenuBar: true,
    // frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    resizable: true,
    icon: './public/img/logoElectron/png/logo32x32.png'
  });

  

  win.once('ready-to-show', () => {
    win.show();
    win.maximize()
  });

  win.loadFile('./index.html');

})


app.on('window-all-closed', () => {
  app.quit();
}) 