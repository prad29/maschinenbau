import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ScrollPanel } from 'primereact/scrollpanel';
import { MessageSquare, Plus } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentConversation } from '../../store/chat_store/chat.reducer';
import { useNavigate } from 'react-router-dom';
import { translations } from '../../lib/mockData';

const ChatHistory = ({ onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const language = useSelector((state) => state?.chat?.language);
    const conversations = useSelector((state) => state?.chat?.conversations)
    const currentConversation = useSelector((state) => state?.chat?.currentConversation)
    const t = translations[language];
    const handleSelectConversation = (cId) => {
        navigate(`/chat/${cId}`)
        onClose?.();
    };
    const handleNewChat = () => {
        dispatch(setCurrentConversation(null));
        navigate(`/chat`)
        onClose?.();
    };
    return (
        <div className="h-full flex flex-col bg-[#f5f7f9]">
            <div className="p-4 border-b border-[#dee4ed] space-y-3">
                <h2 className="text-lg font-semibold text-sidebar-foreground">{t.chatHistory}</h2>
                <Button
                    onClick={handleNewChat}
                    className="w-full bg-blue-600 text-sm font-medium text-white inline-flex items-center justify-center gap-2 rounded-lg p-2.5 hover:bg-blue-700 transition-colors duration-200 ease-in-out [&_.p-button-label]:flex-none!"
                >
                    <Plus className="h-4 w-4" />
                    <label htmlFor="newChat">{t?.newChat}</label>
                </Button>
            </div>
            <ScrollPanel style={{ width: '100%', height: '100%' }} className="flex-1 max-h-[90vh] md:max-h-[80vh] overflow-y-auto">
                <div className="p-4 space-y-2">
                    {conversations?.map((conversation) => (
                        <Card
                            key={conversation.id}
                            className={`rounded-lg border border-[#d7dfea] bg-card text-card-foreground shadow-sm p-3 cursor-pointer transition-colors hover:bg-[#ecf4fe] ${currentConversation?.id === conversation.id
                                ? 'bg-[#ecf4fe] border-[#066ff9]'
                                : 'bg-[#f5f7f9] border-[#dee4ed]'
                                }`}
                            onClick={() => handleSelectConversation(conversation.id)}
                        >
                            <div className="flex items-start gap-3">
                                <MessageSquare className="h-4 w-4 mt-1 text-sidebar-foreground flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-sm text-sidebar-foreground truncate">
                                        {conversation.title}
                                    </h3>
                                    <p className="text-xs text-[#627084]">
                                        {new Date(conversation?.timestamp).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </ScrollPanel>
        </div>
    );
};
export default ChatHistory;
