import apiClient from "../../../../config/axiosInstance";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getStatusName } from "../../../service/nameFinders";

import { useQuery } from "@tanstack/react-query";

export default function ActivityLog({ curLead }) {
  const { statuses } = useSelector((state) => state.status);

  const {
    data: activityLog,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["activityLog"],
    queryFn: () => apiClient.get(`/log/?leadID=${curLead._id}`),
  });

  useEffect(() => {
    refetch();
  }, [curLead, refetch]);

  return (
    <div className="log">
      <div className="log-header">
        <span className="name-small">Activity Log</span>
        {/* <span className="icons">
          <MdOutlineModeEdit />
        </span> */}
      </div>
      <div className="message-container">
        <div className="message-tree">
          <ul>
            {activityLog?.data?.data[0]?.statusChange
              ?.slice()
              .reverse()
              .map((message, index) => {
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
                          <p className="chat-text">
                            Status updated to {status}
                          </p>
                          <div className="message-area-textarea-container">
                            <div className="card-body-mid">
                              <textarea
                                type="text"
                                placeholder="Remark"
                                // value={remarks[index] || message.remark}
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
                            <span className="message-time">
                              {message?.role}
                            </span>
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
