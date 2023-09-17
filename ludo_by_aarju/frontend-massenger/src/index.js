import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Toaster } from 'react-hot-toast';

import App from "./App";
// import * as serviceWorker from "./serviceWorker";
import "./mainstyle.css";

const container = document.getElementById("root");

const root = createRoot(container);
root.render(
  <BrowserRouter>
    
        <App />
    
    <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: '',
            duration: 5000,
            style: {
              background: '#363636',
              color: '#fff',
            },

            // Default options for specific types
            success: {
              duration: 3000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
          }}
        />
    </BrowserRouter>
);

// serviceWorker.unregister();
