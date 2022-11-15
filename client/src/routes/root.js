export default function Root() {
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
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <a href={`login`}>Login</a>
            </li>
            <li>
              <a href={`images`}>Images</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail"></div>
    </>
  );
}
