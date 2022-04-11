import Install from './components/install';
import Home from './components/Home';
import './App.css';
// import 'semantic-ui-css/semantic.min.css'

function App() {
  
  if(window.ethereum) {
    return <Home />;
  } else {
    return <Install />;
  }
}

export default App;
