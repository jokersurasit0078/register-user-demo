import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from './AppRouter';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'rsuite/dist/rsuite.min.css';
import RegisterationProvider from './contexts/registration';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const firebaseConfig = {
  apiKey: "AIzaSyCCjf63SG3ll_QnKTZvO0Cm4WrJorVrjB0",
  authDomain: "register-user-demo.firebaseapp.com",
  projectId: "register-user-demo",
  storageBucket: "register-user-demo.appspot.com",
  messagingSenderId: "672469630032",
  appId: "1:672469630032:web:0f880e0665227be731e555",
  measurementId: "G-42X1DZ0T1R"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

root.render(
  <React.StrictMode>
    <RegisterationProvider>
      <AppRouter />
    </RegisterationProvider>
  </React.StrictMode>
);

reportWebVitals();
