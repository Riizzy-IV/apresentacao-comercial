# App da apresentação (Electron)

A apresentação roda como aplicativo de Windows, sem depender de internet. Quando há internet,
o app verifica sozinho se existe versão nova no GitHub (Releases deste repositório) e mostra um
aviso com o botão **OK**. Ao clicar, a versão nova é baixada (o app segue funcionando, com o
progresso na barra de tarefas); ao terminar, um segundo aviso com **OK** reinicia o app já
atualizado. Se o vendedor fechar o app antes desse segundo OK, a atualização é instalada ao fechar.

> Os avisos valem a partir da versão 1.0.3. Quem está na 1.0.2 ou anterior recebe a 1.0.3 do jeito
> antigo (baixa em segundo plano e instala ao fechar, sem aviso); da atualização seguinte em diante,
> aparecem os avisos.

## Comandos

| Comando | O que faz |
|---|---|
| `npm run dev` | Desenvolvimento no navegador (como sempre) |
| `npm run app` | Abre a apresentação no app, para testar |
| `npm run dist` | Gera o instalador **sem publicar** |
| `npm run release` | Sobe a versão (1.0.1 → 1.0.2…), cria o commit e a etiqueta da versão, envia para o GitHub, gera o instalador e **publica a atualização** |

O instalador é gerado em `%LOCALAPPDATA%\balzani-release` (fora da Área de Trabalho, porque a
proteção do Windows bloqueia o empacotador dentro dela).

## Configuração (uma vez só)

O `npm run release` precisa de um token do GitHub para publicar:

1. Em https://github.com/settings/tokens → **Generate new token (classic)**, marque `public_repo`.
2. No PowerShell: `setx GH_TOKEN "cole-o-token-aqui"` e abra um terminal novo.

## Para publicar uma atualização

1. Faça as mudanças e confira com `npm run dev` ou `npm run app`.
2. Faça commit das mudanças (o `npm run release` não roda com alterações sem commit).
3. Rode `npm run release`. Ele mesmo cria o commit "Versão x.y.z", a etiqueta `vx.y.z` e envia
   para o GitHub antes de publicar (o GitHub exige a etiqueta para criar a Release). A Release é
   criada como rascunho, recebe o instalador e só então é publicada
   (`scripts/release-github.cjs`): se algo falhar no meio, os vendedores não recebem nada quebrado.

## Instalação nos PCs dos vendedores (só na primeira vez)

Baixe o `Apresentacao-Balzani-Setup-x.y.z.exe` da última Release no GitHub e envie para o
vendedor. Como o app não tem assinatura digital, o Windows pode mostrar "O Windows protegeu o
computador": clique em **Mais informações → Executar assim mesmo**. Depois disso, as
atualizações chegam sozinhas.

## Mac

O `npm run release` publica a Release e o GitHub Actions gera sozinho o
`Apresentacao-Balzani-x.y.z-mac.dmg` (Apple Silicon + Intel) e o anexa à mesma Release
(`.github/workflows/mac.yml`; também dá para rodar à mão em Actions › Instalador Mac › Run workflow).

- No Mac o app se chama "Apresentacao Balzani", sem acento: com "Apresentação" ele fecha ao abrir.
- Sem conta Apple Developer, o app não é reconhecido pela Apple: na primeira vez, clique com o botão
  direito no app › **Abrir** › **Abrir** (ou Ajustes › Privacidade e Segurança › **Abrir Mesmo Assim**).
- No Mac não há atualização automática: a cada versão, baixe o `.dmg` novo da Release e reinstale.

## No app

- Abre em tela cheia. **F11** alterna a tela cheia; **Esc** sai dela.
- Sem internet, abre normalmente a versão instalada.
