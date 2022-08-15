const { app, BrowserWindow } = require('electron');//引入electron
let win;
let windowConfig = {
  minHeight: 700,
  minWidth: 1300,
  show: false , 
  resizable : false,
  useContentSize: true
};//窗口配置程序运行窗口的大小
function createWindow() {
  win = new BrowserWindow(windowConfig);//创建一个窗口
  win.maximize()
  win.show()
  // if (process.env.WEBPACK_DEV_SERVER_URL) {// dev环境
  //   win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
  //   // win.webContents.openDevTools()
  // } else {// 打包环境
    win.loadURL(`file://${__dirname}/index.html`);
  // }
  win.webContents.openDevTools();  //开启调试工具
  win.on('close', () => {
    //回收BrowserWindow对象
    win = null;
  });
  win.on('resize', () => {
    win.reload();
  })
}
app.on('ready', createWindow);
app.on('window-all-closed', () => {
  app.quit();
});
app.on('activate', () => {
  if (win == null) {
    createWindow();
  }
});
