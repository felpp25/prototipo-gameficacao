const express = require("express");
const { getContact, getConversation, sendMessage } = require("./chatwoot");

const app = express();
app.use(express.json());

// 🔹 Rota que simula o webhook do Conecta
app.post("/webhook", async (req, res) => {
  try {
    const { aluno_id, nome, curso, progresso, aula, telefone } = req.body;

    console.log("Webhook recebido:", req.body);

    // Regras simples: só dispara se progresso >= 70%
    if (progresso >= 70) {
      const mensagem = `🎉 Olá ${nome}! Você concluiu ${progresso}% da aula "${aula}" do curso ${curso}.Você ganhou 10 pontos, ficamos felizes em ajudar você a melhorar 🚀`;

      // 🔹 Fluxo Chatwoot
      const contactId = await getContact(nome, telefone || aluno_id);
      const conversationId = await getConversation(telefone || aluno_id, contactId);
      const response = await sendMessage(conversationId, mensagem);

      console.log("Mensagem enviada ao Chatwoot:", response);

      res.json({ status: "ok", mensagem });
    } else {
      res.json({ status: "ignorado", motivo: "Progresso menor que 70%" });
    }
  } catch (err) {
    console.error("Erro ao processar webhook:", err);
    res.status(500).json({ error: "Falha ao processar webhook" });
  }
});

app.listen(3000, () => {
  console.log("Backend rodando na porta 3000");
});


