# Como corrigir o 404 no Vercel

Siga estes passos na ordem. O erro 404 quase sempre acontece por **estrutura errada no GitHub** ou **Root Directory incorreto**.

---

## PASSO 1: Verificar a estrutura no GitHub

Abra seu repositório no GitHub. **A primeira tela que você vê deve mostrar estes arquivos e pastas na RAIZ**:

```
app
components
lib
supabase
.gitignore
package.json
next.config.js
tailwind.config.ts
vercel.json
```

### Se você NÃO vê isso — se aparecer uma pasta "Viaja ai" ou "Viaja-ai" na raiz:

Sua estrutura está errada. Corrija assim:

#### Opção A: Reorganizar o repositório
1. Entre na pasta que contém `package.json` (ex: "Viaja ai")
2. Selecione TODOS os arquivos e pastas de dentro (app, components, lib, etc.)
3. No GitHub: **Add file** → **Upload files**
4. Arraste os arquivos para **a raiz** do repositório (não dentro de outra pasta)
5. Apague a pasta antiga se quiser
6. Commit

#### Opção B: Ajustar o Root Directory no Vercel
1. Vá no Vercel → seu projeto → **Settings**
2. Em **General**, encontre **Root Directory**
3. Clique em **Edit**
4. Digite o nome da pasta onde está o `package.json` (ex: `Viaja ai` ou `Viaja-ai`)
5. Salve
6. Vá em **Deployments** → os 3 pontinhos do último deploy → **Redeploy**

---

## PASSO 2: Conferir o deploy no Vercel

1. Vercel → seu projeto → aba **Deployments**
2. O último deploy está **Ready** (verde) ou **Failed** (vermelho)?

### Se estiver FAILED (vermelho):
1. Clique no deploy que falhou
2. Role até **Build Logs**
3. Veja a mensagem de erro em vermelho
4. Erros comuns:
   - **"package.json not found"** → Root Directory errado (volte ao Passo 1)
   - **"Module not found"** → Faltam arquivos no repositório
   - **"Command failed"** → Pode ser versão do Node; o Vercel usa Node 18 por padrão

### Se estiver READY (verde):
O build passou. O 404 pode ser:
- URL errada (veja Passo 3)
- Ou um bug de cache — tente **Redeploy** (Deployments → ⋮ → Redeploy)

---

## PASSO 3: Usar a URL correta

1. Vercel → seu projeto → aba **Overview**
2. Em **Domains**, use a URL principal, por exemplo:
   - `https://seu-projeto.vercel.app`
   - `https://viaja-ai-xxxx.vercel.app`

Não use:
- URLs de Preview (ex: `xxx-git-branch-xxx.vercel.app`)
- URLs antigas ou de outro projeto
- `localhost`

---

## PASSO 4: Variáveis de ambiente

1. Vercel → **Settings** → **Environment Variables**
2. Confirme que existem:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://xxx.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = sua chave anon
   - `OPENAI_API_KEY` = `sk-xxx` (opcional)
3. Depois de alterar, faça **Redeploy** em Deployments.

---

## Checklist rápido

- [ ] No GitHub: `package.json` e `app` estão na raiz (ou Root Directory definido no Vercel)
- [ ] Deploy no Vercel está **Ready**
- [ ] Estou usando a URL principal do projeto
- [ ] Variáveis de ambiente configuradas
- [ ] Fiz Redeploy após mudar algo

---

## Ainda com 404?

Mande essas informações:
1. Screenshot da tela inicial do seu repositório no GitHub (mostrando a estrutura de pastas)
2. Screenshot da aba Deployments no Vercel (mostrando o status)
3. A URL exata que você está tentando abrir
