import React, { useContext, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import {
  MdCheck,
  MdOutlineDragHandle,
  MdOutlineSchedule,
  MdOutlineSegment,
  MdOutlineBookmarkBorder,
} from "react-icons/md";
import { FaTrashCanArrowUp } from "react-icons/fa6";
import GlobalContext from "../context/GlobalContext";

const lablesClasses = [
  "bg-indigo-500",
  "bg-gray-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-red-500",
  "bg-purple-500",
];

const EventModal = () => {
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);
  const [title, setTitle] = useState(selectedEvent?.title || "");
  const [description, setDescription] = useState(
    selectedEvent?.description || ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent?.label || lablesClasses[0]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({
        type: "UPDATE",
        payload: {
          ...calendarEvent,
          id: selectedEvent.id,
        },
      });
    } else {
      dispatchCalEvent({ type: "PUSH", payload: calendarEvent });
    }
    setShowEventModal(false);
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span>
            <MdOutlineDragHandle />
          </span>
          <div className="space-x-4">
            {selectedEvent && (
              <button
                onClick={() => {
                  dispatchCalEvent({ type: "DELETE", payload: selectedEvent });
                  setShowEventModal(false);
                }}
              >
                <FaTrashCanArrowUp />
              </button>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <IoCloseCircleOutline />
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
            />
            <div className="flex items-center h-full">
              <MdOutlineSchedule />{" "}
            </div>
            <span>{daySelected.format("dddd, MMMM DD")}</span>
            <div className="flex items-center h-full">
              <MdOutlineSegment />
            </div>
            <input
              type="text"
              name="description"
              placeholder="Add description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
            />
            <div className="flex items-center h-full">
              <MdOutlineBookmarkBorder />
            </div>
            <div className="flex gap-x-2">
              {lablesClasses.map((color, idx) => (
                <span
                  key={idx}
                  onClick={() => setSelectedLabel(color)}
                  className={`w-6 h-6 rounded-full ${color} flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === color && (
                    <MdCheck className="text-white text-sm" />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end w-100 border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EventModal;
