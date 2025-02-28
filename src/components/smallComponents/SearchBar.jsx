import { useRef, useEffect } from 'react';

export default function SearchBar({ style, setSearch }) {
  const debounceTimeout = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      setSearch(value);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return (
    <div className="search-bar" style={style}>
      <input type="text" placeholder="Search" onChange={handleChange} />
    </div>
  );
}
