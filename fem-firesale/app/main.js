const { app, BrowserWindow, dialog } = require('electron');

let mainWindow = null;

const getFileFromUserSelection = () => {
  const files = dialog.showOpenDialog(mainWindow,{
    properties:['openFile']
  });

  if (!files) return;

  const file = files[0];

  console.log(files);
};

app.on('ready', () => {
  mainWindow = new BrowserWindow({ show: false });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    getFileFromUserSelection();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
