import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Routes, Route ,Navigate} from 'react-router-dom';
// import { ConnectedRouter } from 'redux-first-history';
import { HistoryRouter as Router } from "redux-first-history/rr6";

// import { store } from '@redux/configure-store';
import { store, history } from "@redux/configure-store";
import 'normalize.css';
import './index.css';
import { Authentication } from '@pages/Authentication/Authentication';
import { Registration } from '@components/Registration/Registration';
import { Login } from '@components/Login/Login';
import { Success } from '@components/Success/Success';
import { Result } from '@pages/Result/Result';
import { Error } from '@components/Error/Error';
import { ErrorUserExist } from '@components/ErrorUserExist/ErrorUserExist';
import { ErrorLogin } from '@components/ErrorLogin/ErrorLogin';
import { MainPage } from './pages';
import React from 'react';
import { ErrorCheckEmailNoExist } from '@components/ErrorCheckEmailNoExist/ErrorCheckEmailNoExist';
import { ErrorCheckEmail } from '@components/ErrorCheckEmail/ErrorCheckEmail';
import { ConfirmEmail } from '@components/ConfirmEmail/ConfirmEmail';
import { ChangePassword } from '@components/ChangePassword/ChangePassword';
import { ErrorChangePassword } from '@components/ErrorChangePassword/ErrorChangePassword';
import { SuccessChangePassword } from '@components/SuccessChangePassword/SuccessChangePassword';



const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/main" element={<MainPage />} />
          <Route path='/main' element={<MainPage />} />
          <Route path="/auth/" >
          <Route path="" element={<Authentication />} />

            <Route path="login" element={<Login />} />
            <Route path="registration" element={<Registration />} />
            <Route path="confirm-email" element={<ConfirmEmail/>} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
          <Route path='/result/'>
            <Route path='success' element={<Success />} />
            <Route path='error' element={<Error />} />
            <Route path='error-user-exist' element={<ErrorUserExist />} />
            <Route path='error-login' element={<ErrorLogin />} />
            <Route path='error-check-email-no-exist' element={<ErrorCheckEmailNoExist />} />
            <Route path='error-check-email' element={<ErrorCheckEmail />} />
            <Route path='error-change-password' element={<ErrorChangePassword/>} />
            <Route path='success-change-password' element={<SuccessChangePassword/>} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
);

