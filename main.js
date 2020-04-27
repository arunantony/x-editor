const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const menu = require('./components/Menu');
const fs = require('fs');
const path = require('path');
const {  WRITE_NEW_FILE_NEEDED, NEW_FILE_WRITTEN } = require(path.resolve('actions/types'));

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  win.loadFile('./static/index.html');

  // Set Menu
  Menu.setApplicationMenu(menu(win));

  // Turn on developer tools window
  devtools = new BrowserWindow()
  win.webContents.setDevToolsWebContents(devtools.webContents)
  win.webContents.openDevTools({mode: 'detach'})
  win.webContents.once('did-finish-load', function () {   
        let windowBounds = win.getBounds();  
        devtools.setPosition(windowBounds.x + windowBounds.width, windowBounds.y);
    });

  // create the file and then send a message back:
  ipcMain.on(WRITE_NEW_FILE_NEEDED, (event, {dir}) => {
      fs.writeFile(dir, `Start editing ${dir}`, function(err){
          if(err){ return console.log('error is writing new file') }
          win.webContents.send(NEW_FILE_WRITTEN, `Start editing ${dir}`)
      });
  })
  
}

app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })