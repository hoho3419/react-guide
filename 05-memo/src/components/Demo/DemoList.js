import React, { useMemo } from 'react';

import classes from './DemoList.module.css';

const DemoList = (props) => {
  const { items } = props; // 구조분해 할당을 한다.

  const sortedList = useMemo(() => {
    console.log('Items sorted');
    return items.sort((a, b) => a - b); // 이전값을 기억해서 같으면 재 렌더링이 일어나지 않도록 함.
  }, [items]);  // items가 바뀌면 이 값을 재생성해라.
  console.log('DemoList RUNNING');

  return (
    <div className={classes.list}>
      <h2>{props.title}</h2>
      <ul>
        {sortedList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(DemoList);