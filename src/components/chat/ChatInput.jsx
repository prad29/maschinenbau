import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Send } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { addUserMessage, setChatInput } from '../../store/chat_store/chat.reducer';
import { createConversation, sendMessageAPI } from '../../store/chat_store/chat.action';
import { useNavigate, useParams } from 'react-router-dom';
import { translations } from '../../lib/mockData';

const ChatInput = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const language = useSelector((state) => state?.chat?.language);
    const loading = useSelector((state) => state?.chat?.loading);

    const { chatId } = useParams();

    const chatInputValue = useSelector((state) => state.chat.chatInput);

    const t = translations[language];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!chatInputValue.trim() && loading) return;

        const userMessage = {
            id: `m_${Date.now()}`,
            role: "user",
            content: chatInputValue,
            timestamp: new Date().toISOString(),
            contentType: "text",
        };

        let activeChatId =
            chatId === "undefined" || !chatId ? null : chatId;

        //If conversation does NOT exist → create one first
        if (!activeChatId) {
            const newConv = await dispatch(createConversation({})).unwrap();
            activeChatId = newConv.id;
            if (activeChatId && activeChatId !== chatId) {
                navigate(`/chat/${activeChatId}`, { replace: true });
            }
        }

        // Add user message immediately to UI
        dispatch(addUserMessage({ chatId: activeChatId, userMessage, }));

        // Clear input field
        dispatch(setChatInput(""));

        // Send message to backend
        dispatch(sendMessageAPI({ chatId: activeChatId, userMessage, question: userMessage.content, }));

    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey && !loading) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="border-t border-gray-300/80 bg-white p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <InputTextarea
                    value={chatInputValue}
                    onChange={(e) => dispatch(setChatInput(e.target.value))}
                    onKeyDown={handleKeyDown}
                    placeholder={t.typeMessage}
                    className="flex-1 border border-gray-300/80 rounded-md p-2 bg-gray-100/40 text-[#1d2530] placeholder:text-[#627084] text-sm focus:outline-none focus:ring-2 focus:ring-[#066ff9]"
                    rows={2}
                    autoResize
                    style={{ resize: "none" }}
                />
                <Button
                    disabled={loading}
                    type="submit"
                    className="h-[60px] w-[60px] rounded-xl transition-colors bg-[#066ff9] text-white hover:bg-[#066ff9e6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    icon={<Send className="h-4 w-4" />}
                />
            </form>
        </div>
    );
};

export default ChatInput;
