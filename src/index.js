import React from "react";

import ReactDOM from "react-dom/client";


import "./scss/main.scss";


import App from "./App"; 


var root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
 <React.StrictMode>
<App
     number={10}
     title="String from index file" 
     text="Text from index file" />
      </React.StrictMode>,
     );

     

