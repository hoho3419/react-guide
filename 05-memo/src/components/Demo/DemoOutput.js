import React from 'react';

import MyParagraph from './MyParagraph';

const DemoOutput = (props) => {
  console.log('DemoOutput RUNNING');
  return <MyParagraph>{props.show ? 'This is new!' : ''}</MyParagraph>;
};

export default React.memo(DemoOutput); // 이렇게 하면 프롭스로 오는 값들을 확인하고 전 값과 비교한다.
// 들어오는 원시값을 비교해서 다르면 재실행하고 같으면 재실행하지 않는다.
