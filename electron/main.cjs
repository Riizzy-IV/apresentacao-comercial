// Aplicativo desktop da apresentação (Electron).
// - Serve o build do Vite (pasta dist) pelo protocolo interno app://, para que as rotas do
//   React Router e os caminhos absolutos das imagens ("/img/...") funcionem como no navegador.
// - Abre em tela cheia. F11 alterna a tela cheia; Esc sai dela.
// - Atualização remota: ao abrir (com internet), procura versão nova nas Releases do GitHub,
//   baixa em segundo plano e instala ao fechar o app. Sem internet, abre a versão instalada.
const { app, BrowserWindow, protocol, net, Menu } = require('electron');
const path = require('node:path');
const fs = require('node:fs');
const { pathToFileURL } = require('node:url');
const { autoUpdater } = require('electron-updater');

const DIST = path.join(__dirname, '..', 'dist');

// precisa ser registrado antes do app ficar pronto
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { standard: true, secure: true, supportFetchAPI: true, stream: true } },
]);

// só uma janela da apresentação por vez
if (!app.requestSingleInstanceLock()) app.quit();

let win;

function criarJanela() {
  win = new BrowserWindow({
    width: 1920,
    height: 1080,
    fullscreen: true,
    backgroundColor: '#00243a',
    autoHideMenuBar: true,
    title: 'Apresentação Balzani',
    // backgroundThrottling: false → vídeos e animações não pausam quando a janela perde o foco
    webPreferences: { contextIsolation: true, sandbox: true, backgroundThrottling: false },
  });

  win.webContents.on('before-input-event', (event, input) => {
    if (input.type !== 'keyDown') return;
    if (input.key === 'F11') {
      win.setFullScreen(!win.isFullScreen());
      event.preventDefault();
    } else if (input.key === 'Escape' && win.isFullScreen()) {
      win.setFullScreen(false);
    }
  });

  win.loadURL('app://apresentacao/');
}

app.on('second-instance', () => {
  if (!win) return;
  if (win.isMinimized()) win.restore();
  win.focus();
});

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);

  // arquivo do dist; caminho desconhecido (rota do React Router) → index.html
  protocol.handle('app', request => {
    const { pathname } = new URL(request.url);
    const arquivo = path.normalize(path.join(DIST, decodeURIComponent(pathname)));
    const dentroDoDist = arquivo.startsWith(DIST);
    const existe = dentroDoDist && fs.existsSync(arquivo) && fs.statSync(arquivo).isFile();
    const alvo = existe ? arquivo : path.join(DIST, 'index.html');
    return net.fetch(pathToFileURL(alvo).toString(), { headers: request.headers });
  });

  criarJanela();

  if (app.isPackaged) {
    autoUpdater.on('error', () => {}); // sem internet ou GitHub fora do ar: segue com a versão atual
    autoUpdater.checkForUpdatesAndNotify().catch(() => {});
  }
});

app.on('window-all-closed', () => app.quit());
