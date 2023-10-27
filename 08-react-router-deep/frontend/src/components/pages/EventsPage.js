// import React,{ useEffect,useState } from 'react';
import { json, useLoaderData, defer, Await } from 'react-router-dom'
import EventsList from '../EventsList';
import { Suspense } from 'react';


const EventsPage = () => {
  const { events } = useLoaderData();

// 기존 http 통신을 기다리는 코드 화면이 데이터가 전달되지 않으면 실행되지 않는다.
  // if(data.isError){
  //   return <p>{data.message}</p>;
  // }
  // const events = data.events;
/*
  const [EventData,setEventData] = useState([]);
  useEffect(() =>{
    const fetchData = async () =>{
      const response = await fetch('http://localhost:8080/events/',{
        method: 'GET'
      });
      const eventData = response.json();
      const data = [];
      await eventData
      .then(res => {
        const eventData = res.events;
        
        for(const key in eventData){
          data.push({
            id: key,
            item: eventData[key].description,
            image: eventData[key].image,
            title: eventData[key].title,
            date: eventData[key].date,
          })
        }
        setEventData(data)
        return data;
      })
    }
    fetchData()
  },[])
*/

  // return (
  //   <div>
  //     <h1>Events Page</h1>
  //     <EventsList events={events}/>
  //   </div>

  return (
    <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
      <Await resolve={events}>
        {(loadEvents) => <EventsList events={loadEvents} />}
      </Await>
    </Suspense>
  );
};

export default EventsPage;

const loadEvents = async () =>{
  const response = await fetch('http://localhost:8080/events',{
      method: 'GET'
    });
    if(!response.ok){
      // return {isError: true,message: '데이터를 받아오지 못했습니다.'}
      // throw new Response(JSON.stringify({ message: '뭔가 잘못됐습니다.'}),{ status: 500 });
      // 알아서 json 형식을 변환해서 보내준다.
      return json({ message: '뭔가 잘못됐습니다.'},{ status: 500 })
    }else{
      // return response; 기존에 이렇게 보내도 알아서 파싱함

      const responseData = await response.json();
      return responseData.events;
    }
}

// loader는 데이터가 받아지지 않으면 컴포넌트 자체가 렌더링 되지 않는다.
// 제일먼저 실행하는 함수이기 때문에 인증 절차를 넣으면 된다.
export const loader = async () => {
  return defer({
    events: loadEvents()
  })

  /**
  const response = await fetch('http://localhost:8080/events',{
      method: 'GET'
    });
    if(!response.ok){
      // return {isError: true,message: '데이터를 받아오지 못했습니다.'}
      // throw new Response(JSON.stringify({ message: '뭔가 잘못됐습니다.'}),{ status: 500 });
      // 알아서 json 형식을 변환해서 보내준다.
      return json({ message: '뭔가 잘못됐습니다.'},{ status: 500 })
    }else{
      return response.json();
    }
*/
}