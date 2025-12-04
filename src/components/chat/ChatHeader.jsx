import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { LogOut, Globe, Menu, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/auth_store/auth.reducer';
import { setLanguage } from '../../store/chat_store/chat.reducer';
import Logo from '@/assets/stuertz-logo.svg';
import { translations } from '../../lib/mockData';

const ChatHeader = ({ onToggleSidebar }) => {
    const navigate = useNavigate();
    const language = useSelector((state) => state?.chat?.language);

    const t = translations[language];

    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
        toast.success(language === 'en' ? 'Logged out successfully' : 'Erfolgreich abgemeldet');
        navigate('/');
    };

    return (
        <header className="border-b border-gray-300/80 bg-white">
            <div className="flex items-center justify-between p-4 gap-4">
                <div className="flex items-center gap-2">
                    <Button
                        text
                        rounded
                        onClick={onToggleSidebar}
                        className="py-2 px-3 rounded-md font-medium transition-colors hover:bg-blue-50 hover:text-[#066ff9] lg:hidden!"
                        icon={<Menu className="h-4 w-4" />}
                    />
                    <div className="p-2 bg-black rounded">
                        <img src={Logo} alt="Logo" className="h-6" />
                    </div>
                </div>

                <div className="flex-1 max-w-md hidden md:block">
                    <span className="p-input-icon-left w-full flex items-center">
                        <Search className="h-4 w-4 ml-3 text-[#627084]" />
                        <InputText
                            type="text"
                            placeholder={t.searchMessages}
                            // value={searchQuery}
                            // onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 w-full border border-[#d7dfea] bg-[#f8fafc] px-3 py-2 text-base placeholder:text-gray-400 md:text-sm rounded-xl"
                        />
                    </span>
                </div>

                <div className="flex items-center">
                    <Button
                        text
                        rounded
                        onClick={() => dispatch(setLanguage(language === 'en' ? 'de' : 'en'))}
                        title={t.language}
                        icon={<Globe className="h-4 w-4" />}
                        className="py-2 px-3 rounded-md font-medium transition-colors hover:bg-blue-50 hover:text-[#066ff9] lg:hidden"
                    />
                    <Button
                        text
                        rounded
                        onClick={handleLogout}
                        title={t.logout}
                        icon={<LogOut className="h-4 w-4" />}
                        className="py-2 px-3 rounded-md font-medium transition-colors hover:bg-blue-50 hover:text-[#066ff9] lg:hidden"
                    />
                </div>
            </div>

            <div className="px-4 pb-4 md:hidden">
                <span className="p-input-icon-left w-full flex items-center">
                    <Search className="h-4 w-4 ml-3 text-[#627084]" />
                    <InputText
                        type="text"
                        placeholder={t.searchMessages}
                        // value={searchQuery}
                        // onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-full border border-[#d7dfea] bg-[#f8fafc] px-3 py-2 text-base placeholder:text-gray-400 md:text-sm rounded-xl"
                    />
                </span>
            </div>
        </header>
    );
};

export default ChatHeader;
