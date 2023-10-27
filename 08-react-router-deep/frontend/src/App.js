// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './components/layout/RootLayout';
import HomePage from './components/pages/HomePage';
import EventsPage, { loader as eventLoader } from './components/pages/EventsPage';
import EventDetailPage, { loader as eventDetailLoader, action as deleteEventAction } from './components/pages/EventDetailPage';
import NewEventPage from './components/pages/NewEventPage';
import EditEventPage from './components/pages/EditEventPage';
import RootEventLayout from './components/layout/RootEventLayout';
import ErrorPage from './components/pages/ErrorPage';
import { action as manipulateEventAction } from './components/EventForm';
import NewsletterPage,{action as newsletterAction} from './components/pages/NewsletterPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'events',
        element: <RootEventLayout />,
        children: [
          {
            index: true, element: <EventsPage />, loader: eventLoader
          },
          {
            path: 'new', element: <NewEventPage />, action: manipulateEventAction
          },
          {
            path: ':eventId',
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              { path: 'edit', element: <EditEventPage />, action: manipulateEventAction },
            ]
          },
        ]
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
