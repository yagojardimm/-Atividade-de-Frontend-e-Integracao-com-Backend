# Atividade de Frontend e Integração com Backend

Esta aplicação consiste em um ecossistema completo integrado via Docker Compose:
- **Frontend (React)**: Desenvolvido com React + Tailwind CSS v4, empacotado e servido via **Nginx** na porta pública `8080`.
- **Backend Node.js (Express)**: Responsável pela autenticação (JWT) e CRUD de usuários (acessado apenas internamente pelo proxy Nginx na porta interna `3000`).
- **Backend Flask (Python)**: Responsável pelo CRUD de itens com banco SQLite (acessado apenas internamente pelo proxy Nginx na porta interna `5000`).
- **Banco de Dados (MongoDB)**: Rodando localmente para armazenamento dos usuários (isolado na rede interna Docker).

---

## 🚀 Como Executar a Aplicação Completa

1. Clone o repositório:
   ```bash
   git clone https://github.com/yagojardimm/-Atividade-de-Frontend-e-Integracao-com-Backend.git
   cd -Atividade-de-Frontend-e-Integracao-com-Backend
   ```

2. Configure o ambiente seguro criando o arquivo `.env` a partir do exemplo (obrigatório, pois a aplicação falhará ao iniciar se `JWT_SECRET` não estiver definido):
   ```bash
   cp .env.example .env
   ```
   Edite o arquivo `.env` para ajustar o valor do `JWT_SECRET` para uma chave forte e segura, além de definir as credenciais do banco.

3. Execute o comando para subir e compilar todos os containers:
   ```bash
   docker-compose up --build
   ```

