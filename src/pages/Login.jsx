import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { translations } from '@/lib/mockData';
import {  Globe, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/auth_store/auth.action';
import { setLanguage } from '../store/chat_store/chat.reducer';
import Logo from '@/assets/stuertz-logo.svg';
import { BsFillEyeFill } from "react-icons/bs"
import { BsFillEyeSlashFill } from "react-icons/bs"

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const language = useSelector((state) => state?.chat?.language);
    const loading = useSelector((state) => state.auth.loading)
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    console.log("isauthenticated", isAuthenticated)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const t = translations[language];

    const handleSuccess = () => {
        toast.success(language === 'en' ? 'Login successful!' : 'Anmeldung erfolgreich!');
        navigate('/chat');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error(language === 'en' ? 'Please fill in all fields' : 'Bitte füllen Sie alle Felder aus');
            return;
        }
        if (email !== "user@ankercloud.com" || password !== "Password@1") {
            toast.error(language === 'en' ? 'Invalid Credentials' : 'Ungültige Anmeldeinformationen');
            return;
        }
        if (email && password) {
            dispatch(login({ email, password, handleSuccess }));
        }
    };

    if (isAuthenticated) {
        return <Navigate to="/chat" replace />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50/40 p-4">

            <div className="w-full max-w-md p-8 space-y-6 shadow-lg bg-white rounded-lg border border-blue-100">
                <div className="flex justify-end">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => dispatch(setLanguage(language === 'en' ? 'de' : 'en'))}
                        className="gap-1 group hover:bg-blue-100/40 p-1 px-2 rounded-lg hover:text-blue-500  font-medium"
                    >
                        <Globe className="h-4 w-4 group-hover:text-blue-500" />
                        {language === 'en' ? 'DE' : 'EN'}
                    </Button>
                </div>
                <div className="text-center space-y-2">
                    <div className="flex justify-center mb-4">
                        <div className="p-2 bg-black rounded">
                            <img src={Logo} alt="Logo" className="h-7" /> 
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-[#1d2530]">{t.welcome}</h1>
                    <p className="text-[#627084]">{t.loginSubtitle}</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">{t.email}</label>
                        <InputText
                            id="email"
                            type="email"
                            placeholder="user@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-2! w-full border border-[#d7dfea] bg-[#f8fafc] px-3 py-2 text-base placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm rounded-lg"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">{t.password}</label>
                        <InputText
                            id="password"
                            // type="password"
                            type={showPassword ? "text" : "password"}   
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2! w-full border border-[#d7dfea] bg-[#f8fafc] px-3 py-2 text-base placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm rounded-lg"
                        />
                        {showPassword ? (
                            <BsFillEyeFill onClick={() => setShowPassword(false)} className="relative bottom-7 left-86 cursor-pointer text-gray-600" />
                        ) : (
                            <BsFillEyeSlashFill onClick={() => setShowPassword(true)} className="relative bottom-7 left-86 cursor-pointer text-gray-600" />
                        )}
                    </div>
                    <Button
                        disabled={loading}
                        type="submit"
                        className="w-full py-2 flex items-center justify-center font-medium text-white bg-blue-600 hover:bg-blue-500 disabled:bg-blue-300 whitespace-nowrap transition-colors shadow-lg rounded-lg"
                    >
                        {loading && (
                            <Loader2 size={16} className='animate-spin mr-2' />
                        )}
                        {t.login}
                    </Button>
                </form>
            </div>
        </div>
    );
};
export default Login; 
