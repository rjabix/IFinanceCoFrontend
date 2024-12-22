import {useState} from "react";

export default function LoginPage(){

    const [login, setLogin] = useState(true);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='bg-gray-600'>
            <div className="py-16 px-12 rounded-2xl bg-gray-700">
                <FloatingInput value={email} onChange={setEmail} label="Email" id="email" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>} />
            </div>
        </div>
    );
}

const FloatingInput = ({ value, onChange, label, id, icon }) => {
    return (
        <div className="relative w-full max-w-sm">
            <input
                type="text"
                id={id}
                name={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-4 pr-10 text-white bg-[#2a2a40] rounded-lg outline-none focus:ring-2 focus:ring-blue-500 peer h-16"
                placeholder=" "
            />
            <label
                htmlFor={id}
                className="absolute left-4 top-2 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-blue-400"
            >
                {label}
            </label>
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
        {icon}
      </span>
        </div>
    );
};

