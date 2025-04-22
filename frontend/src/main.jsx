import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./store/AuthContext";
import PostListProvider from "./store/post-list-store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <PostListProvider>
          <App />
      </PostListProvider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
