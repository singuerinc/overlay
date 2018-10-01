import * as React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Root } from "./components/Root";
import { App } from "./components/App";

render(
  <AppContainer>
    <Root>
      <App />
    </Root>
  </AppContainer>,
  document.getElementById("root")
);

if ((module as any).hot) {
  (module as any).hot.accept("./components/Root", () => {
    const NextRoot = require("./components/Root").default;
    render(
      <AppContainer>
        <NextRoot>
          <App />
        </NextRoot>
      </AppContainer>,
      document.getElementById("root")
    );
  });
}
