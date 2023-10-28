import classes from './Counter.module.css';
import { useSelector,useDispatch } from 'react-redux'
import { counterAction } from '../store/counter';
// import store from '../store';

const Counter = () => {
  // store.dispatch({ type: 'INCREAMENT'}); console.log(store.getState()); 이건 자바스크립트에서 쓰는 방법이다. react-redux를 사용해서 
  // 사용해야 한다.
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter.counter);
  const show = useSelector(state => state.counter.showCounter);

  function counterIncreament(){
    dispatch(counterAction.Increament())
  }
  function counterIncreament5(){
    dispatch(counterAction.Increament5(5))
  }
  function counterDecreament(){
    dispatch(counterAction.Decreament())
  }
  const toggleCounterHandler = () => { dispatch(counterAction.toggle())};
  

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <button onClick={counterIncreament}>1 증가</button>
      <button onClick={counterIncreament5}>5 증가</button>
      <button onClick={counterDecreament}>1 감소</button>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
