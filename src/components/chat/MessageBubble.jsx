import { User, Bot } from 'lucide-react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const MessageBubble = ({ message }) => {

    const isUser = message.role === 'user';

    const renderContent = () => {
        if (message.contentType === 'table' && message.tableData) {
            return (
                <div className="space-y-2">
                    <p className="mb-2">{message.content}</p>
                    <div className="overflow-x-auto rounded-lg border border-[#d7dfea]">
                        <table className="w-full">
                            <thead className="bg-muted">
                                <tr>
                                    {message.tableData.headers.map((header, idx) => (
                                        <th key={idx} className="px-4 py-2 text-left text-sm font-semibold">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {message.tableData.rows.map((row, rowIdx) => (
                                    <tr key={rowIdx} className="border-t border-[#d7dfea]">
                                        {row.map((cell, cellIdx) => (
                                            <td key={cellIdx} className="px-4 py-2 text-sm">
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
        if (message.imageUrl) {
            return (
                <div className="space-y-2">
                    <p className="mb-2">{message.content}</p>
                    <img
                        src={message.imageUrl}
                        alt="Message content"
                        className="rounded-lg max-w-full h-auto"
                    />
                </div>
            );
        }
        return (
            <div className="no-tailwind max-w-full">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                >
                    {message.content}
                </ReactMarkdown>
            </div>
        );
    };
    return (
        <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} animate-slide-up duration-300`}>
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-[#066ff9] text-white' : 'bg-white text-[#1d2530] border border-[#d7dfea]'
                }`}>
                {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>

            <div className={`rounded-xl border border-[#d7dfea] bg-card text-card-foreground shadow-sm max-w-[80%] p-4 ${isUser
                ? 'bg-[#066ff9] text-white'
                : 'bg-white text-[#1d2530]'
                }`}>
                {renderContent()}
                <div className={`text-xs mt-2 ${isUser ? 'text-white/70' : 'text-[#627084]'}`}>
                    {new Date(message?.timestamp)?.toLocaleDateString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
        </div>
    );
};
export default MessageBubble;
