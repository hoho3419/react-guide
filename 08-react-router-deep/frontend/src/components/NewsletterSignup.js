import classes from './NewsletterSignup.module.css';
import React,{ useEffect } from 'react';
import { useFetcher } from 'react-router-dom'

function NewsletterSignup() {
  const fetcher = useFetcher();
  const {data, state} = fetcher;

useEffect(() =>{
  if(state === 'idle' && data && data.message){
    window.alert(data.message);
  }
},[data,state])

// fetcher.Form는 데이터를 전송해도 페이지가 이동하지 않게 하는 방법
  return (
    <fetcher.Form method="post" action='newsletter' className={classes.newsletter}>
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;