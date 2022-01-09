import './App.css';
import Routings from './routes';
import { useSelector } from 'react-redux';
import { Header, AppContainer } from './components'
import CircularProgress from '@mui/material/CircularProgress';


function App() {
  const isActive = useSelector(state => state?.sessionSlice?.isLoading);

  return (
    <div className="App">
      <AppContainer />
      <Header />
      {isActive ? <CircularProgress /> : null}
      <Routings />
    </div>
  );
}

export default App;
