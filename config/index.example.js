// config/index.example.js
require('dotenv').config(); // 

module.exports = {
  chatwootUrl: process.env.CHATWOOT_URL || 'https://faculdadefgi.cloud.chatwoot.app.br',
  chatwootApiKey: process.env.CHATWOOT_API_KEY || 'COLE_AQUI_SUA_CHAVE',
  chatwootAccountId: process.env.CHATWOOT_ACCOUNT_ID ? parseInt(process.env.CHATWOOT_ACCOUNT_ID, 10) : 1, //ID da conta
  chatwootInboxId: process.env.CHATWOOT_INBOX_ID ? parseInt(process.env.CHATWOOT_INBOX_ID, 10) : 3, // ID da inbox
};

// Ambos ID são localizados na URL do Chatwoot
// Exemplo: https://faculdadefgi.cloud.chatwoot.app.br/accounts/1/inboxes/3/conversations
// Aqui, 1 é o chatwootAccountId e 3 é o chatwootInboxId