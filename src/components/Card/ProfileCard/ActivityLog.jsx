import { MdOutlineModeEdit } from "react-icons/md";

export default function ActivityLog() {
  const messages = [
    {
      status: "Status updated to Interested",
      remark: "",
      date: "01-Oct-2024",
      time: "11:15 pm",
      updatedBy: "Aswathi",
      role: "Counsellor",
    },
    {
      status: "Status updated to Interested",
      remark: "",
      date: "01-Oct-2024",
      time: "11:20 pm",
      updatedBy: "John",
      role: "Admin",
    },
    {
      status: "Status updated to Interested",
      remark: "",
      date: "01-Oct-2024",
      time: "11:20 pm",
      updatedBy: "John",
      role: "Admin",
    },
    {
      status: "Status updated to Interested",
      remark: "",
      date: "01-Oct-2024",
      time: "11:20 pm",
      updatedBy: "John",
      role: "Admin",
    },
    {
      status: "Status updated to Interested",
      remark: "",
      date: "01-Oct-2024",
      time: "11:15 pm",
      updatedBy: "Aswathi",
      role: "Counsellor",
    },
    {
      status: "Status updated to Interested",
      remark: "",
      date: "01-Oct-2024",
      time: "11:15 pm",
      updatedBy: "Aswathi",
      role: "Counsellor",
    },
   
    // Add more messages here
  ];

  return (
    <div className="log">
      <div className="log-header">
        <span className="name-small">Activity Log</span>
        <span className="icons">
          <MdOutlineModeEdit />
        </span>
      </div>
      <div className="message-container">
        <div className="message-tree">
          <ul>
            {messages.map((message, index) => (
              <li key={index}>
                <div className="message-box">
                  {/* Determine if the triangle should be on the left or right */}
                  <span
                    className={
                      index % 2 === 0
                        ? "log-left-triangle"
                        : "log-right-triangle"
                    }
                  ></span>
                  <div className="message-area">
                    <div className="message-area-top">
                      <p className="chat-text">{message.status}</p>
                      <div className="message-area-textarea-container">
                        <div className="card-body-mid">
                          <textarea
                            type="text"
                            placeholder="Remark"
                            value={message.remark}
                            onClick={(e) => e.preventDefault()}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="message-area-bottom">
                      <div className="message-area-date-time">
                        <span className="chat-text">{message.date}</span>
                        <span className="message-time">{message.time}</span>
                      </div>
                      <div className="message-area-who-did">
                        <span className="message-time">Updated by: </span>
                        <span className="chat-text">
                          {message.updatedBy} |{" "}
                        </span>
                        <span className="message-time">{message.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
