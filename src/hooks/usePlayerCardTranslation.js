// hooks/usePlayerCardTranslation.js
import { useTranslation } from "react-i18next";

export const usePlayerCardTranslation = () => {
    const { t } = useTranslation();

    return {
        t,
        motivationalMessages: {
            X: t("player_x_message"),
            O: t("player_o_message"),
        },
    };
};
