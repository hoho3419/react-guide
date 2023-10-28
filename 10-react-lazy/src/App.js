import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy,Suspense } from 'react'

// import BlogPage, { loader as postsLoader } from './pages/Blog';
import HomePage from './pages/Home';
// import PostPage, { loader as postLoader } from './pages/Post';
import RootLayout from './pages/Root';

const BlogPage = lazy(() => import('./pages/Blog'));
const PostPage = lazy(() => import('./pages/Post'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [ // postsLoader 기존 방식.
          // { index: true, element: <BlogPage />, loader: postsLoader },  밑에는 그 페이지에 방문했을때만 코드들이 다운로드 되게 만든다.
          { index: true, element: <Suspense fallback={<p>로딩중..</p>}><BlogPage /></Suspense> , loader: () => import('./pages/Blog').then(module => module.loader()) },
          { path: ':id', element: <Suspense><PostPage /></Suspense>, loader: ({params}) => import('./pages/Post').then(module => module.loader({params}))  },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
