import Cell from '../components/Cell.jsx';

export default {
  title: 'TicTacToe/Cell',
  component: Cell,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Il componente **Cell** rappresenta una singola cella della griglia di gioco. Può essere cliccata per eseguire un’azione.',
      },
    },
  },
  argTypes: {
    value: {
      description: 'Il valore corrente della cella (X, O, o vuoto/null).',
      control: { type: 'select' },
      options: ['X', 'O', null],
    },
    onClick: {
      description: 'Funzione chiamata quando la cella viene cliccata.',
      action: 'clicked',
    },
  },
};

const Template = (args) => <Cell {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  value: null,
};
Empty.storyName = 'Empty Cell';
Empty.parameters = {
  docs: {
    description: {
      story: 'Una cella vuota senza alcun valore.',
    },
  },
};

export const XCell = Template.bind({});
XCell.args = {
  value: 'X',
};
XCell.storyName = 'Cell with X';
XCell.parameters = {
  docs: {
    description: {
      story: 'Una cella contenente il simbolo "X".',
    },
  },
};

export const OCell = Template.bind({});
OCell.args = {
  value: 'O',
};
OCell.storyName = 'Cell with O';
OCell.parameters = {
  docs: {
    description: {
      story: 'Una cella contenente il simbolo "O".',
    },
  },
};
