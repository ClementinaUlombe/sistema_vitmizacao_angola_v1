# Bem-vindo ao seu projeto Lovable

## Informações do Projeto

**URL**: https://lovable.dev/projects/c4a7af3b-89cd-4173-b766-302ba6a48a98

## Como posso editar este código?

Existem várias maneiras de editar sua aplicação.

**Usar Lovable**

Basta visitar o [Projeto Lovable](https://lovable.dev/projects/c4a7af3b-89cd-4173-b766-302ba6a48a98) e começar a interagir.

As alterações feitas via Lovable serão automaticamente commitadas para este repositório.

**Usar seu IDE preferido**

Se você deseja trabalhar localmente usando seu próprio IDE, pode clonar este repositório e enviar as alterações. As alterações enviadas também serão refletidas no Lovable.

O único requisito é ter Node.js e npm instalados - [instalar com nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Siga estes passos:

```sh
# Passo 1: Clone o repositório usando a URL Git do projeto.
git clone <SUA_URL_GIT>

# Passo 2: Navegue até o diretório do projeto.
cd <NOME_DO_SEU_PROJETO>

# Passo 3: Instale as dependências necessárias.
npm i

# Passo 4: Inicie o servidor de desenvolvimento com recarregamento automático e uma pré-visualização instantânea.
npm run dev
```

**Editar um arquivo diretamente no GitHub**

- Navegue até o(s) arquivo(s) desejado(s).
- Clique no botão "Editar" (ícone de lápis) no canto superior direito da visualização do arquivo.
- Faça suas alterações e commit as alterações.

**Usar GitHub Codespaces**

- Navegue até a página principal do seu repositório.
- Clique no botão "Code" (botão verde) perto do canto superior direito.
- Selecione a aba "Codespaces".
- Clique em "New codespace" para iniciar um novo ambiente Codespace.
- Edite os arquivos diretamente no Codespace e commit e push suas alterações quando terminar.

## Quais tecnologias são usadas para este projeto?

Este projeto é construído com:

- Next.js
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Prisma (com SQLite)
- ExcelJS (para processamento de arquivos Excel)
- bcryptjs (para hash de senhas)
- Recharts (para gráficos)

---

## **Configuração do Projeto e Dependências**

Para configurar e executar o projeto localmente, siga estas instruções:

### 1. Instalação de Dependências

Certifique-se de ter o Node.js e o npm (ou yarn/pnpm) instalados.
Na raiz do projeto, execute:

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 2. Configuração do Prisma (Migrações)

O projeto utiliza Prisma para interação com o banco de dados. Após instalar as dependências, você precisa aplicar as migrações do banco de dados para criar as tabelas necessárias.

```bash
npx prisma migrate dev --name add_report_model
```
Se você já executou migrações anteriormente, pode usar o nome da migração mais recente ou um nome descritivo.

### 3. Variáveis de Ambiente (`.env`)

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
DATABASE_URL="file:./prisma/dev.db"
# Outras variáveis de ambiente, se houver
```
A `DATABASE_URL` aponta para o seu arquivo de banco de dados SQLite.

---

## **Como Executar o Projeto**

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```
O aplicativo estará acessível em `http://localhost:3000`.

---

## **Fluxo de Autenticação**

O sistema possui um fluxo de autenticação completo com registo, login e recuperação de senha.

*   **Registo de Utilizador:** `http://localhost:3000/auth/register`
    *   Permite que novos utilizadores criem uma conta.
    *   As senhas são armazenadas com hash usando `bcryptjs`.
    *   Após o registo bem-sucedido, uma mensagem de sucesso é exibida num modal e o utilizador é redirecionado para a página de login.
*   **Login de Utilizador:** `http://localhost:3000/auth/login`
    *   Permite que utilizadores existentes acedam ao sistema.
    *   Após o login bem-sucedido, uma mensagem de sucesso é exibida num modal e o utilizador é redirecionado para o Painel Principal (`/dashboard`).
*   **Recuperação de Senha:** `http://localhost:3000/auth/forgot-password`
    *   Página para iniciar o processo de recuperação de senha (a lógica de backend para isso ainda precisa ser implementada).

## **Gestão de Perfis (RBAC)**

O sistema utiliza um controlo de acesso baseado em perfis (Role-Based Access Control):

### 👤 Administrador (ADMIN)
*   **Gestão de Utilizadores:** Controlo total sobre as contas.
*   **Infraestrutura:** Backup, Gestão de BD e Configurações.
*   **Dashboard:** Acesso a todos os menus técnicos.

### 🔬 Investigador (RESEARCHER)
*   **Análise Científica:** Lançamento de inquéritos, filtros avançados e comparação de percepções.
*   **Relatórios:** Criação de relatórios técnicos e estatísticos.

### 👮 Autoridade Policial (POLICE)
*   **Operacional:** Gestão de ocorrências e monitorização de denúncias em tempo real.
*   **Estratégia:** Acesso a mapas de criminalidade e painéis de relatórios de incidentes.

### 🏠 Cidadão (CITIZEN)
*   **Participação:** Envio de relatos/denúncias e consulta do estado das suas participações.
*   **Apoio:** Acesso ao Chatbot de auxílio e estatísticas públicas de segurança.

---

## **Painel Principal (Dashboard)**

O dashboard é a área principal para utilizadores autenticados, com menus dinâmicos carregados automaticamente com base no perfil (`role`) do utilizador guardado na base de dados.

### Estrutura do Menu Dinâmico

**Menu Administrativo (ADMIN):**
*   Gerir Utilizadores (`/dashboard/users`)
*   Lançamento de Inquéritos (`/dashboard/data-entry`)
*   Gerir Base de Dados (`/dashboard/database-management`)
*   Gestão de Denúncias (`/dashboard/occurrences`)
*   Painel Estatístico (`/dashboard/reports`)
*   Backup (`/dashboard/backup`)
*   Upload Excel (`/dashboard/excel-upload`)
*   Chatbot (`/dashboard/chatbot`)
*   Gráficos (`/dashboard/graphs`)

**Menu de Investigação (RESEARCHER):**
*   Lançamento de Inquéritos (`/dashboard/data-entry`)
*   Consultar Dados (`/dashboard/data-query`)
*   Gerar Gráficos e Estatísticas (`/dashboard/analytics`)
*   Filtrar Dados (`/dashboard/data-filter`)
*   Denúncias Recebidas (`/dashboard/occurrences`)
*   Comparar Percepções (`/dashboard/perception-comparison`)
*   Criar Relatórios (`/dashboard/report-creation`)
*   Upload Excel (`/dashboard/excel-upload`)
*   Chatbot (`/dashboard/chatbot`)
*   Gráficos (`/dashboard/graphs`)

---

## **Funcionalidades Principais**

### 1. Upload de Dados Excel

*   **Página:** `http://localhost:3000/dashboard/excel-upload`
*   **Propósito:** Permite o upload de ficheiros Excel contendo dados de pesquisa para serem importados para o banco de dados.

#### Estrutura Esperada do Ficheiro Excel (103 Colunas)

O sistema espera um ficheiro Excel com a seguinte estrutura de cabeçalhos de coluna (nomes exatos):

1.  `Data`
2.  `Número`
3.  `Idade`
4.  `Género`
5.  `Ocupação`
6.  `Tempo_de_residência_no_bairro`
7.  `Bairro`
8.  `Escolaridade`
9.  `ESCOLA`
10. `Vitima`
11. `Crime`
12. `Furto`
13. `Roubo`
14. `Agressão`
15. `Arrombamento`
16. `VioDom`
17. `Homicidio`
18. `Estupro`
19. `TraDroga`
20. `Vandalismo`
21. `Extorsão`
22. `Sequestro`
23. `Fraude`
24. `CrimeCibernetico`
25. `Outro`
26. `Quantasvezes`
27. `VAR00056`
28. `@10.Oscrimesfoiramdenunciadosàsautoridadespoliciais`
29. `Denunciou`
30. `@10.1.Senãoporquemotivopodeassinalarmaisdeumaopção`
31. `a1`
32. `a2`
33. `a3`
34. `a4`
35. `a5`
36. `a6`
37. `a7`
38. `a8`
39. `a9`
40. `a10`
41. `AnoMês`
42. `Mês`
43. `Horário`
44. `@12.Localizaçãoexatadentrodobairro`
45. `@13.Númerodeautoresenvolvidos`
46. `@14.Danoseconsequênciassofridaspodesermaisdeumaopção`
47. `@15.Vocêpercebeenvolvimentodemenoresouadolescentesemactividades`
48. `@16.Jápresenciouousoubedecrimescometidospormulheres`
49. `@17.Jápresenciouousoubedecrimescometidoscontramulheres`
50. `@18.Identificaapresençadeganguesouassociaçõescriminosasnobair`
51. `@19.Comoavaliaasuasensaçãodesegurançaaocircularnobairrodurant`
52. `@20.Comoavaliaasuasensaçãodesegurançaaocircularnobairrodurant`
53. `@21.Comparadoaosanosanterioresasuasensaçãodesegurança`
54. `@22.Quaisáreasespecíficasdobairrovocêconsideramaisperigosas`
55. `@23.Emquaishoráriosdodiavocêsesentemaisinseguroa`
56. `@24.Nasuaopiniãoquaisfactoresmaiscontribuemparaainsegurançanob`
57. `f1`
58. `f2`
59. `f3`
60. `f4`
61. `f5`
62. `f6`
63. `f7`
64. `f8`
65. `f9`
66. `f10`
67. `f11`
68. `f12`
69. `f13`
70. `@25.Vocêadoptoualgumamedidadeproteçãoextraporsesentirinseguro`
71. `p1`
72. `p2`
73. `p3`
74. `p4`
75. `p5`
76. `p6`
77. `p7`
78. `p8`
79. `p9`
80. `p10`
81. `@26.Comquefrequênciavocêachaqueocorremosseguintescrimesnobairr`
82. `@26.Comquefrequênciavocêachaqueocorremosseguintescrimesnobai_A`
83. `@26.Comquefrequênciavocêachaqueocorremosseguintescrimesnobai_B`
84. `@26.Comquefrequênciavocêachaqueocorremosseguintescrimesnobai_C`
85. `@27.Comoavaliaagravidadedoscrimesqueocorremnobairro`
86. `@28.Comoavaliaapresençapolicialnobairro`
87. `@29.Comoavaliaarapidezderespostadapolícia`
88. `@30.Comoavaliaaeficáciadapolícianocombateaocrimenasuaárea`
89. `@31.Comodescreveoseuníveldeconfiançanapolícialocal`
90. `@32.Játevealgumainteraçãopessoalcomapolícialocal`
91. `Sesimcomofoiainteração`
92. `@33.Vocêconfiaqueapolíciaeosistemajudiciallidamadequadamenteco`
93. `@34.Vocêacreditaqueasvítimasrecebemoapoionecessáriodasautorid`
94. `@35.Acriminalidadeafetousuarotinadiáriaoudesuafamília`
95. `Dequemaneira`
96. `@36.Comodescrevearelaçãoentrevizinhosemtermosdecooperaçãopar`
97. `VIII.SUGESTÕESDEMELHORIA`
98. `@37.Vocêparticipadealgumainiciativacomunitáriavoltadaparaasegu`
99. `Sesimqual`
100. `@38.Quaismedidasvocêsugeririaparamelhorarasegurançanobairro`
101. `@39.Vocêconheceserviçosdeapoioàsvítimasdecrimenobairro`
102. `Direccióndecorreoelectrónico`
103. `filter_$`

#### Como Fazer o Upload

1.  Aceda à página "Upload Excel" no dashboard.
2.  Clique em "Escolher Ficheiro" e selecione o seu ficheiro Excel (`.xlsx` ou `.xls`).
3.  Clique em "Upload e Processar".

#### Validação de Dados

O sistema realiza uma validação básica para garantir a integridade dos dados:
*   Verifica se o ficheiro Excel contém pelo menos uma folha de trabalho (tentando "Sheet1" ou a primeira folha).
*   Verifica a presença de campos obrigatórios como `Número`, `Idade` e `Género` para cada linha.
*   Se houver erros de validação ou de base de dados, uma mensagem de erro detalhada será exibida.

### 2. Interface do Chatbot

*   **Página:** `http://localhost:3000/dashboard/chatbot`
*   **Propósito:** Permite interagir com um chatbot inteligente para consultar dados, gerar relatórios e obter insights sobre segurança. (A lógica de backend para o chatbot pode exigir configuração adicional).

### 3. Visualização de Gráficos

*   **Página:** `http://localhost:3000/dashboard/graphs`
*   **Propósito:** Exibe gráficos interativos baseados nos dados importados.

#### Tipos de Gráficos Disponíveis

*   Residentes por Faixa Etária
*   Vitimização por Tipo de Crime
*   Percepção de Segurança por Género
*   Crimes por Bairro (exibido em formato de tabela para melhor organização de dados extensos)
*   Vitimização por Faixa Etária e Gênero
*   Razões para Não Denunciar Crimes
*   Ocupação vs. Vítima de Crime
*   Confiança na Polícia
*   Percepção de Segurança (Dia vs. Noite)
*   Vitimização por Nível de Escolaridade

#### Como Usar

1.  Certifique-se de ter importado dados via upload do Excel.
2.  Na página "Visualização de Gráficos", use o menu suspenso "Selecionar Gráfico" para escolher o tipo de gráfico que deseja visualizar.
3.  Os gráficos serão renderizados dinamicamente com base nos dados disponíveis.

### 4. Enviar Denúncia de Vitimização

*   **Página:** `http://localhost:3000/` (Página Inicial)
*   **Propósito:** Permite que vítimas ou cidadãos enviem denúncias ou informações sobre incidentes criminais de forma anónima ou identificada. As denúncias são armazenadas no banco de dados e enviadas por e-mail.
*   **Como Funciona:**
    1.  Na página inicial, clique no botão "Enviar Denúncia".
    2.  Um modal será aberto com um formulário.
    3.  Preencha os campos (Nome e Email são opcionais para anonimato, Assunto e Mensagem são obrigatórios).
    4.  A denúncia é enviada para um email pré-configurado através do serviço Formspree e armazenada no banco de dados do sistema.

### 5. Gerenciamento de Ocorrências

*   **Página:** `http://localhost:3000/dashboard/occurrences`
*   **Propósito:** Permite visualizar e gerenciar todas as denúncias e ocorrências recebidas.
*   **Como Funciona:**
    1.  Acesse o Painel Principal e clique em "Ocorrências" no menu lateral.
    2.  As denúncias são exibidas em uma tabela, ordenadas pelas mais recentes.
    3.  Cada denúncia pode ser marcada como "lida" ou "não lida" usando um checkbox, facilitando o acompanhamento.

### 6. Notificações de Ocorrências

*   **Localização:** Cabeçalho do sistema (tanto na página inicial quanto no dashboard).
*   **Propósito:** Fornecer um indicador visual de novas denúncias/ocorrências não lidas.
*   **Como Funciona:**
    1.  Um ícone de sino é exibido no cabeçalho.
    2.  Um número vermelho sobre o sino indica a quantidade de denúncias não lidas.
    3.  A contagem é atualizada automaticamente a cada 30 segundos.
    4.  Ao clicar no sino, o utilizador é redirecionado para a página de "Ocorrências".

---

## **Alternar Tema (Modo Claro/Escuro)**

O botão para alternar entre o modo claro e escuro está disponível em todas as telas:
*   Na página inicial, ele está no cabeçalho.
*   Nas páginas de autenticação e no dashboard, ele está fixo no canto inferior direito da tela e também no cabeçalho do dashboard.

---

## **Como Testar as Funcionalidades**

Siga os passos abaixo para verificar todas as funcionalidades implementadas:

1.  **Inicie o servidor de desenvolvimento do Next.js:**
    ```bash
    npm run dev
    ```
2.  **Acesse a aplicação no seu navegador:** `http://localhost:3000/`

3.  **Teste o Fluxo de Autenticação:**
    *   **Registo:**
        *   Navegue para `http://localhost:3000/auth/register`.
        *   Preencha um e-mail e senha, depois clique em "Cadastrar".
        *   Confirme se a mensagem de sucesso aparece num **modal** e se você é redirecionado para `http://localhost:3000/auth/login`.
    *   **Login:**
        *   Faça login com o utilizador registado.
        *   Confirme se a mensagem de sucesso aparece num **modal** e se você é redirecionado para `http://localhost:3000/dashboard`.
    *   **Esqueceu a Senha:**
        *   Na página de login, clique em "Esqueceu a senha?" e confirme se ele leva para `http://localhost:3000/auth/forgot-password`.

4.  **Teste a Navegação do Dashboard:**
    *   No `http://localhost:3000/dashboard`, verifique o menu lateral.
    *   Clique em todos os itens do menu (ex: "Gerir Utilizadores", "Ocorrências", "Upload Excel", "Chatbot", "Gráficos") e confirme que as páginas correspondentes são carregadas e o item do menu ativo é destacado.
    *   Clique em "Sair" e confirme o redirecionamento para `http://localhost:3000/auth/login`.

5.  **Teste a Envio de Denúncia:**
    *   Na página inicial (`http://localhost:3000/`), clique em "Enviar Denúncia".
    *   Preencha o formulário e envie.
    *   Verifique se a mensagem de sucesso "Mensagem enviada com sucesso! Responderemos dentro em breve." aparece e se o modal fecha após 3 segundos.
    *   **Verifique no banco de dados:** Use `npx prisma studio` e confira a tabela `Report` para ver se a denúncia foi armazenada.

6.  **Teste o Gerenciamento de Ocorrências:**
    *   Acesse `http://localhost:3000/dashboard/occurrences`.
    *   Confirme que as denúncias enviadas (incluindo as de teste) são exibidas na tabela.
    *   Teste marcar/desmarcar denúncias como lidas usando os checkboxes.
    *   Verifique se o status `read` é atualizado no banco de dados (via `npx prisma studio`).

7.  **Teste as Notificações de Ocorrências:**
    *   Envie algumas denúncias de teste e observe o ícone de sino no cabeçalho.
    *   Confirme que o número de denúncias não lidas é atualizado sobre o sino (pode levar até 30 segundos para o polling).
    *   Clique no sino e confirme o redirecionamento para a página de "Ocorrências".
    *   Marque uma denúncia como lida na página de "Ocorrências" e observe se o contador de notificações diminui.

8.  **Teste o Upload do Excel:**
    *   Navegue para `http://localhost:3000/dashboard/excel-upload`.
    *   Use um ficheiro Excel com os cabeçalhos de coluna exatos fornecidos e dados válidos para `Número`, `Idade` e `Género`.
    *   Faça o upload e verifique a mensagem de sucesso.
    *   **Para verificar os dados no banco:** Execute `npx prisma studio` no terminal e verifique as tabelas `Resident`, `Victimization` e `SecurityPerception`.
    *   Teste com um ficheiro Excel sem dados em `Número`, `Idade` ou `Género` para ver as mensagens de erro de validação.

9.  **Teste a Interface do Chatbot:**
    *   Navegue para `http://localhost:3000/dashboard/chatbot`.
    *   Verifique se o componente `ChatbotInterface` é exibido.

10. **Teste a Visualização de Gráficos:**
    *   Navegue para `http://localhost:3000/dashboard/graphs`.
    *   Selecione diferentes tipos de gráficos no menu suspenso.
    *   Confirme se os gráficos são renderizados corretamente com base nos dados que você importou via Excel.

11. **Teste o Alternador de Tema:**
    *   Em qualquer página, clique no botão de alternar tema e observe se o modo claro/escuro muda corretamente.