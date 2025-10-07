const axios = require("axios");
const {
  chatwootUrl,
  chatwootApiKey,
  chatwootAccountId,
  chatwootInboxId,
} = require("../config/index.js");

async function chatwootApi(endpoint, method, payload) {
  const url = `${chatwootUrl}${endpoint}`;
  const opts = {
    method,
    url,
    headers: {
      "Content-Type": "application/json",
      api_access_token: chatwootApiKey,
    },
    data: payload,
  };

  try {
    const response = await axios(opts);
    return response.data;
  } catch (err) {
    if (err.response) {
      const error = new Error(
        `Chatwoot API request failed: ${err.response.status} ${err.response.statusText}`
      );
      error.response = err.response;
      throw error;
    }
    throw err;
  }
}

async function getContact(name, phone) {
  const payload = {
    inbox_id: chatwootInboxId,
    name,
    phone_number: phone,
    identifier: phone,
  };

  try {
    const res = await chatwootApi(
      `/api/v1/accounts/${chatwootAccountId}/contacts`,
      "POST",
      payload
    );
    return res.id;
  } catch (e) {
    if (e.response && e.response.status === 422) {
      const searchEndpoint =
        `/api/v1/accounts/${chatwootAccountId}/contacts/search?q=` +
        encodeURIComponent(phone);
      const res = await chatwootApi(searchEndpoint, "GET", null);
      const contacts = res.payload || [];
      const contact = contacts.find((c) => c.phone_number === phone);
      if (contact) {
        return contact.id;
      } else {
        throw new Error("Contact exists but not found in search payload");
      }
    }
    throw e;
  }
}

async function getConversation(phone, contactId) {
  try {
    const list = await chatwootApi(
      `/api/v1/accounts/${chatwootAccountId}/contacts/${contactId}/conversations`,
      "GET",
      null
    );
    const conversations = list.payload || [];

    const openConversation = conversations.find((c) => c.status === "open");
    if (openConversation) {
      return openConversation.id;
    }
  } catch (e) {
    // Ignore errors
  }

  const payload = {
    contact_id: contactId,
    inbox_id: chatwootInboxId,
    source_id: phone,
  };

  const res = await chatwootApi(
    `/api/v1/accounts/${chatwootAccountId}/conversations`,
    "POST",
    payload
  );
  return res.id;
}

async function sendMessage(conversationId, message) {
  const payload = {
    content: message,
    message_type: "outgoing",
    content_type: "text",
    private: false,
  };

  const res = await chatwootApi(
    `/api/v1/accounts/${chatwootAccountId}/conversations/${conversationId}/messages`,
    "POST",
    payload
  );
  return res;
}

module.exports = { getContact, getConversation, sendMessage };
