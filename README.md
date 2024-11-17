<div align="center">
  
  [![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:pinheiros.dev@gmail.com)
  [![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/lucas-p-5b1585265)
  [![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=for-the-badge&logo=YouTube&logoColor=white)](https://www.youtube.com/@PinheirosDev)

  <br />
  <br />

  <h1 align="center">Horta Solidária - Sistema de Gestão Solidária</h1>

  > Horta Solidária é um sistema para facilitar a gestão de doações, centros de doações e usuários envolvidos em ações solidárias. Desenvolvido com Next.js, Prisma e PostgreSQL, ele integra funcionalidades para cadastrar, listar e gerenciar informações relacionadas a doações e seus respectivos centros.

  <a href="https://github.com/p1nheiros/horta-solidaria"><strong>➥ Visualizar Projeto</strong></a>

</div>

<br />

### 🔧 Funcionalidades

- **Cadastro de Usuários:** Insira nome, email e senha para criar uma conta.
- **Autenticação Segura:** Login e controle de sessão utilizando NextAuth.js.
- **Gestão de Doações:**
  - Cadastrar, listar e excluir doações.
  - Atualizar status de doações para "pendente", "concluído" ou "cancelado".
- **Centros de Doações:**
  - Gerenciar centros de doação e itens aceitos.
  - Listar doações relacionadas a um centro.
- **Dashboard Intuitivo:** Visualização gráfica dos dados gerais, como total de doações, centros cadastrados, usuários ativos e valor total doado.

### 📂 Estrutura do Projeto

- **Frontend:** Desenvolvido com React e TailwindCSS para um design moderno e responsivo.
- **Backend:** API robusta criada com Next.js e Prisma para integração com PostgreSQL.

### 👌 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

* [Git](https://git-scm.com/downloads "Download Git") deve estar instalado em seu sistema operacional.
* Node.js (versão 18 ou superior) instalado.
* PostgreSQL configurado e acessível.

### 📍 Executar localmente

Para executar o repositório localmente, execute este comando no seu git bash:

Linux e macOS:

```bash
sudo git clone https://github.com/p1nheiros/horta-solidaria.git
```

Windows:

```bash
git clone https://github.com/p1nheiros/horta-solidaria.git
```

### 🚀 Como Usar

1. **Clonar o Repositório**
   - Clone o repositório usando o comando acima.

2. **Configurar o Banco de Dados**
   - Certifique-se de que o PostgreSQL está instalado e rodando.
   - Crie o banco de dados:
     ```sql
     CREATE DATABASE horta_solidaria;
     ```
   - Atualize a string de conexão no arquivo `.env`:
     ```env
     DATABASE_URL="postgresql://seu_usuario:senha@localhost:5432/horta_solidaria"
     ```

3. **Instalar Dependências**
   - No terminal, navegue até o diretório do projeto e execute:
     ```bash
     npm install
     ```

4. **Executar Migrações**
   - Rode o comando para criar as tabelas no banco:
     ```bash
     npx prisma migrate dev
     ```

5. **Iniciar o Projeto**
   - Para rodar o servidor localmente:
     ```bash
     npm run dev
     ```
   - Acesse o projeto em [http://localhost:3000](http://localhost:3000).

### 👨‍💻 Desenvolvedor

<table>
  <tr>
    <td>
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/124714182?v=4" width="100px;" alt="Lucas Pinheiro"/><br>
        <sub>
          <b>Lucas Pinheiro</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

### ☎️ Contato

Se você quiser entrar em contato comigo, pode me encontrar no [Gmail](mailto:pinheiros.dev@gmail.com).

### 🖋️ Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE.md) para mais detalhes.

[⬆ Voltar ao topo](README.md)<br>
