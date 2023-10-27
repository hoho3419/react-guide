import { useNavigate,Form,useNavigation,useActionData, json, redirect } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData = useActionData();


  // 데이터가 지금 전송중인지 확인. 로딩 스피너 구현
  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      {/* Object.values는 객체를 배열로 바꿔주는 함수 */}
      {actionData && actionData.error && 
        <ul>
          {Object.values(actionData.error).map(err => <li key={err}>{err}</li>)}  
        </ul>}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event ? event.title: undefined}/>
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event ? event.image: undefined}/>
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event ? event.date: undefined}/>
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event ? event.description: undefined}/>
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? 'Submitting' : 'Save'}</button>
      </div>
    </Form>
  );
}

export default EventForm;

export const action = async ({request,params}) =>{
  const data = await request.formData();
  const method = request.method;
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
  let url = 'http://localhost:8080/events';

  if(method === 'PATCH'){
    const eventId = params.eventId;
    url = url + '/' + eventId;
  }

  const response = await fetch(url,{
    method: method,
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