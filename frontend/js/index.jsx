// import React from 'react';
// import ReactDOM from 'react-dom';

// import App from './pages/App';


import React from 'react';
import ReactDOM from 'react-dom';

import ThemingLayout from './components/ThemingLayout';


function App() {
  return (
    <ThemingLayout/>
  );
}

export default App;

ReactDOM.render(<App/>, document.getElementById('react-app'));
