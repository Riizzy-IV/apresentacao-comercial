# App da apresentação (Electron)

A apresentação roda como aplicativo de Windows, sem depender de internet. Quando há internet,
o app verifica sozinho se existe versão nova no GitHub (Releases deste repositório), baixa em
segundo plano e instala ao ser fechado. Na próxima abertura, o vendedor já vê a versão nova.

## Comandos

| Comando | O que faz |
|---|---|
| `npm run dev` | Desenvolvimento no navegador (como sempre) |
| `npm run app` | Abre a apresentação no app, para testar |
| `npm run dist` | Gera o instalador **sem publicar** |
| `npm run release` | Sobe a versão (1.0.0 → 1.0.1…), gera o instalador e **publica a atualização** |

O instalador é gerado em `%LOCALAPPDATA%\balzani-release` (fora da Área de Trabalho, porque a
proteção do Windows bloqueia o empacotador dentro dela).

## Configuração (uma vez só)

O `npm run release` precisa de um token do GitHub para publicar:

1. Em https://github.com/settings/tokens → **Generate new token (classic)**, marque `public_repo`.
2. No PowerShell: `setx GH_TOKEN "cole-o-token-aqui"` e abra um terminal novo.

## Para publicar uma atualização

1. Faça as mudanças e confira com `npm run dev` ou `npm run app`.
2. Rode `npm run release`.
3. Faça commit (o `package.json` muda de versão) e push.

## Instalação nos PCs dos vendedores (só na primeira vez)

Baixe o `Apresentacao-Balzani-Setup-x.y.z.exe` da última Release no GitHub e envie para o
vendedor. Como o app não tem assinatura digital, o Windows pode mostrar "O Windows protegeu o
computador": clique em **Mais informações → Executar assim mesmo**. Depois disso, as
atualizações chegam sozinhas.

## No app

- Abre em tela cheia. **F11** alterna a tela cheia; **Esc** sai dela.
- Sem internet, abre normalmente a versão instalada.
