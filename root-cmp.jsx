const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;
import { UserPreview } from './cmps/user-preview.jsx';
import { AppHeader } from './js/cmps/AppHeader.jsx';
import { MainApp } from './js/pages/MainApp.jsx';
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
