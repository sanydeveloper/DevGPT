import React from "react";

const HistoryModal = ({ history = [], onClose }) => {
  return (
    <div className="history-modal">
      <div className="history-header">
        <h3>Chat History</h3>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
      <div className="history-body">
        {history.length > 0 ? (
          <ul>
            {history.map((item, index) => (
              <li key={index}>
                <strong>Input:</strong> {item.input} <br />
                <strong>Response:</strong> {item.response}
              </li>
            ))}
          </ul>
        ) : (
          <p>No history available yet.</p>
        )}
      </div>
    </div>
  );
};

export default HistoryModal;
