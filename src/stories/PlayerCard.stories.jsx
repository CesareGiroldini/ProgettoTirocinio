import PlayerCard from "../components/PlayerCard";
import avatarX from "../assets/icon_PlayerX.png";
import avatarO from "../assets/icon_PlayerO.png";


export default {
    title: "TicTacToe/PlayerCard",
    component: PlayerCard,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Il componente **PlayerCard** rappresenta la card che mostra il turno con il giocatore successivo.' +
                    ' Il programma utilizza una libreria chiamata **i18next** per gestire le traduzioni delle stringhe contenute nella card a seconda della lingua selezionata.',
            },
        },
    },
    argTypes: {
        nextPlayer: {
            description: 'Stringa che mostra il giocatore successivo',
            control: { type: 'select' },
            options: ['X','O']
        },
        avatar: {
            description: 'Path per una immagine contenente un avatar per il giocatore successivo.',
            control: { type: 'select' },
            options: [avatarX,avatarO]
        },
    }
};

const Template = (args) => <PlayerCard {...args} />;

export const PlayerX = Template.bind({});
PlayerX.args = {
    nextPlayer: "X",
    avatar: avatarX,
};

export const PlayerO = Template.bind({});
PlayerO.args = {
    nextPlayer: "O",
    avatar: avatarO,
};
