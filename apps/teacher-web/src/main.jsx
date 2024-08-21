import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import './reset.css';

import Layout from './screens/Layout';
import App from './App.jsx'
import Quizzes from './screens/Quizzes';
import Classes from './screens/Classes';

// const router = createBrowserRouter([
//     {
//         element: <Layout/>
//     },
//     {
//         path: '/',
//         element: <App />,
//     },
//     {
//         path: '/quizzes',
//         element: <Quizzes />,
//     },
//     {
//         path: '/classes',
//         element: <Classes />,
//     }
// ])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route path='/' element={<App />} />
                <Route path='/quizzes' element={<Quizzes />} />
                <Route path='/classes' element={<Classes />} />
            </Route>
        </Routes>
        </BrowserRouter>
    </React.StrictMode>
)
