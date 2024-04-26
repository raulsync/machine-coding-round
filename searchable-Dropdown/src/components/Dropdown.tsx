import { useEffect, useState } from 'react';
import { IData } from '../constants/data';

interface DropdownProps {
  data: IData[];
}

const Dropdown: React.FC<DropdownProps> = ({ data }) => {
  const [item, setItem] = useState<IData[]>(data);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    const filteredData = item.filter((i) => {
      const lowerCaseText = text.toLowerCase();
      return (
        i.name.toLowerCase().includes(lowerCaseText) ||
        i.id.toLowerCase().includes(lowerCaseText) ||
        i.desc.toLowerCase().includes(lowerCaseText)
      );
    });
    text ? setItem(filteredData) : setItem(data);
    // setItem(text ? filteredData : data);
  }, [text, data]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <ul>
        {item.map((item: IData) => (
          <li key={item.id}>
            <span>{item.name}</span> <br />
            <span>{item.id}</span>
            <br />
            <span>{item.desc}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
