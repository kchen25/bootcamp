import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import { createStore, combineReducers } from 'redux'
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAlnVD2A_1_SFfExMEYavRMXXk4iK6BXl0",
    authDomain: "bootcamp-638f1.firebaseapp.com",
    databaseURL: "https://bootcamp-638f1-default-rtdb.firebaseio.com",
    projectId: "bootcamp-638f1",
    storageBucket: "bootcamp-638f1.appspot.com",
    messagingSenderId: "275129639093",
    appId: "1:275129639093:web:f404aa600bb200e723defc"
  };
  
  //secret keys that allow us to have access to bootcamp firebase project
  firebase.initializeApp(firebaseConfig);

  // Add firebase to reducers
  const rootReducer = combineReducers({
    firebase: firebaseReducer
    // firestore: firestoreReducer // <- needed if using firestore
  })
  
  // Create store with reducers and initial state
  const store = createStore(rootReducer)

  // react-redux-firebase config
  const rrfConfig = {
    userProfile: 'users'
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
    // enableClaims: true // Get custom claims along with the profile
  }

  const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch
    // createFirestoreInstance // <- needed if using firestore
  }

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
