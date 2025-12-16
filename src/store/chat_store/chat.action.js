import { createAsyncThunk } from "@reduxjs/toolkit";
import { askQuestionService } from "../../services/chat.service";
import { randomId16UUIDStyle } from "../../utils/common";

export const createConversation = createAsyncThunk("chat/createConversation",
    async ({ handleSuccess } = {}, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const language = state.chat.language;

            const newConversation = {
                id: randomId16UUIDStyle(),
                title: "New Conversation",
                timestamp: new Date().toISOString(),
                language,
                messages: [],
            };

            const response = {
                ok: true,
                json: () => Promise.resolve(newConversation),
            };

            const data = await response.json();

            if (response.ok) {
                handleSuccess?.(data.id);
                return data;
            }

            return thunkAPI.rejectWithValue(response.message);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const sendMessageAPI = createAsyncThunk("chat/sendMessageAPI",
    async ({ chatId, question }, thunkAPI) => {
        try {
            const response = await askQuestionService({ question });
            if (response?.response) {
                return {
                    chatId: chatId,
                    bot: {
                        id: "b_" + Date.now(),
                        role: "bot",
                        content: response.response,
                        timestamp: new Date().toISOString(),
                        contentType: "text",
                        pageImages: response.page_images || [],
                        referencedPages: response.referenced_pages || [],
                        sourceMap: response.source_map || {},
                    },
                };
            }

            return thunkAPI.rejectWithValue(response.error || "Failed to get response");
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const getConversationById = createAsyncThunk('chat/getConvById',
    async ({ id }, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const conversations = state.chat.conversations;
            let findConvo = conversations?.find((conv) => conv?.id === id)
            const response = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        ok: true,
                        json: () => Promise.resolve(findConvo || null)
                    });
                }, 500);
            });
            const data = await response.json();
            if (response.ok) {
                return data;     //success result
            }
            return thunkAPI.rejectWithValue(data.message || "data fetch failed");
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
