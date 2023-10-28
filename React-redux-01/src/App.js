import Counter from './components/Counter';
import Header from './components/Header';
import Auth from './components/Auth';
import { useSelector } from 'react-redux'
import UserProfile from './components/UserProfile';


function App() {
  const isAuthentication = useSelector(state => state.auth.isAuthentication);

  return (
    <>
      <Header />
        {!isAuthentication ? <Auth /> : <UserProfile />}
      <Counter />
    </>
  );
}

export default App;
