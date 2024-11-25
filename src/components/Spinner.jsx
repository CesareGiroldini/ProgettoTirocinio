import { useLoading } from "../contexts/LoadingContext.jsx";
import "./css/Spinner.css";

export const Spinner = () => {
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (
        <div className="spinner-overlay">
            <div className="spinner"></div>
        </div>
    );
};
