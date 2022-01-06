import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Logo />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export const Logo = () => {
  function useDynamicSVGImport(name) {
    const ImportedIconRef = useRef();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
      setLoading(true);
      const importIcon = async () => {
        try {
          ImportedIconRef.current = (
            await import(`./${name}.svg`)
          ).ReactComponent;
        } catch (err) {
          setError(err);
          throw err;
        } finally {
          setLoading(false);
        }
      };
      importIcon();
    }, [name]);

    return { error, loading, SvgIcon: ImportedIconRef.current };
  }

  const { loading, SvgIcon } = useDynamicSVGImport('logo');

  if (loading) {
    return null;
  }

  if (SvgIcon) {
    return <SvgIcon />;
  }
  return null;
};

export default App;
