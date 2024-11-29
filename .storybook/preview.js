//import('@storybook/react').Preview
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import '../src/style.css'
import '../src/pages/css/Game.css'

global.jest = {
  fn: () => {},
};

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  tags: ["autodocs"]
};

export default preview;
