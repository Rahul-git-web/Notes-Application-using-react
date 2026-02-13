import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const [task, setTask] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title || !details) {
      alert("Please fill all fields");
      return;
    }

    const copy = [...task, { title, details }];
    setTask(copy);

    setTitle("");
    setDetails("");
  };

  const deleteNote = (index) => {
    const copy = [...task];
    copy.splice(index, 1);

    setTask(copy)
  };

  return (
    <div className="h-screen lg:flex gap-5 bg-white p-10">
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
        className="flex lg:w-1/2 w-full flex-col gap-5"
      >
        <h1 className="text-2xl font-bold">Add notes</h1>

        {/* FIRST INPUT FOR HEADING */}
        <input
          type="text"
          placeholder="Enter Notes Heading"
          className="border border-gray-600 rounded-md p-2 "
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        {/*DETAILED INPUT */}
        <textarea
          placeholder="Enter Details"
          name=""
          id=""
          value={details}
          onChange={(e) => {
            setDetails(e.target.value);
          }}
          className="border border-gray-600 rounded-md p-2 h-64"
        ></textarea>

        <button className="bg-blue-500 text-white active:bg-amber-700 px-4 py-2 rounded-md cursor-pointer">
          Add Note
        </button>
      </form>
      <div className="lg:w-1/2 lg:border-l-2 lg:border-gray-300 p-10 h-full">
        <h1 className="text-2xl font-bold mb-5">Your recent notes</h1>
        <div className="flex flex-wrap gap-4 h-full overflow-scroll">
          {task.map((item, index) => {
            return (
              <div
                key={index}
                className="flex justify-between flex-col relative w-40 bg-cover h-40 p-4 bg-amber-600 rounded-2xl shadow-md text-center items-center"
              >
                <h2 className="font-medium text-lg mt-1">{item.title}</h2>
                <p className="text-xs font-serif mt-1">{item.details}</p>
                <button
                  onClick={() => {
                    deleteNote(index);
                  }}
                  className="w-full cursor-pointer active:scale-95 bg-red-500 py-1 text-xs rounded font-bold text-white"
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
