const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;
import { MainApp } from './pages/MainApp.jsx';
import { UserMsg } from './cmps/user-msg.jsx';
import { Mail } from './pages/Mail.jsx';
import { Keep } from './pages/Keep.jsx';
import { CreatUser } from './pages/CreateUser.jsx';
import { BookApp } from './pages/BookApp.jsx';
import { BookDetails } from './pages/BookDetails.jsx';

// Simple React Component
export function App() {
  return (
    <Router>
      <section className="app">
        <Switch>
          {/* <Route path="/about" component={About} /> */}
          <Route path="/user/:userId/keep" component={Keep} />
          <Route path="/book/:bookId" component={BookDetails} />
          <Route path="/user/:userId/mail" component={Mail} />
          <Route path="/book" component={BookApp} />
          <Route path="/user/create" component={CreatUser} />
          <Route path="/" component={MainApp} />
          {/* <Route path="/" activeClassName="my-active" component={Home} /> */}
        </Switch>
      </section>
      <UserMsg />
    </Router>
  );
}
