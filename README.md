Il progetto prevede la creazione di un sito in React che permette di giocare a Tic Tac Toe. Di seguito le richieste specifiche del progetto:

1. Setup del Progetto
• Utilizza Create React App per creare un’app internazionalizzata e
responsive.
• Installa le librerie necessarie:
i. PrimeReact (per UI e componenti personalizzati, come Dialog,
Button, etc.).
ii. React Router per il routing.
iii. Storybook per lo sviluppo e la documentazione dei componenti
base.
iv. Axios (per mocking API, come il login/registrazione e gestione
delle partite salvate).
2. Componenti base (con Storybook)
• Utilizza Storybook per sviluppare e documentare i componenti base,
in modo da poterli testare indipendentemente.
i. Cell: Un componente che rappresenta una singola cella della
griglia (es. X, O o vuoto).
ii. Board: Il tabellone di gioco (griglia 3x3), che include 9 celle e
gestisce lo stato delle mosse.
iii. PlayerCard: Un componente che mostra il giocatore corrente
(nome, segno X o O).
3. Pagine principali
• Login: Form di login per accedere al sistema.
• Registrazione: Form per creare un nuovo account.
• Menu principale:
i. Avvia una nuova partita (giocatore vs CPU o giocatore vs
giocatore locale).
ii. Visualizza le partite precedenti (salvate durante la sessione).
• Gioco (Tic Tac Toe):
i. Visualizza il tabellone con la logica del gioco.
ii. Modalità PvP (due giocatori umani) e CPU (giocatore vs
computer, con algoritmo Minimax).
• Partite Disputate: Elenco delle partite giocate, con possibilità di
rivedere le mosse.
• Admin: Pannello di controllo per gestire gli utenti e visualizzare le
statistiche di gioco.
4. Login & Registrazione
• Implementa le pagine di Login e Registrazione, utilizzando
PrimeReact per componenti come InputText e Password. Mocka il
servizio di autenticazione in questa fase iniziale, simulando un
backend.
5. Gestione dello stato globale (Context API)
• AuthContext: Gestisce lo stato dell'utente loggato (e.g. token JWT,
nome, ruolo).
• GameContext: Gestisce lo stato della partita corrente (giocatori,
mosse, turno attuale, risultato).
6. Algoritmo Minimax per la CPU
• Utilizza l'algoritmo Minimax, un classico algoritmo utilizzato per giochi
a somma zero come Tic Tac Toe, per implementare la logica della CPU.
Il Minimax cerca di massimizzare le mosse del computer e minimizzare
le mosse del giocatore avversario.
• Un esempio semplificato del Minimax per Tic Tac Toe:
// src/utils/minimax.ts
const minimax = (board: string[], depth: number, isMaximizing:
boolean): number => {
const winner = checkWinner(board);
if (winner === 'X') return -10; // Giocatore
if (winner === 'O') return 10; // CPU
if (isBoardFull(board)) return 0;
if (isMaximizing) {
let bestScore = -Infinity;
for (let i = 0; i < board.length; i++) {
if (board[i] === '') {
board[i] = 'O';
let score = minimax(board, depth + 1, false);
board[i] = '';
bestScore = Math.max(score, bestScore);
}
}
return bestScore;
} else {
let bestScore = Infinity;
for (let i = 0; i < board.length; i++) {
if (board[i] === '') {
board[i] = 'X';
let score = minimax(board, depth + 1, true);
board[i] = '';
bestScore = Math.min(score, bestScore);
}
}
return bestScore;
}
};
export const findBestMove = (board: string[]): number => {
let bestScore = -Infinity;
let bestMove = -1;
for (let i = 0; i < board.length; i++) {
if (board[i] === '') {
board[i] = 'O';
let score = minimax(board, 0, false);
board[i] = '';
if (score > bestScore) {
bestScore = score;
bestMove = i;
}
}
}
return bestMove;
};
7. Pannello Admin
• Implementa una pagina dedicata agli admin per:
i. Visualizzare le statistiche globali (es. partite giocate, vittorie
giocatore vs CPU, tempo medio per partita).
ii. Bloccare/sbloccare utenti: Mocka il sistema di gestione utenti,
consentendo all'admin di bloccare giocatori che infrangono le
regole.
8. Mocking dei servizi
• Mocka i seguenti servizi:
i. Autenticazione: Login e registrazione.
ii. Partite salvate: Ritorna una lista di partite giocate dall'utente.
iii. Statistica: Fornisce statistiche aggregate per l'admin.
9. Routing (React Router)
• /login: Schermata di login.
• /register: Schermata di registrazione.
• /menu: Menu principale (gioca nuova partita, visualizza partite
disputate).
• /game: Schermata di gioco.
• /games: Elenco delle partite disputate.
• /admin: Pannello admin (protetto).
