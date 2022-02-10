import ReactDOM from "react-dom";

//router  setup
import { HashRouter as Router } from "react-router-dom";

// import all styles , load theme style first
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./styles/custom-antd.css";
import "./styles/theme.css";
import "./styles/index.css";

//redux setup
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";

import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
    {/* </React.StrictMode> */}
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
