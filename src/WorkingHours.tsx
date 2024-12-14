import { useState } from 'react';
import Plus from './assets/images/plus.svg?react';
import Trash from './assets/images/trash.svg?react';
import RangeInput from './components/RangeInput';
import useScheduleStore, { TimeSlot } from './store/store';

const AddButton = ({ onClick }) => {
  return (
    <button type="button" className="btn-add" onClick={onClick}>
      <Plus />
    </button>
  );
};

const DeleteButton = ({ onClick }) => {
  return (
    <button type="button" className="btn-delete" onClick={onClick}>
      <Trash />
    </button>
  );
};

const CancleButton = ({ onClick }) => {
  return (
    <button type="button" className="btn" onClick={onClick}>
      Cancel
    </button>
  );
};

const UpdateButton = ({ onClick }) => {
  return (
    <button type="button" className="btn primary" onClick={onClick}>
      Update
    </button>
  );
};

function WorkingHours() {
  const { times, schedule, addTime, deleteTime, updateTime } = useScheduleStore();
  const [data, setData] = useState(null);

  const handleAdd = (day: string) => {
    addTime(day);
  };
  const handleDelete = (day: string, id: number) => {
    deleteTime(day, id);
  };

  const handleCancle = () => {};

  const handleUpdate = () => {};

  const scheduleArray = Object.entries(schedule).map(([day, timeSlots]) => ({
    day,
    timeSlots,
  }));

  return (
    <div>
      <h1>2번 과제 - WorkingHours</h1>

      <div className="working-hour">
        <div className="category">Working hour</div>
        <div className="dropdown">
          <div className="dropdown-title">Set your weekly hours</div>
          <div className="dropdown-panel">
            {scheduleArray.map((_day, index) => {
              console.log(_day);
              return (
                <div className="row" key={index}>
                  <div className="day">{_day.day}</div>
                  <div>
                    {_day.timeSlots.length > 0 ? (
                      _day.timeSlots.map((timeslot: TimeSlot, index: number) => {
                        const isLast = _day.timeSlots.length - 1 === index;
                        return (
                          <div className="time" key={index}>
                            <RangeInput id={_day.day} />
                            <DeleteButton onClick={() => handleDelete(_day.day, timeslot.id)} />
                            {isLast && <AddButton onClick={() => handleAdd(_day.day)} />}
                          </div>
                        );
                      })
                    ) : (
                      <AddButton onClick={() => handleAdd(_day.day)} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="btn-wrap">
            <CancleButton onClick={handleCancle} />
            <UpdateButton onClick={handleUpdate} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkingHours;
