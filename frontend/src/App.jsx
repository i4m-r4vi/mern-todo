import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = `${import.meta.env.VITE_API_URL}/tasks`;

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data.tasks);
  };

  const addTask = async () => {
    if (!text.trim()) return;
    await axios.post(API, { text });
    setText('');
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>✨ My Tasks</h1>

        <div style={styles.inputContainer}>
          <input
            style={styles.input}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What needs to be done?"
          />
          <button style={styles.addBtn} onClick={addTask}>
            Add
          </button>
        </div>

        <ul style={styles.list}>
          {tasks.map((task) => (
            <li key={task._id} style={styles.item}>
              <span>{task.text}</span>
              <button
                style={styles.deleteBtn}
                onClick={() => deleteTask(task._id)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>

        {tasks.length === 0 && (
          <p style={styles.empty}>No tasks yet. Add one 🚀</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    background: '#fff',
    padding: '30px',
    borderRadius: '16px',
    width: '350px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  inputContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    outline: 'none',
  },
  addBtn: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '8px',
    background: '#667eea',
    color: '#fff',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '10px',
    background: '#f5f6fa',
  },
  deleteBtn: {
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: '16px',
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    marginTop: '10px',
  },
};

export default App;