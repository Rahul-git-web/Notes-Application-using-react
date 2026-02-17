import { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(task));
  }, [task]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title.trim() || !details.trim()) {
      alert("Please fill all fields");
      return;
    }

    const newNote = {
      id: Date.now(),
      title,
      details,
    };

    setTask([...task, newNote]);
    setTitle("");
    setDetails("");
  };

  const deleteNote = (id) => {
    setTask(task.filter((note) => note.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100">

      {/* 🔹 Navbar */}
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Rahul Notes</h1>
        <p className="text-sm text-gray-500">
          Total Notes: <span className="font-semibold">{task.length}</span>
        </p>
      </nav>

      {/* 🔹 Hero Section */}
      <div className="text-center py-10 px-4">
        <h2 className="text-3xl font-bold text-gray-800">
          Organize Your Thoughts
        </h2>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          A simple and responsive notes application built with React and Tailwind CSS.
          Your notes are saved locally in your browser.
        </p>
      </div>

      {/* 🔹 Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 px-4 pb-10">

        {/* Form Section */}
        <form
          onSubmit={submitHandler}
          className="bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-5"
        >
          <h3 className="text-xl font-semibold text-gray-800">
            Add New Note
          </h3>

          <input
            type="text"
            placeholder="Enter note title"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Enter note details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 transition text-white py-2 rounded-lg font-medium"
          >
            Add Note
          </button>
        </form>

        {/* Notes Section */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Your Notes
          </h3>

          {task.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              <p>No notes added yet.</p>
              <p className="text-sm mt-2">
                Start by adding your first note ✍️
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {task.map((note) => (
                <div
                  key={note.id}
                  className="bg-blue-500 text-white p-4 rounded-xl shadow-md flex flex-col justify-between hover:scale-105 transition"
                >
                  <div>
                    <h4 className="font-semibold text-lg">
                      {note.title}
                    </h4>
                    <p className="text-sm mt-2">
                      {note.details}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteNote(note.id)}
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white py-1 rounded-md text-sm transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 🔹 Footer */}
      <footer className="bg-white text-center py-4 shadow-inner text-sm text-gray-500">
        Built with ❤️ by Rahul using React & Tailwind CSS
      </footer>

    </div>
  );
}

export default App;



