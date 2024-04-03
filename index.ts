// Modules to control application life and create native browser window
import { app, BrowserWindow, Tray, Menu } from 'electron'

// const path = require('node:path')

const createWindow = () => {
   const win = new BrowserWindow({
      width: 800,
      height: 600,
      skipTaskbar: true,
      autoHideMenuBar: true,
      webPreferences: {
         // preload: path.join(__dirname, 'preload.js')
      }
   })

   // and load the index.html of the app.
   win.loadFile('index.html')
   // win.maximize()
   // win.setFullScreen(true)
   return win
   // win.webContents.openDevTools()
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
let tray
app.whenReady().then(() => {
   const win = createWindow()

   // globalShortcut.registerAll(['A', 'Space'], () => {
   //     win.hide()
   // })

   win.webContents.on('before-input-event', (event, input) => {
      if ([' ', 'a', 'escape'].includes(input.key.toLowerCase())) {
         win.hide()
         event.preventDefault()
      }
   })

   // app.on('activate', () => {
   //     // On macOS it's common to re-create a window in the app when the
   //     // dock icon is clicked and there are no other windows open.
   //     if (BrowserWindow.getAllWindows().length === 0) createWindow()
   // })
   tray = new Tray('favicon.ico')
   const contextMenu = Menu.buildFromTemplate([
      { label: 'Show', click: () => { win.show() } },
      { label: 'Quit', click: () => { app.quit() } },
       // { label: 'Item1', type: 'radio' },
       // { label: 'Item3', type: 'radio', checked: true },
   ])
   tray.setToolTip('blackscreen')
   tray.setContextMenu(contextMenu)
   tray.on('click', () => {
      console.log('click')
      // win.webContents.openDevTools()
      win.show()
      win.setFullScreen(true)
   })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') app.quit()
})
