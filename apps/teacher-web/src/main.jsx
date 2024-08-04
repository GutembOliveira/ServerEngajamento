import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx'
import Quizzes from './screens/Quizzes';
import Classes from './screens/Classes';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/quizzes',
        element: <Quizzes />,
    },
    {
        path: '/classes',
        element: <Classes />,
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
