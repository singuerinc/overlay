const { app, dialog, BrowserWindow } = require('electron');
const ipc = require('electron-better-ipc');

let mainWindow = null;

require('update-electron-app')({
  repo: 'singuerinc/overlay',
  logger: require('electron-log')
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support'); // eslint-disable-line
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require
  const path = require('path'); // eslint-disable-line
  const p = path.join(__dirname, '..', 'app', 'node_modules'); // eslint-disable-line
  require('module').globalPaths.push(p); // eslint-disable-line
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

const installExtensions = () => {
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer'); // eslint-disable-line global-require

    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    return Promise.all(
      extensions.map((name) =>
        installer.default(installer[name], forceDownload)
      )
    );
  }

  return Promise.resolve([]);
};

const showOpenDialogImage = () => {
  return new Promise((resolve, reject) => {
    dialog.showOpenDialog(
      {
        properties: ['openFile', 'multiSelections'],
        filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }]
      },
      (filePaths) => {
        resolve(filePaths);
      }
    );
  });
};

const createWindow = () => {
  const { screen } = require('electron');
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    show: false,
    // useContentSize: true,
    width,
    height,
    backgroundColor: '#00000000',
    opacity: 1,
    resizable: false,
    transparent: true,
    frame: false,
    hasShadow: false
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  ipc.answerRenderer('show-open-dialog-image', async () => {
    const filePaths = await showOpenDialogImage();
    return filePaths;
  });

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', async () => {
  await installExtensions();
  await createWindow();
});

app.on('window-all-closed', () => {
  app.quit();
});
