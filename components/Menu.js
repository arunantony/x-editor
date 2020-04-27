const {app, Menu, ipcMain } = require('electron');
const { NEW_DOCUMENT_NEEDED, SAVE_NEEDED, SAVED } = require('../actions/types');
const fs = require('fs')
let contentToSave = '';

ipcMain.on(SAVE_NEEDED, (event, content) => {
    contentToSave = content 
});

module.exports = function(win){
    return Menu.buildFromTemplate([
        {
            label: 'File', 
            submenu: [
                {
                    label: 'New',
                    accelerator: 'cmd+N',
                    click: () => {
                        win.webContents.send(NEW_DOCUMENT_NEEDED, 'Create new document')
                    }
                },
                {
                    label: 'Save',
                    click: () => {
                        if(contentToSave != ''){
                            fs.writeFile(contentToSave.fileDir, contentToSave.content, (err) => {
                                if (err) throw err;
                                win.webContents.send(SAVED, 'File Saved')
                            });
                        }
                    },
                    accelerator: 'cmd+S'
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {label: 'Undo', role: 'undo'  },
                {label: 'Redo', role: 'redo'  },
                {label: 'Cut', role: 'cut'  },
                {label: 'Copy', role: 'copy'  },
                {label: 'Paste', role:'paste'  },
            ]
        },
        {
            label: app.getName(),
            submenu: [
                { label: `Hello`, click: () => console.log("Hello world") }
            ]
        }

    ])    
}