import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import {Card} from 'primereact/card';
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {Button} from 'primereact/button';
import './css/Auth.css';
import {validateUsername, validateEmail, validatePassword, validateConfirmPassword} from "../utils/validation.js";
import "../i18n.js";
import {useTranslation} from "react-i18next";
import {useLoading} from "../contexts/LoadingContext.jsx";
import {loginUser, signUpUser} from "../services/UserService.js";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [registered, setIsRegistered] = useState(false);
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {showLoading, hideLoading} = useLoading();

    const handleSignUp = async () => {
        const usernameError = validateUsername(username);
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);
        const confirmPasswordError = validateConfirmPassword(password, confirmPassword);

        setErrors({
            username: usernameError !== true ? usernameError : null,
            email: emailError !== true ? emailError : null,
            password: passwordError !== true ? passwordError : null,
            confirmPassword: confirmPasswordError !== true ? confirmPasswordError : null,
        });

        if (!usernameError && !emailError && !passwordError && !confirmPasswordError) {
            showLoading();
            await signUpUser({username, email, password});
            const user = await loginUser(username, password);
            hideLoading();

            if (user) {
                setIsRegistered(true);
                console.log('Utente registrato correttamente:', user);
            } else {
                console.error('Registrazione fallita');
            }
        }
    };

    useEffect(() => {
        if (registered) {
            navigate('/login');
        }
    }, [registered, navigate]);

    const footer = (
        <div className="mt-4 w-full flex flex-wrap justify-center gap-4">
            <Button label={t('save')} onClick={handleSignUp} icon="pi pi-check" className="p-button-success"/>
            <Button label={t('cancel')} icon="pi pi-times" className="p-button-secondary"
                    onClick={() => navigate('/')}/>
        </div>
    );

    return (
        <>
            <Card title="Registrazione" className="auth-card flex-column mt-4 py-6 " footer={footer}>
                <div className="flex gap-4">
                    <div className="registerfield ">
                        <label htmlFor="username">Username</label>
                        <InputText
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full"
                            invalid={errors.username && !!errors.username}
                        />
                        {errors.username &&
                            <small className={`p-error ${errors.username ? 'active' : ''}`}>{errors.username}</small>}
                    </div>
                    <div className="registerfield">
                        <label htmlFor="email">Email</label>
                        <InputText
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full"
                            invalid={errors.email}
                        />
                        {errors.email &&
                            <small className={`p-error ${errors.email ? 'active' : ''}`}>{errors.email}</small>}
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="registerfield">
                        <label htmlFor="password">Password</label>
                        <Password
                            toggleMask
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            feedback={true}
                            className="w-full"
                            invalid={errors.password}
                        />
                        {errors.password &&
                            <small className={`p-error ${errors.password ? 'active' : ''}`}>{errors.password}</small>}
                    </div>
                    <div className="registerfield">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <Password
                            toggleMask
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            feedback={false}
                            className="w-full"
                            invalid={errors.confirmPassword}
                        />
                        {errors.confirmPassword && <small
                            className={`p-error ${errors.confirmPassword ? 'active' : ''}`}>{errors.confirmPassword}</small>}
                    </div>
                </div>
            </Card>
        </>
    );
};

export default Register;
