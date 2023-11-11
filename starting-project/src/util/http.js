import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function fetchEvents({ signal, searchTerm, max }) {
  let url = 'http://localhost:3000/events';
  if (searchTerm && max) {
    url += "?search=" + searchTerm + "&max=" + max;
  } else if (searchTerm) {
    url += "?search=" + searchTerm;
  } else if (max) {
    url += "?max=" + max;
  }

  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}

export async function createNewEvent(eventData) {
  const response = await fetch(`http://localhost:3000/events`, {
    method: 'POST',
    body: JSON.stringify(eventData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = new Error('An error occurred while creating the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}


export async function fetchSelectableImages({ signal }) {
  const response = await fetch(`http://localhost:3000/events/images`, { signal });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the images');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { images } = await response.json();

  return images;
}


export async function fetchEvent({ id, signal }) {
  // eventId 매개변수로 오는 것과 인자로 주는 데이터의 이름이 같아야 데이터를 온전히 가져올 수 있다. (대소문자도 같아야함)
  const response = await fetch(`http://localhost:3000/events/${id}`, { signal });
  if (!response.ok) {
    const error = new Error('An error occurred while fetching the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const { event } = await response.json();
  return event;
}

export async function deleteEvent({ id }) {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = new Error('An error occurred while delete the events');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const { message } = response.json()
  return message;
}

export async function editEvent(eventData) {
  console.log(eventData)
  const response = await fetch(`http://localhost:3000/events/${eventData.id}`, {
    method: "PUT",
    body: JSON.stringify({ event: eventData }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response)
  if (!response.ok) {
    const error = new Error('An error occurred while update the events');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const { message } = response.json()
  return message;
}