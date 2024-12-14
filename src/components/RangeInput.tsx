import useScheduleStore from '../store/store';
import { useState, useRef, useEffect } from 'react';

interface RangeInput {
  id?: string;
}

const SelectInput = ({ id, index, handleChange }) => {
  const { times, schedule, addTime, deleteTime, updateTime } = useScheduleStore();

  const idName = index === 0 ? 'start' : 'end';

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState(times[0]);

  const selectBoxRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const selectOption = (option: string) => {
    setCurrentValue(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (selectBoxRef.current && !selectBoxRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`selectbox ${isOpen ? 'active' : ''}`} ref={selectBoxRef}>
      <label className="label" onClick={toggleDropdown}>
        {currentValue}
      </label>
      <ul className="option-list">
        {times.map((time: string, index: number) => (
          <li className="option-item" key={index} value={time} onClick={() => selectOption(time)}>
            {time}
          </li>
        ))}
      </ul>
    </div>
  );
};

const RangeInput = ({ id = 'monday' }: RangeInput) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
  };

  return (
    <div className="range-input">
      <SelectInput id={id} index={0} handleChange={handleChange} />
      -
      <SelectInput id={id} index={1} handleChange={handleChange} />
    </div>
  );
};

export default RangeInput;
