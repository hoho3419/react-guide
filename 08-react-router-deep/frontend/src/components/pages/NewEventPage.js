import React from 'react';
import EventForm from '../EventForm';

const NewEventPage = () => {
  return (
    <EventForm method={'POST'}/>
  );
};

export default NewEventPage;
/*
export const action = async ({request,params}) =>{
  const data = await request.formData();
  // const enterdTitle = data.get('title');
  // const enterdImge = data.get('image');
  // const enterdDate = data.get('date');
  // const enterdDescription = data.get('description');

  const formData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  }
  const response = await fetch('http://localhost:8080/events',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  if(response.status === 422){
    return response;
  }
  
  if(!response.ok){
    return json({ message: '뭔가 잘못됐습니다.' },{ status: 500 });
  }
  return redirect('/events');
}
*/