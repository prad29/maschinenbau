import { useEffect, useRef, useState } from 'react';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatHistory from '@/components/chat/ChatHistory';
import MessageBubble from '@/components/chat/MessageBubble';
import ChatInput from '@/components/chat/ChatInput';
import { Sidebar } from 'primereact/sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getConversationById } from '../store/chat_store/chat.action';
import { setCurrentConversation } from '../store/chat_store/chat.reducer';

const Chat = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { chatId } = params;

    const messagesEndRef = useRef(null);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const currentConversation = useSelector((state) => state?.chat?.currentConversation);
    const loading = useSelector((state) => state?.chat?.loading);

    useEffect(() => {
        if (chatId && chatId !== currentConversation?.id) {
            dispatch(getConversationById({ id: chatId }));
        }
        if (!chatId) {
            dispatch(setCurrentConversation(null));
        }
    }, [chatId]);

    useEffect(() => {
        const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        };
        scrollToBottom();
    }, [currentConversation?.messages?.length]);
    
    return (
        <div className="h-screen flex flex-col w-full bg-[#f8fafc]">
            <div className="sticky top-0 z-20 bg-white shadow-sm">
                <ChatHeader onToggleSidebar={() => setSidebarOpen(true)} />
            </div>
            <div className="flex-1 flex min-h-0">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:block w-80 border-r border-[#d7dfea] overflow-y-auto">
                    <ChatHistory />
                </aside>
                {/* Mobile Sidebar */}
                <Sidebar
                    visible={sidebarOpen}
                    onHide={() => setSidebarOpen(false)}
                    position="left"
                    className="w-80 shadow-xl"
                    showCloseIcon={false}
                >
                    <ChatHistory onClose={() => setSidebarOpen(false)} />
                </Sidebar>
                {/* Main Chat Area */}
                <main className="flex-1 flex flex-col min-h-0">
                    <div className="flex-1 overflow-y-auto container mx-auto space-y-4 p-4 w-full">
                        {currentConversation ? (
                            currentConversation?.messages?.map((message) => (
                                <MessageBubble key={message?.id} message={message} />
                            ))
                        ) : (
                            <div className="flex items-center justify-center h-full text-center text-[#627084]">
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-semibold">Welcome to ChatBot</h2>
                                    <p>Select a conversation or start a new one</p>
                                </div>
                            </div>
                        )}
                        {loading && <TypingIndicator />}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className=" bg-white sticky bottom-0">
                        <ChatInput />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Chat;

const TypingIndicator = () => {
    const phrases = [

        "  Thinking about the query",
        "  Understanding the table schema and underlying data",
        "  Generating a plan to come up with answers and insights",
        "  Performing accurate NL2SQL conversion",
        "  Making API calls to BigQuery",
        "  Fetching SQL response from BigQuery",
        "  Processing result",

    ];
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [phrases.length]);

    return (
        <div className="flex max-w-[80%] self-start animate-fadeIn message bot typing-indicator">
            <div className="px-4 py-2.5 rounded-xl leading-relaxed break-words text-left text-[0.9rem] border border-gray-300  bg-gray-100 shadow-none flex items-center gap-3">
                <div className="flex items-center gap-1">
                    <span className="w-[7px] h-[7px] bg-gray-400 rounded-full animate-bounce [animation-delay:-0.32s]"></span>
                    <span className="w-[7px] h-[7px] bg-gray-400 rounded-full animate-bounce [animation-delay:-0.16s]"></span>
                    <span className="w-[7px] h-[7px] bg-gray-400 rounded-full animate-bounce"></span>
                </div>
                <div className="text-[0.9rem] text-gray-500">
                    {phrases[currentPhraseIndex]}
                </div>
            </div>
        </div>
    );
};