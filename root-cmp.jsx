const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;
import { AppHeader } from './cmps/AppHeader.jsx';
import { MainApp } from './pages/MainApp.jsx';
import { UserMail } from './pages/UserMail.jsx';
import { Home } from './pages/home.jsx';

// Simple React Component
export function App() {
  return (
    <Router>
      <header>
        <AppHeader />
      </header>

      <section className="app">
        <Switch>
          {/* <Route path="/about" component={About} /> */}
          <Route path="/" component={MainApp} />
          {/* <Route path="/" activeClassName="my-active" component={Home} /> */}
        </Switch>
      </section>
    </Router>
  );
}
