import React, {useContext, useEffect, useState} from 'react';
import {Card} from 'primereact/card';
import {getUserMatches} from "../services/UserService.js";
import './css/Matches.css';
import {AuthContext} from "../contexts/AuthContext.jsx";
import {useNavigate} from "react-router";
import {Button} from "primereact/button";
import {useTranslation} from "react-i18next";
import {useLoading} from "../contexts/LoadingContext.jsx";
import {calculateStatistics} from "@/utils/calculateStats.js";


const MatchesPage = () => {
    const [matches, setMatches] = useState([]);
    const [statistics, setStatistics] = useState({total: 0, wins: 0, losses: 0, cpuWins: 0});
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {showLoading, hideLoading} = useLoading();

    useEffect(() => {
        const fetchMatches = async () => {
            showLoading();
            const data = await getUserMatches(user);
            setMatches(data.reverse());
            const stats = calculateStatistics(data);
            setStatistics(stats);
            hideLoading();
        };

        fetchMatches();
    }, [user]);


    return (
        <div className="matches-container">
            <Card title={t('your_matches')} className="matches-card">
                <Button icon="pi pi-refresh" label={t('back_to_menu')} className="mb-5"
                        onClick={() => navigate('/menu')}></Button>
                <div className="stats">
                    <p>{t('total_games')}: {statistics.total}</p>
                    <p>{t('wins')}: {statistics.wins}</p>
                    <p>{t('losses')}: {statistics.losses}</p>
                    <p>{t('wins_vs_cpu')}: {statistics.cpuWins}</p>
                </div>
                <div className="match-list">
                    {matches.map(match => (
                        <Card
                            key={match.id}
                            title={`Match vs ${match.opponent}`}
                            className={`match-card ${match.result === "WIN" ? "win-card" : match.result === "LOSE" ? "loss-card" : ""}`}
                        >
                            <p>Result: {match.result}</p>
                            <p>Date: {match.date}</p>
                        </Card>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default MatchesPage;
