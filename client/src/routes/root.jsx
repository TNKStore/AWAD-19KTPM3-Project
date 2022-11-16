import React from "react";
import { useNavigate } from "react-router-dom";

export default function Root() {
  const navigate = useNavigate();
  const onSubmit = () => {
    navigate("/images");
  };

  return (
    <>
      <div id="sidebar">
        <h1>Home page</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden />
            <div className="sr-only" aria-live="polite" />
          </form>
          <form onSubmit={onSubmit}>
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <a href="login">Login</a>
            </li>
            <li>
              <a href="images">Images</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail" />
    </>
  );
}
