import { MdOutlineModeEdit } from "react-icons/md";
import apiClient from "../../../../config/axiosInstance";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getStatusName } from "../../../service/nameFinders";
import { useApi } from "../../../context/apiContext/ApiContext";
export default function ActivityLog({ curLead }) {
  const [activityLog, setActivityLog] = useState([]);
  // const { curLead } = useSelector((state) => state.leads);

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

  const { statuses } = useSelector((state) => state.status);

  useEffect(() => {
    if (curLead && curLead._id) {
      fetchActivityLog();
    }
  }, [curLead]);

  const fetchActivityLog = async () => {
    const response = await apiClient.get(`/log/?leadID=${curLead._id}`);
    setActivityLog(response?.data?.data[0]?.statusChange);
  };

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
            {activityLog.map((message, index) => {
              let status = getStatusName(message?.statusID, statuses);

              return (
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
                        <p className="chat-text">Status updated to {status}</p>
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
                          <span className="chat-text">
                            {new Date(message?.updated).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                timeZone: "Asia/Kolkata",
                              }
                            )}
                          </span>
                          <span className="message-time">
                            {new Date(message?.updated).toLocaleTimeString(
                              "en-IN",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                timeZone: "Asia/Kolkata",
                              }
                            )}
                          </span>
                        </div>
                        <div className="message-area-who-did">
                          <span className="message-time">Updated by: </span>
                          <span className="chat-text">
                            {message?.updatedBy} |{" "}
                          </span>
                          <span className="message-time">{message?.role}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
