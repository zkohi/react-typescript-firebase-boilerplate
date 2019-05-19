import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "~/Home";

const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
