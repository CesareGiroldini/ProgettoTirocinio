import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import './css/LanguageSelector.css';

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const [currentLang, setCurrentLang] = useState(i18n.language);
    const overlayPanel = useRef(null);
    const languageOptions = [
        { code: 'en', label: 'English', flag: '🇬🇧' },
        { code: 'it', label: 'Italiano', flag: '🇮🇹' },
        { code: 'es', label: 'Español', flag: '🇪🇸' },
        { code: 'fr', label: 'Français', flag: '🇫🇷' },
        { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    ];

    const handleLanguageChange = (lang) => {
        i18n.changeLanguage(lang);
        setCurrentLang(lang);
    };

    return (
        <div className="language-selector">
            <Button
                label={<span className="flag">{languageOptions.find(lang => lang.code === currentLang)?.flag || '🌐'}</span>}
                onClick={(e) => overlayPanel.current.toggle(e)}
                className="p-button-text"
                aria-label="Select Language"
            />
            <OverlayPanel ref={overlayPanel}>
                {languageOptions.map((lang) => (
                    <Button
                        key={lang.code}
                        label={`${lang.flag} ${lang.label}`}
                        onClick={() => handleLanguageChange(lang.code)}
                        className="language-button"
                    />
                ))}
            </OverlayPanel>
        </div>
    );
};

export default LanguageSelector;
