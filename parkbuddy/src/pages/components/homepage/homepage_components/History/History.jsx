import { useEffect, useState } from "react";
import { getHistoryEvents } from "../../../../../API/Fetch_backend";
import { HistoryCard } from "./Historyeventcard";

export const History_page = ({ User_email }) => {
  const [history, setHistoryEvents] = useState({});

  useEffect(() => {
    async function fetchData() {
      const _historyEvents = await getHistoryEvents(User_email);
      console.log("History received", _historyEvents);
      setHistoryEvents(_historyEvents);
    }
    fetchData();
  }, []);

  if (Object.keys(history).length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full p-5">
        <div className="flex flex-col h-full w-full bg-slate-100 text-black font-semibold">
          Loading...
        </div>
      </div>
    );
  } else {
    console.log("history:", history);
    return (
      <div
        style={{ height: "calc(100vh - 80px)" }}
        className="w-full bg-slate-100 text-black font-semibold overflow-y-scroll"
      >
        <div className="text-4xl font-bold text-center">History</div>
        <hr />
        {Object.keys(history)
          .sort((a, b) => new Date(b) - new Date(a)) // Sort dates in descending order
          .map((date) => (
            <div key={date} style={{ marginBottom: "20px" }}>
              <div className="text-xl font-bold py-1 px-2">{date}</div>{" "}
              {/* Display the date */}
              <hr />
              <div>
                {Object.keys(history[date]).map((eventKey) => {
                  const event = history[date][eventKey];
                  if (eventKey === "count") {
                    return null; // Skip the "count" key
                  }
                  return (
                    <HistoryCard
                      eventdata={event}
                      key={eventKey} // Ensure unique key for each HistoryCard
                    />
                  );
                })}
              </div>
            </div>
          ))}
      </div>
    );
  }
};
