import React, { Suspense } from 'react';
import { Await, defer, json,redirect,useRouteLoaderData } from 'react-router-dom'
import EventItem from '../EventItem';
import EventsList from '../EventsList';

const EventDetailPage = () => {
  // const data = useLoaderData(); 접근하는 곳이 하나이고 자기 컴포넌트일때만 사용 가능한 훅이다.
  const { event, events } = useRouteLoaderData('event-detail');

  // Suspense로 로딩스피너 구현, Await로 프로미스를 보내준것에 대한 resolve
  return (
    <>
      <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
        <Await resolve={event}>
          {(loadEvent) => <EventItem event={loadEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
        <Await resolve={events}>
          {(loadEvents) => <EventsList events={loadEvents}/>}
        </Await>
      </Suspense>
    </>
    // 
  );
};

export default EventDetailPage;

const loadEvent = async (id) =>{
  const response = await fetch('http://localhost:8080/events/' + id);
  if(!response.ok){
    return json({ message: '뭔가 잘못됐습니다.'},{ status: 500 });
  }else{
    // return response;
    const responseData = await response.json();
    return responseData.event;
  }
}

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

export const loader = async ({request, params}) =>{
  const id = params.eventId;

  // 이렇게 await를 붙여주게 되면 loadEvents()가 실행되지 않고 loadEvent(id)의 실행이 끝날때까지 기다린다.
  return defer({
    event: await loadEvent(id),
    events: loadEvents()
  })
  /** 
  const id = params.id;
  const response = await fetch('http://localhost:8080/events/' + id);
  if(!response.ok){
    return json({ message: '뭔가 잘못됐습니다.'},{ status: 500 });
  }else{
    return response;
  }
*/
}

export const action = async ({params, request }) =>{
  // * request 는 사용자가 전송한 http 전송에 대한 데이터들을 담고 있다.
  const id = params.eventId;
  const response = await fetch('http://localhost:8080/events/' + id,{
    method: request.method,
  });
  if(!response.ok){
    return json({ message: '뭔가 잘못됐습니다.'},{ status: 500 });
  }
  return redirect('/events');
}