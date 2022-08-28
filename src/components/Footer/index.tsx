import { useEffect, useState } from 'react';
import './styles.scss';

export const Footer = () => {
  const [date, setDate] = useState(0);

  useEffect(() => {
    const fullData = new Date();
    setDate(fullData.getFullYear());
  }, []);

  return (
    <footer className="footer">
      <h3>Marcos André© {date}</h3>
    </footer>
  );
};
