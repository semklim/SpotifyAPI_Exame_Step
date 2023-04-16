const { app, BrowserWindow, Tray, Menu, ipcMain } = require('electron');
const server = require('./server.js');
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
		icon: './public/img/logoElectron/png/Spotify_Icon_RGB_Green32x32.png'
	});

	win.once('ready-to-show', () => {
		win.show();
		win.maximize();
	});

	win.loadURL(`http://localhost:8883/`);
});


app.on('before-quit', () => {
  server.close(() => {
    app.exit();
  });
});
