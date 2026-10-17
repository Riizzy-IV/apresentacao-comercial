// Aplicativo desktop da apresentação (Electron).
// - Serve o build do Vite (pasta dist) pelo protocolo interno app://, para que as rotas do
//   React Router e os caminhos absolutos das imagens ("/img/...") funcionem como no navegador.
// - Abre em tela cheia. F11 alterna a tela cheia; Esc sai dela.
// - Atualização remota: ao abrir (com internet), procura versão nova nas Releases do GitHub e
//   pergunta ao vendedor (popup com OK) antes de baixar; ao terminar o download, outro popup
//   reinicia o app na versão nova. Sem internet, abre a versão instalada.
const { app, BrowserWindow, protocol, net, Menu, dialog } = require('electron');
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

/**
 * Atualização com confirmação: nada é baixado sem o OK do vendedor.
 * 1) versão nova encontrada → popup → OK baixa (progresso na barra de tarefas, o app segue funcionando);
 * 2) download concluído → popup → OK reinicia já na versão nova.
 * Se o app for fechado antes do segundo OK, a atualização baixada é instalada ao fechar.
 */
function configurarAtualizacao() {
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;

  const aviso = opcoes => dialog.showMessageBox(win, { type: 'info', buttons: ['OK'], defaultId: 0, noLink: true, ...opcoes });

  autoUpdater.on('update-available', async info => {
    await aviso({
      title: 'Atualização disponível',
      message: `Nova versão da apresentação disponível (${info.version}).`,
      detail: 'Clique em OK para baixar. Você pode continuar usando o app enquanto isso.',
    });
    autoUpdater.downloadUpdate().catch(() => win?.setProgressBar(-1));
  });

  autoUpdater.on('download-progress', p => win?.setProgressBar(p.percent / 100));

  autoUpdater.on('update-downloaded', async info => {
    win?.setProgressBar(-1);
    await aviso({
      title: 'Atualização pronta',
      message: `A versão ${info.version} foi baixada.`,
      detail: 'Clique em OK para reiniciar a apresentação já atualizada.',
    });
    // silencioso (o instalador não abre telas) e reabre o app ao terminar
    autoUpdater.quitAndInstall(true, true);
  });

  // sem internet ou GitHub fora do ar: segue com a versão atual
  autoUpdater.on('error', () => win?.setProgressBar(-1));
  autoUpdater.checkForUpdates().catch(() => {});
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

  if (app.isPackaged) configurarAtualizacao();
});

app.on('window-all-closed', () => app.quit());
