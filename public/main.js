const { BrowserWindow, app } = require('electron');

require('@electron/remote/main').initialize(); // ! Remote Modolue Enable
// *We can get the { app } from @electron/remote module which has the path of the app


let win;

function createWindow() {
    win = new BrowserWindow({
        width: 810,
        height: 600,
        minWidth: 400,
        minHeight: 400,
        show: false,
        webPreferences: {
            enableRemoteModule: true,
            contextIsolation: false,
            nodeIntegration: true,
            devTools: false,
        }
    });

    win.loadURL('http://localhost:3000');

    win.on('ready-to-show', () => {
        win.show();
    })

    win.on('closed', () => {
        win = null
    })
}


app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})