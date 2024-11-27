import {useEffect, useState} from "react";
import {useAuth} from "../contexts/AuthContext";
import {fetchUsers, getUserMatches, toggleUserStatus} from "../services/UserService.js";
import {useLoading} from "../contexts/LoadingContext.jsx";
import {calculateStatistics} from "../utils/calculateStats.js";
import {Card} from "primereact/card";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {Accordion, AccordionTab} from "primereact/accordion";
import "./css/Admin.css";

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showMatches, setShowMatches] = useState(false);
    const [statistics, setStatistics] = useState({
        total: 0,
        wins: 0,
        losses: 0,
        cpuWins: 0,
    });
    const {user, logout} = useAuth();
    const {showLoading, hideLoading} = useLoading();

    const useIsMobile = () => {
        const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

        useEffect(() => {
            const handleResize = () => setIsMobile(window.innerWidth <= 768);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);

        return isMobile;
    };

    const isMobile = useIsMobile();

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const users = await fetchUsers();
                const filteredUsers = users.filter((user) => user.role !== "admin");
                setUsers(filteredUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchAllUsers();
    }, []);

    const fetchMatches = async (user) => {
        showLoading();
        setSelectedUser(user);
        setShowMatches(true);
        try {
            const matchesData = await getUserMatches(user.username);
            const stats = calculateStatistics(matchesData);
            setStatistics(stats);
        } catch (error) {
            console.error("Error fetching matches:", error);
        }
        hideLoading();
    };

    const toggleUserStatusAdmin = async (userId, currentStatus) => {
        try {
            await toggleUserStatus(userId, currentStatus);

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId ? {...user, active: !currentStatus} : user
                )
            );
        } catch (error) {
            console.error("Error updating user status:", error);
        }
    };

    return (
        <div className="admin-page">
            <Card title="Admin Panel" className="admin-card">
                <div className="admin-header">
                    <Button
                        label="Logout"
                        icon="pi pi-sign-out"
                        className="p-button-danger p-button-sm"
                        onClick={logout}
                    />
                </div>
                <p className="p-text-secondary">Manage users and their matches.</p>

                {!isMobile ? (
                    <DataTable value={users} paginator rows={5} className="p-datatable-striped">
                        <Column field="username" header="Username" sortable/>
                        <Column field="email" header="Email"/>
                        <Column field="role" header="Role" body={(rowData) => rowData.role || "User"}/>
                        <Column
                            field="active"
                            header="Status"
                            body={(rowData) => (rowData.active ? "Active" : "Banned")}
                        />
                        <Column
                            header="Actions"
                            body={(rowData) => (
                                <div className="action-buttons">
                                    <Button
                                        label="View Matches"
                                        icon="pi pi-eye"
                                        className="p-button-info p-button-sm"
                                        onClick={() => fetchMatches(rowData)}
                                    />
                                    <Button
                                        label={rowData.active ? "Ban" : "Unban"}
                                        icon={rowData.active ? "pi pi-ban" : "pi pi-check"}
                                        className={`p-button-sm ${
                                            rowData.active ? "p-button-danger" : "p-button-success"
                                        }`}
                                        onClick={() => toggleUserStatusAdmin(rowData.id, rowData.active)}
                                    />
                                </div>
                            )}
                        />
                    </DataTable>
                ) : (
                    <Accordion>
                        {users.map((user) => (
                            <AccordionTab key={user.id} header={user.username}>
                                <div className="user-details">
                                    <p>
                                        <strong>Email:</strong> {user.email}
                                    </p>
                                    <p>
                                        <strong>Role:</strong> {user.role || "User"}
                                    </p>
                                    <p>
                                        <strong>Status:</strong> {user.active ? "Active" : "Banned"}
                                    </p>
                                    <div className="actions">
                                        <Button
                                            label="Stats"
                                            icon="pi pi-eye"
                                            className="p-button-info p-button-sm"
                                            onClick={() => fetchMatches(user)}
                                        />
                                        <Button
                                            label={user.active ? "Ban" : "Unban"}
                                            icon={user.active ? "pi pi-ban" : "pi pi-check"}
                                            className={`p-button-sm ${
                                                user.active ? "p-button-danger" : "p-button-success"
                                            }`}
                                            onClick={() => toggleUserStatusAdmin(user.id, user.active)}
                                        />
                                    </div>
                                </div>
                            </AccordionTab>
                        ))}
                    </Accordion>
                )}
            </Card>

            <Dialog
                header={`${selectedUser ? selectedUser.username : ""}'s matches`}
                visible={showMatches}
                style={{width: "50vh"}}
                onHide={() => setShowMatches(false)}
                closable={true}
                closeIcon={"pi pi-times"}
            >
                {selectedUser ? (
                    <div>
                        <h3>Statistics for {selectedUser.username}</h3>
                        <p>Total matches: {statistics.total}</p>
                        <p>Wins: {statistics.wins}</p>
                        <p>Losses: {statistics.losses}</p>
                        <p>CPU Wins: {statistics.cpuWins}</p>
                    </div>
                ) : (
                    <p>No user selected.</p>
                )}
            </Dialog>
        </div>
    );
};

export default Admin;
