import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notification'
import currentUserReducer from './reducers/currentUser'
import vacanciesReducer from './reducers/vacancies';
import applicationsReducer from './reducers/applications';

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    currentUser: currentUserReducer,
    vacancies: vacanciesReducer,
    applications: applicationsReducer
  },
});