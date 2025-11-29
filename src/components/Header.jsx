function Header({ theme, setTheme }) {
  return (
    <div id="header">
      <div className="flexrow-container">
        <div
          className="standard-theme theme-selector"
          onClick={() => setTheme("standard")}
        />
        <div
          className="light-theme theme-selector"
          onClick={() => setTheme("light")}
        />
        <div
          className="darker-theme theme-selector"
          onClick={() => setTheme("darker")}
        />
      </div>
      <h1 id="title">
        Just do it.
        <div id="border" />
      </h1>
    </div>
  );
}

export default Header;
