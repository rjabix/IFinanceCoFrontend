import {useState} from "react";
import {FiLock, FiMail} from "react-icons/fi";
import {Login, SignUp} from "../../utils/BackendHandler";
import {useNavigate} from "react-router-dom";

export default function LoginPage(){

    const [login, setLogin] = useState(true);

    return (
        login ? (
            <LoginCardPage setLogin={setLogin}/>
        ) : (
            <SignUpCardPage setLogin={setLogin}/>
        )
    );
}


const LoginCardPage = ({ setLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [shownPassword, setShownPassword] = useState(false);
    const [errors, setErrors] = useState({ email: "", password: "" });

    const navigate = useNavigate();

    const handleLogin = () => {
        let newErrors = { email: "", password: "" };
        if (!email) newErrors.email = "Email is required";
        else if (!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            newErrors.email = "Email is invalid";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{6,}$/)) {
            newErrors.password = "Password must be at least 6 characters long, contain at least one digit, one lowercase letter, one uppercase letter, and one non-alphanumeric character";
        }

        setErrors(newErrors);

        if (Object.values(newErrors).some(error => error)) return;

        setIsLoading(true);
        Login(email, password).then(r => {
            if(r.status === 200)
                navigate('/dashboard');
            else(console.log("login failed"));
            setIsLoading(false);
        }).catch(e => console.log(e));
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
            <div className="bg-gray-800 p-12 rounded-lg shadow-lg w-full max-w-6xl flex">
                <div className="flex-1">
                    <div className="text-center mb-8">
                        <h2 className="text-lg font-semibold">START FOR FREE</h2>
                        <h1 className="text-4xl font-bold mt-2">
                            Login<span className="text-blue-500">.</span>
                        </h1>
                        <p className="mt-2">
                            Don't have an account?{" "}
                            <button onClick={() => setLogin(false)} className="text-blue-400 hover:underline">
                                Sign Up
                            </button>
                        </p>
                    </div>

                    <form className="space-y-6 w-full">
                        <FloatingInput
                            value={email}
                            onChange={setEmail}
                            label="Email"
                            id="email"
                            icon={<FiMail className="text-white text-xl" />}
                            OnClick={() => {}}
                            type="email"
                            error={errors.email}
                        />
                        <FloatingInput
                            value={password}
                            onChange={setPassword}
                            label="Password"
                            id="password"
                            type={shownPassword ? "text" : "password"}
                            OnClick={() => setShownPassword(!shownPassword)}
                            icon={<FiLock className="text-white text-xl" />}
                            error={errors.password}
                        />
                    </form>

                    <div className="mt-8 flex justify-end">
                        <LastButton
                            onClick={handleLogin}
                            text="Login"
                            isLoading={isLoading}
                        />
                    </div>
                </div>

                <div className="hidden md:flex flex-1 items-center justify-center">
                    <div className="w-80 h-80 bg-gray-700 rounded-lg flex items-center justify-center">
                        <p className="text-gray-400">Your image or content here</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SignUpCardPage = ({setLogin}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [shownPassword, setShownPassword] = useState(false);
    const [shownConfirmPassword, setShownConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({ email: "", password: "", confirmPassword: "" });

    const navigate = useNavigate();

    const handleCreateAccount = () => {
        let newErrors = { email: "", password: "", confirmPassword: "" };
        if (!email) newErrors.email = "Email is required";
        else if(!email.toLowerCase()
            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        )
            newErrors.email = "Email is invalid";

        if (!password) {
            newErrors.password = "Password is required";
        } else if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{6,}$/)) {
            newErrors.password = "Password must be at least 6 characters long, contain at least one digit, one lowercase letter, one uppercase letter, and one non-alphanumeric character";
        }
        if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";

        setErrors(newErrors);

        if (Object.values(newErrors).some(error => error)) return;

        setIsLoading(true);
        SignUp(email, password).then(r => {
            if(r.status === 200)
                navigate('/dashboard');
            else(console.log("signup failed"));
            setIsLoading(false);
        }).catch(e => console.log(e));

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
            <div className="bg-gray-800 p-12 rounded-lg shadow-lg w-full max-w-6xl flex">
                <div className="flex-1">
                    <div className="text-center mb-8">
                        <h2 className="text-lg font-semibold">START FOR FREE</h2>
                        <h1 className="text-4xl font-bold mt-2">
                            Create new account<span className="text-blue-500">.</span>
                        </h1>
                        <p className="mt-2">
                            Already a Member?{" "}
                            <button onClick={() => setLogin(true)} className="text-blue-400 hover:underline bg-none">
                                Log In
                            </button>
                        </p>
                    </div>

                    <form className="space-y-6 w-full">
                        <FloatingInput
                            value={email}
                            onChange={setEmail}
                            label="Email"
                            id="email"
                            icon={<FiMail className="text-white text-xl" />}
                            OnClick={() => {}}
                            type="email"
                            error={errors.email}
                        />
                        <FloatingInput
                            value={password}
                            onChange={setPassword}
                            label="Password"
                            id="password"
                            type={shownPassword ? "text" : "password"}
                            OnClick={() => setShownPassword(!shownPassword)}
                            icon={<FiLock className="text-white text-xl" />}
                            error={errors.password}
                        />
                        <FloatingInput
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                            label="Confirm Password"
                            id="confirmPassword"
                            type={shownConfirmPassword ? "text" : "password"}
                            OnClick={() => setShownConfirmPassword(!shownConfirmPassword)}
                            icon={<FiLock className="text-white text-xl" />}
                            error={errors.confirmPassword}
                        />
                    </form>

                    <div className="mt-8 flex justify-end">
                        <LastButton
                            onClick={handleCreateAccount}
                            text="Sign Up"
                            isLoading={isLoading}
                        />
                    </div>
                </div>

                <div className="hidden md:flex flex-1 items-center justify-center">
                    <div className="w-80 h-80 bg-gray-700 rounded-lg flex items-center justify-center">
                        <p className="text-gray-400">Your image or content here</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FloatingInput = ({ value, onChange, label, id, icon, type, OnClick, error }) => {
    const handleClick = (e) => {
        e.preventDefault();
        OnClick();
    };

    return (
        <div className="relative w-full">
            <input
                type={type || "text"}
                id={id}
                name={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full px-4 py-4 pr-10 text-white bg-[#2a2a40] rounded-lg outline-none focus:ring-2 ${error ? 'focus:ring-red-500 border-red-500' : 'focus:ring-blue-500 border-transparent'} peer h-16`}
                placeholder=" "
                style={{ borderWidth: '2px' }}
            />
            <label
                htmlFor={id}
                className="absolute left-4 top-2 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-blue-400"
            >
                {label}
            </label>
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={handleClick}>
                {icon}
            </button>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

const LastButton = ({ onClick, text, isLoading }) => {
    return(
        <button onClick={onClick}
                className={`${isLoading ? 'animate-bounce' : ''} w-[50%] px-8 py-4 text-white bg-[#2a2a40] rounded-lg outline-none focus:ring-2 focus:ring-blue-500 peer font-sans h-16`}>
            {text}
        </button>
    )
}
