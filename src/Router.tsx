import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin></Coin>
        </Route>
        <Route exact path="/">
          <Coins></Coins>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
