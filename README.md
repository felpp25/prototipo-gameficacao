# 🎮 Protótipo de Gamificação — Integração Conecta + Heeze (Chatwoot)

Este projeto é um **protótipo funcional** que demonstra a integração entre o sistema **Conecta** (ambiente acadêmico da FGI) e a **Heeze**, a assistente virtual utilizada no **Chatwoot**.
O objetivo é **automatizar o envio de mensagens para alunos** com base no progresso em suas aulas — simulando o uso de **webhooks e API** para gerar engajamento e gamificação no ambiente acadêmico.

---

##  Visão Geral do Projeto

O sistema funciona como um **intermediário entre o Conecta e o Chatwoot**, recebendo eventos de progresso de alunos (via webhook) e enviando mensagens personalizadas através da Heeze no WhatsApp.

###  Fluxo Simplificado

1. O aluno assiste a uma aula no **Conecta**.
2. Ao atingir **70% de progresso**, o sistema envia um **webhook** para o backend.
3. O backend processa os dados e envia a mensagem automaticamente via **Chatwoot API**.
4. A **Heeze (assistente virtual)** entrega a mensagem ao aluno no **WhatsApp**.

---

##  Tecnologias Utilizadas

| Tecnologia            | Função                                        |
| --------------------- | --------------------------------------------- |
| **Node.js + Express** | Backend e servidor Webhook                    |
| **Axios**             | Requisições HTTP à API do Chatwoot            |
| **Chatwoot API**      | Envio de mensagens para a Heeze               |
| **Dotenv (.env)**     | Armazenamento seguro de variáveis de ambiente |
| **Git / GitHub**      | Controle de versão e colaboração              |

---

##  Estrutura de Pastas

```
prototipo-gameficacao/
│
├── app.js                    # Servidor Express principal
├── chatwoot/
│   └── index.js              # Integração com a API do Chatwoot
├── config/
│   └── index.js              # Carrega variáveis do .env
├── .env                      # Variáveis de ambiente (oculto)
├── .gitignore                # Arquivos ignorados no Git
├── package.json              # Dependências e scripts
└── README.md                 # Documentação do projeto
```

---

##  Configuração do Ambiente

### 1️ Clone o repositório

```bash
git clone https://github.com/felpp25/prototipo-gameficacao.git
cd prototipo-gameficacao
```

### 2️ Instale as dependências

```bash
npm install
```

### 3️ Crie o arquivo `.env`

```env
CHATWOOT_URL=https://faculdadefgi.cloud.chatwoot.app.br
CHATWOOT_API_KEY=SUA_CHAVE_API
CHATWOOT_ACCOUNT_ID=1
CHATWOOT_INBOX_ID=3
PORT=3000
```

### 4️ Inicie o servidor

```bash
npm start
```

O backend estará rodando em:

```
http://localhost:3000
```

---

##  Testando o Webhook

Use o **Postman** ou **cURL** para enviar um JSON de teste:

```json
POST http://localhost:3000/webhook
{
  "aluno_id": "12345",
  "nome": "Felps",
  "curso": "ADS",
  "progresso": 75,
  "aula": "Engenharia de Software I",
  "telefone": "+5562986442841"
}
```

 **Se o progresso for ≥ 70%,** a Heeze enviará uma mensagem para o número informado via WhatsApp.

---

<img width="925" height="560" alt="image" src="https://github.com/user-attachments/assets/78be6879-59d5-49fe-8d26-d8f735759e06" />


##  Exemplo de Mensagem Enviada

> 🎉 Olá Felps! Você concluiu 75% da aula "Engenharia de Software I" do curso ADS.
> Você ganhou 10 pontos, ficamos felizes em ajudar você a melhorar 🚀

<img width="562" height="552" alt="image" src="https://github.com/user-attachments/assets/48f5fbf2-9cee-4603-b70b-5aeae9b1301e" />


---

##  Conceitos Envolvidos

* **Webhook:** Envia automaticamente dados do Conecta para o backend quando um evento ocorre (ex: aluno conclui 70% da aula).
* **API Chatwoot:** Responsável por receber a mensagem e entregá-la via WhatsApp.
* **Heeze:** Agente virtual que atua como interface entre o aluno e o Chatwoot.

---

##  Próximos Passos

* [ ] Implementar autenticação real com o Conecta.
* [ ] Criar dashboard para acompanhar progresso dos alunos.
* [ ] Adicionar banco de dados para registrar interações.
* [ ] Configurar pontos e ranking gamificado.

---

📧 [filiperamos1236@gmail.com](mailto:filiperamos1236@gmail.com)
🌐 [GitHub: felpp25](https://github.com/felpp25)

---
