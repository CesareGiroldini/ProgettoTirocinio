import { usePlayerCardTranslation } from "../hooks/usePlayerCardTranslation";
import { useState, useEffect } from "react";
import "./css/PlayerCard.css";

export default function PlayerCard({ nextPlayer, avatar }) {
    const { t, motivationalMessages } = usePlayerCardTranslation();
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
        const timeout = setTimeout(() => setAnimate(false), 1000);
        return () => clearTimeout(timeout);
    }, [nextPlayer]);

    const color = nextPlayer === "X" ? "red" : "blue";

    return (
        <div
            className={`playerCard ${animate ? "fadeInBounce" : ""}`}
            style={{ borderColor: color }}
        >
            <h2 style={{ color }}>{t("next_player")}: {nextPlayer}</h2>
            <div className="player-info">
                <img
                    src={avatar}
                    alt={`${nextPlayer} avatar`}
                    className="player-avatar"
                />
                <p>{motivationalMessages[nextPlayer]}</p>
            </div>
        </div>
    );
}