4. Acesse a aplicação no seu navegador:
   * **Frontend (React)**: [http://localhost:8080](http://localhost:8080) (os backends são acessados apenas internamente através do proxy reverso do Nginx nas rotas `/api` e `/api-flask`).

---

## 🔒 Segurança do Segredo JWT e Banco de Dados

A aplicação exige a configuração de variáveis de ambiente seguras. É obrigatório criar o arquivo `.env` a partir de `.env.example` e definir valores personalizados antes de iniciar os containers:
```env
JWT_SECRET=coloque_uma_chave_secreta_e_segura_aqui
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=coloque_uma_senha_do_banco_segura_aqui
MONGODB_URI=mongodb://admin:coloque_uma_senha_do_banco_segura_aqui@mongodb:27017/cadastros?authSource=admin
```
O Docker Compose lerá este arquivo `.env` automaticamente e propagará a chave secreta e as credenciais do banco de dados, permitindo que a aplicação conecte com autenticação segura e sem expor a porta do banco de dados para o host externo.

---

## 📁 Estrutura do Projeto

* `/meu-app`: Código fonte do frontend em React.
* `/backend`: APIs do backend (Express e Flask).
* `/backend/FlaskCrud`: API Python Flask com banco de dados SQLite persistido via volume Docker.
* `docker-compose.yml`: Orquestração de todos os serviços na mesma rede Docker.

---

## 🔌 Comunicação e Proxy Reverso (Nginx)

O servidor **Nginx** no container do frontend atua como um **Proxy Reverso** para encaminhar as chamadas da API sem problemas de **CORS** no navegador:
- `/api/*` é roteado internamente para o container `backend-node:3000/api/*`
- `/api-flask/*` é roteado internamente para o container `backend-flask:5000/*`

---

## 🔌 Endpoints das APIs

Os backends oferecem as seguintes rotas de API, que são consumidas através do proxy reverso do Nginx na porta `8080` (ex: `http://localhost:8080/api/...` ou `http://localhost:8080/api-flask/...`):

### 1. Autenticação e Usuários (Backend Node.js - porta interna 3000)
Toda a lógica de controle de acesso de usuários do sistema (senhas criptografadas com hash bcryptjs).
* **`POST /api/login`**: Autentica o usuário e retorna o token JWT e as informações do perfil.
* **`POST /api/logout`**: Realiza o logout do usuário, revogando o token JWT ao registrá-lo na blacklist do MongoDB (Requer Token JWT).
* **`POST /api/user`**: Cadastra um novo usuário no banco de dados (Apenas usuários autenticados com a função `admin`).
* **`GET /api/user`**: Lista todos os usuários cadastrados no banco (Apenas para administradores).
* **`PUT /api/user/:id`**: Atualiza dados de um usuário (Apenas para administradores).
* **`DELETE /api/user/:id`**: Remove um usuário do sistema (Apenas para administradores).

### 2. Gerenciamento de Itens (Backend Flask - porta interna 5000)
Toda a lógica de gerenciamento de itens, cadastrados no banco de dados SQLite (com persistência garantida via volume Docker).

* **`GET /api-flask/api/itens`**: Retorna todos os itens cadastrados (Requer Token JWT no cabeçalho `Authorization`).
* **`GET /api-flask/api/itens/<id>`**: Detalhes de um item (Requer Token JWT).
* **`POST /api-flask/api/itens`**: Cadastra um novo item (Requer Token JWT).
  * Payload: `{"nome": "...", "descricao": "...", "categoria": "..."}`
* **`PUT /api-flask/api/itens/<id>`**: Atualiza as informações de um item (Requer Token JWT).
* **`DELETE /api-flask/api/itens/<id>`**: Remove um item do estoque (Requer Token JWT).

---

## 🔑 Acesso Inicial e Usuário Administrador

Ao inicializar o container do MongoDB local, a aplicação executa automaticamente uma rotina de seeding para garantir que o usuário administrador padrão sempre exista no banco:

* **Usuário (User)**: `admin`
* **Senha**: `admin`
* **Função**: `admin`

Utilize essas credenciais para realizar o primeiro login no sistema no endereço [http://localhost:8080](http://localhost:8080).

---

## 🧪 Como Executar os Testes Automatizados

A aplicação inclui suítes de testes automatizados para ambos os backends.

### 1. Testes do Backend Node.js
Para rodar os testes unitários de hash de senha no Node.js localmente:
1. Certifique-se de que as dependências do Node backend estão instaladas:
   ```bash
   cd backend
   npm install
   ```
2. Execute a suíte de testes:
   ```bash
   npm run test
   ```

### 2. Testes do Backend Flask
Para rodar os testes de integração do Flask (usando banco SQLite em memória):
Se os containers do Docker Compose estiverem em execução:
```bash
docker-compose exec backend-flask python -m unittest discover -s tests
```
Caso queira executar localmente (requer Python 3.10 e dependências instaladas):
```bash
cd backend/FlaskCrud
pip install -r requirements.txt
python -m unittest discover -s tests
```

---

## 🔒 Como Habilitar HTTPS / SSL/TLS em Produção

A aplicação já possui suporte preparado no Nginx e no Docker Compose para rodar sob HTTPS na porta desprivilegiada `8443` (adequada para execução não-root). Para ativar:

1. **Gere ou Copie os Certificados SSL**:
   Crie uma pasta chamada `certs` na raiz do projeto contendo os arquivos do certificado (`server.crt` e `server.key`). Para testes locais rápidos, você pode gerar um certificado autoassinado:
   ```bash
   mkdir certs
   openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout certs/server.key -out certs/server.crt
   ```

2. **Ative o HTTPS no Nginx**:
   No arquivo `meu-app/nginx.conf`, localize o bloco de configuração comentado `TEMPLATE PARA PRODUÇÃO: HTTPS / SSL` no final do arquivo, descomente-o por inteiro e salve.

3. **Ative a porta e o volume no Docker Compose**:
   No arquivo `docker-compose.yml`, sob o serviço `frontend`:
   - Descomente o mapeamento de porta `- "8443:8443"`.
   - Descomente o mapeamento de volume `- ./certs:/etc/nginx/certs:ro`.

4. **Reinicie os Containers**:
   Execute `docker-compose up --build -d` para atualizar a infraestrutura de rede. O sistema estará acessível e protegido sob HTTPS em `https://localhost:8443`.

