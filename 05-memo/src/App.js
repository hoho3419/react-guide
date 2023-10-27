import React, { useState,useCallback } from 'react';

import Button from './components/UI/Button/Button';
import DemoOutput from './components/Demo/DemoOutput';
import './App.css';

function App() {
  const [showParagraph, setShowParagraph] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);

  console.log('APP RUNNING');

  const toggleParagraphHandler = useCallback(() => {
     // useCallback을 사용하게 되면 생성된 시점에 변수들의 값을 저장하기 때문에 allowToggle은 초기값인 항상 false를 사용하게 된다.
     // 그러기 때문에 배열 디펜던시로 외부 변수인 allowToggle를 해주면 외부 변수의 값을 불러올 수 있다.
    if(allowToggle){
      setShowParagraph((prevShowParagraph) => !prevShowParagraph);
    }
  },[allowToggle]); // 이 의미는 이 변수에 값이 달라지면 이 함수를 재생성하고 아니면 재생성하지 말아줘~ 라는 의미.
  
  const toggleAllowHandler = useCallback(() => {
    setAllowToggle(true);
  },[]);

 
  return (
    <div className="app">
      <h1>Hi there!</h1>
      {/* 값이 바뀔때마다 이 컴포넌트 안에 있는 구문들은 전부다 재생성된다. 그러기 떄문에 DeomoOutput의 show의 false도 재성성후에
      show에 false값을 넣어주게 된다. 그렇지만 react.memo를 했기 때문에 원시의 이전 값과 현재값을 비교해서 재렌더링을 막을 수 있다. */}
      <DemoOutput show={showParagraph} /> 
      {/* 버튼에 인자로 주어지는 값이 함수라면 함수의 참조값, 즉 주소값이 전달되기 때문에 이전에 생성했던 함수의 주소와 현재 함수의 주소가 다르기 때문에
      react.memo하면 재렌더링을 막을 수 없다. */}
      <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
      <Button onClick={toggleAllowHandler}>Toggle allow!</Button>
    </div>
  );
}

export default App;

/*
import React, { useState, useCallback, useMemo } from 'react';

import './App.css';
import DemoList from './components/Demo/DemoList';
import Button from './components/UI/Button/Button';

function App() {
  const [listTitle, setListTitle] = useState('My List');

  const changeTitleHandler = useCallback(() => {
    setListTitle('New Title');
  }, []);

  // 이 배열은 항상 같은 값을 가지고 변하지 않는 배열이기 떄문에 빈 배열을 넣는다.
  // 재렌더링이 많이 일어나고 어플리케이션에 속도에 관한 이슈가 생기면 최적화를 넣어주는 것이 좋다. 왜냐하면 최적화 비용도 들어가기 떄문에
  // 최적화를 많이 해주는 것은 바람직하지 않다. 굉장히 많은 연산을 해야 하는 경우에만 해주는 것이 좋다.
  const listItems = useMemo(() => [5, 3, 1, 10, 9], []); 


  return (
    <div className="app">
      <DemoList title={listTitle} items={listItems} />
      <Button onClick={changeTitleHandler}>Change List Title</Button>
    </div>
  );
}

export default App; */