import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import './css/Auth.css';
import { Divider } from 'primereact/divider';
import { Password } from 'primereact/password';
import LanguageSelector from '../components/LanguageSelector.jsx';
import { useTranslation } from 'react-i18next';
import { useLoading } from '../contexts/LoadingContext.jsx';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [bannedDialogVisible, setBannedDialogVisible] = useState(false);
    const { login } = useContext(AuthContext);
    const { showLoading, hideLoading } = useLoading();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleLogin = async () => {
        const errors = {};
        if (!username) errors.username = "Username can't be empty";
        if (!password) errors.password = "Password can't be empty";

        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            showLoading();
            const success = await login(username, password);
            hideLoading();

            if (success) {
                navigate('/menu');
            } else if (success === null) {
                setBannedDialogVisible(true);
            } else {
                setErrors({ general: "Invalid username or password" });
            }
        }
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <>
            <LanguageSelector />
            <div className="auth-card">
                <div className="flex flex-column md:flex-row">
                    <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-3 md:py-5">
                        <div className="field">
                            <label className="sm:w-6rem sm:text-sm text-lg">Username</label>
                            <InputText
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="md:w-12rem"
                                invalid={errors.username && !!errors.username}
                            />
                            {errors.username && (
                                <small className="p-error">{errors.username}</small>
                            )}
                        </div>
                        <div className="field">
                            <label className="sm:w-6rem sm:text-sm text-lg">Password</label>
                            <Password
                                id="password"
                                type="password"
                                toggleMask
                                feedback={false}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="md:w-12rem"
                                invalid={errors.password}
                            />
                            {errors.password && (
                                <small className="p-error">{errors.password}</small>
                            )}
                        </div>
                        <Button
                            onClick={handleLogin}
                            label={t('login')}
                            icon="pi pi-user"
                            className="w-15rem h-3rem md:w-10rem mx-auto mt-4"
                        />
                    </div>
                    <div className="w-full md:w-2">
                        <Divider layout="vertical" className="hidden text-black-alpha-70 md:flex">
                            <b></b>
                        </Divider>
                        <Divider layout="horizontal" className="flex md:hidden" align="center">
                            <b></b>
                        </Divider>
                    </div>
                    <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
                        <Button
                            onClick={handleRegister}
                            label={t('register')}
                            icon="pi pi-user-plus"
                            severity="success"
                            className="w-15rem h-3rem md:w-10rem"
                        />
                    </div>
                </div>
            </div>

            <Dialog
                header="Account Bannato"
                closeIcon={'pi pi-times'}
                visible={bannedDialogVisible}
                style={{ width: '50vw' }}
                onHide={() => setBannedDialogVisible(false)}
                modal
                closable
                draggable={false}
            >
                <p>
                    Sembra che questo account sia stato bannato. Contatta l'assistenza
                    o utilizza un altro account per procedere.
                </p>
                <div className="flex items-center justify-content-center">
                    <Button onClick={() => setBannedDialogVisible(!bannedDialogVisible)}>Ho capito.</Button>
                </div>
            </Dialog>
        </>
    );
};

export default Login;
