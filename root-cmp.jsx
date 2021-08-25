const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;
import { MainApp } from './pages/MainApp.jsx';
import { UserMsg } from './cmps/user-msg.jsx';
import { Mail } from './pages/Mail.jsx';
import { Keep } from './pages/Keep.jsx';
import { CreatUser } from './pages/CreateUser.jsx';

// Simple React Component
export function App() {
  return (
    <Router>
      <section className="app">
        <Switch>
          {/* <Route path="/car/edit/:carId?" component={CarEdit} /> */}
          {/* <Route path="/car/:carId" component={CarDetails} /> */}
          {/* <Route path="/about" component={About} /> */}
          <Route path="/user/:userId/keep" component={Keep} />
          <Route path="/user/:userId/mail" component={Mail} />
          <Route path="/user/create" component={CreatUser} />
          <Route path="/" component={MainApp} />
          {/* <Route path="/" activeClassName="my-active" component={Home} /> */}
        </Switch>
      </section>
      <UserMsg />
    </Router>
  );
}
