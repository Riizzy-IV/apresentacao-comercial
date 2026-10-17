// Release no GitHub em duas etapas, usadas pelo "npm run release":
//   node scripts/release-github.cjs criar     → cria a Release da versão atual como rascunho
//   node scripts/release-github.cjs publicar  → publica o rascunho (os vendedores passam a receber)
// Sem isso, o electron-builder envia instalador e .blockmap ao mesmo tempo e cada envio cria uma
// Release própria; a da etiqueta fica sem o latest.yml e a atualização dos vendedores falha.
// Precisa do GH_TOKEN (ver COMO-ATUALIZAR.md).
const pkg = require('../package.json');

const { owner, repo } = pkg.build.publish;
const tag = `v${pkg.version}`;
const token = process.env.GH_TOKEN;
const etapa = process.argv[2];

async function github(caminho, opcoes = {}) {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}${caminho}`, {
    ...opcoes,
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'User-Agent': 'release-github' },
  });
  if (!res.ok) throw new Error(`GitHub ${res.status}: ${await res.text()}`);
  return res.json();
}

// a da etiqueta (inclui rascunhos, que a busca por etiqueta da API não acha)
const releaseDaVersao = async () => (await github('/releases?per_page=30')).find(r => r.tag_name === tag);

(async () => {
  if (!token) throw new Error('GH_TOKEN não configurado (ver COMO-ATUALIZAR.md)');

  if (etapa === 'criar') {
    const existente = await releaseDaVersao();
    if (existente) return console.log(`Release ${tag} já existe (${existente.draft ? 'rascunho' : 'publicada'})`);
    await github('/releases', { method: 'POST', body: JSON.stringify({ tag_name: tag, name: pkg.version, draft: true }) });
    console.log(`Release ${tag} criada como rascunho`);
  } else if (etapa === 'publicar') {
    const release = await releaseDaVersao();
    if (!release) throw new Error(`Release ${tag} não encontrada`);
    const nomes = release.assets.map(a => a.name);
    if (!nomes.includes('latest.yml')) throw new Error(`Release ${tag} sem latest.yml (arquivos: ${nomes.join(', ')})`);
    await github(`/releases/${release.id}`, { method: 'PATCH', body: JSON.stringify({ draft: false, make_latest: 'true' }) });
    console.log(`Release ${tag} publicada: ${nomes.join(', ')}`);
  } else {
    throw new Error('uso: node scripts/release-github.cjs criar|publicar');
  }
})().catch(erro => {
  console.error(erro.message);
  process.exit(1);
});
