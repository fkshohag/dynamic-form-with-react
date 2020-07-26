import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import RouteGenerator from './core/utility/route/route.generator';

class App extends React.Component {
  render() {
    let routes: Array<any> = RouteGenerator.getRoute();
    const routeComponents = routes.map(({ path, exact , component }, key) =>
      <Route exact={exact} path={path} component={component} key={key} />);
    return (
      <main>
          {routeComponents}
      </main>
    );
  }
}

export default App;
