import { muiTheme } from 'storybook-addon-material-ui5'
import { MemoryRouter } from "react-router";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
	muiTheme(),
  (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
];