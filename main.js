const { app, BrowserWindow, Menu } = require('electron')

let mainWin

const HOST = 'http://localhost:8080'
const HEIGHT = 659
const WIDTH = 800
const createWindow = options => {
  const win = new BrowserWindow(options)

  win.loadURL(HOST)

  win.on('closed', () => {
    mainWin = null
  })

  win.on('close', (event) => {
    if (win.forceClose) { return }

    event.preventDefault()
    win.hide()
  })

  return win
}

app.on('ready', () => {
  mainWin = createWindow({
    width: WIDTH,
    height: HEIGHT,
    hasShadow: false,
    titleBarStyle: 'hidden',
    resizable: false,
    webPreferences: { webSecurity: false },
  })


  if (process.platform === 'darwin') {
    const template = [{
      label: '豆瓣FMac',
      submenu: [{
        label: '关于 豆瓣FMac',
        role: 'about',
      }, {
        type: 'separator'
      }, {
        label: '隐藏 豆瓣FMac',
        accelerator: 'Command+H',
        selector: 'hide:'
      }, {
        label: '隐藏其他应用',
        accelerator: 'Command+Shift+H',
        selector: 'hideOtherApplications:'
      }, {
        label: '全部显示',
        selector: 'unhideAllApplications:'
      }, {
        type: 'separator'
      }, {
        label: '退出',
        accelerator: 'Command+Q',
        click() {
          app.quit()
        }
      }]
    }, {
      label: '编辑',
      submenu: [{
        label: '撤销',
        accelerator: 'Command+Z',
        selector: 'undo:'
      }, {
        label: '重做',
        accelerator: 'Shift+Command+Z',
        selector: 'redo:'
      }, {
        type: 'separator'
      }, {
        label: '剪切',
        accelerator: 'Command+X',
        selector: 'cut:'
      }, {
        label: '复制',
        accelerator: 'Command+C',
        selector: 'copy:'
      }, {
        label: '粘贴',
        accelerator: 'Command+V',
        selector: 'paste:'
      }, {
        label: '全选',
        accelerator: 'Command+A',
        selector: 'selectAll:'
      }]
    }, {
      label: '窗口',
      submenu: [{
        label: '最小化',
        accelerator: 'Command+M',
        selector: 'performMiniaturize:'
      }, {
        label: '关闭窗口',
        accelerator: 'Command+W',
        selector: 'performClose:'
      }, {
        type: 'separator'
      }]
    }]

    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
  }
})

app.on('before-quit', () => {
  mainWin.forceClose = true
})

app.on('activate', () => {
  mainWin.show()
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWin === null) {
    createWindow()
  }
})