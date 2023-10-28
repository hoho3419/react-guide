import classes from './Header.module.css';
import { useSelector,useDispatch } from 'react-redux'
import { authAction } from '../store/auth';

const Header = () => {
  const dispatch = useDispatch();
  const isAuthentication = useSelector(state => state.auth.isAuthentication);

  function logoutHandler() {
    dispatch(authAction.logout())
  }
  function loginHandler() {
    dispatch(authAction.login())
  }

  let authStateButton = <button onClick={loginHandler}>Login</button>;
  if(isAuthentication){
    authStateButton = <button onClick={logoutHandler}>Logout</button>
  }

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      {isAuthentication && 
        <nav>
          <ul>
            <li>
              <a href='/'>My Products</a>
            </li>
            <li>
              <a href='/'>My Sales</a>
            </li>
            <li>
              {authStateButton}
            </li>
          </ul>
        </nav>
      }
    </header>
  );
};

export default Header;
