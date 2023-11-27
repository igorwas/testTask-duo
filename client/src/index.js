import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Layout from './layout';
import { BrowserRouter } from "react-router-dom";
import { Vacancies, Register, Login, SingleVacancy, SingleVacancyEdit } from './components'
import { Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Vacancies />} />
          
          <Route path="/vacancies" element={<Vacancies />} />
          <Route exact path="/vacancies/:_id" element={<SingleVacancy />} />
          <Route path="/vacancies/:_id/edit" element={<SingleVacancyEdit />} />
          <Route path="/vacancy/new" element={<SingleVacancyEdit />} />
          
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
