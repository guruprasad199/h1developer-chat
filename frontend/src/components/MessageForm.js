import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import "./MessageForm.css";

const MessageForm = () => {
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.user);
  const { socket, currentRoom, setMessages, messages, privateMemberMsg } =
    useContext(AppContext);
  const messageEndRef = useRef(null);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();

    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();

    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  }


  function scrollToBottom() {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  const todayDate = getFormattedDate();

  socket.off("room-messages").on("room-messages", (roomMessages) => {
    setMessages(roomMessages);
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!message) return;
    const today = new Date();
    const minutes =
      today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;
    socket.emit("message-room", roomId, message, user, time, todayDate);
    setMessage("");
  }
  return user ? (
    <>
      <div className="messages-output">
        {user && privateMemberMsg?._id && (
          <>
            <div
              style={{
                background: "gray",
                textAlign: "center",
                padding: "10px 0px 10px 0px",
              }}
            >
              Your conversation with {privateMemberMsg.name}
            </div>
          </>
        )}
        {user &&
          messages.map(({ _id: date, messagesByDate }, idx) => (
            <div key={idx}>
              <p className="alert alert-info text-center message-date-indicator">
                {date}
              </p>
              {messagesByDate?.map(
                ({ content, time, from: sender }, msgIdx) => (
                  <div
                    className={
                      sender?.email === user?.email
                        ? "incoming-message"
                        : "message"
                    }
                    key={msgIdx}
                  >
                    <div className="message-inner">
                      <div className="d-flex align-items-center mb-3">
                      </div>
                      <p className="message-content">{content}</p>
                      <div style={{display:'flex', alignItems:'center'}}>
                        <p style={{marginRight:'5px'}} >
                          {sender._id === user?._id ? "You" : sender.name}
                        </p>
                        <p>{time}</p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          ))}
        <div ref={messageEndRef} />
      </div>
      <form onSubmit={handleSubmit}>
        <>
            <>
              <input
                type="text"
                placeholder="Your message"
                disabled={!user}
                value={message}
                style={{width:'95%'}}
                onChange={(e) => setMessage(e.target.value)}
              ></input>
            </>
            <button
              variant="primary"
              type="submit"
              style={{  backgroundColor: "orange" }}
              disabled={!user}
            >
              <i className="fas fa-paper-plane"></i>
            </button>
        </>
      </form>
    </>
  ) : (
    <>
      <div style={{ marginTop: "40px" }}>
        <h1>Please go and login first</h1>
      </div>
    </>
  );
}

export default MessageForm;
