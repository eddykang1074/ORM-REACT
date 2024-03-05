import React, { useState } from "react";
import { Input, InputGroup } from "reactstrap";
import { Link } from "react-router-dom";

//simplebar
//yarn add simplebar-react
import SimpleBar from "simplebar-react";

//현재 온라인 접속자 목록
import OnlineUsers from "./OnlineUsers";

const Chats = (props) => {
  //채팅대장자 정보조회 키워드 와 최근 채팅대상자 데이터 상태값 정의
  const [chatBar, setChatBar] = useState({
    searchChat: "조회",
    recentChatList: props.recentChatList,
  });

  //채팅 대상자 목록에서 특정 채팅방을 클릭하며 우측에 채팅화면을 표시해줌
  const openUserChat = (e, chat) => {
    console.log("선택한 채팅 채널정보============", chat);

    e.preventDefault();

    //find index of current chat in array
    var index = props.recentChatList.indexOf(chat);
    console.log("선택한 채팅 채널정보index============", index);

    // set activeUser
    props.activeUser(index);

    var chatList = document.getElementById("chat-list");
    var clickedItem = e.target;
    var currentli = null;

    if (chatList) {
      var li = chatList.getElementsByTagName("li");
      //remove coversation user
      for (var i = 0; i < li.length; ++i) {
        if (li[i].classList.contains("active")) {
          li[i].classList.remove("active");
        }
      }
      //find clicked coversation user
      for (var k = 0; k < li.length; ++k) {
        if (li[k].contains(clickedItem)) {
          currentli = li[k];
          break;
        }
      }
    }

    //activation of clicked coversation user
    if (currentli) {
      currentli.classList.add("active");
    }

    var userChat = document.getElementsByClassName("user-chat");
    if (userChat) {
      userChat[0].classList.add("user-chat-show");
    }

    //removes unread badge if user clicks
    var unread = document.getElementById("unRead" + chat.id);
    if (unread) {
      unread.style.display = "none";
    }
  };

  return (
    <React.Fragment>
      <div>
        <div className="px-4 pt-4">
          <h4 className="mb-4">Chats</h4>
          <div className="search-box chat-search-box">
            <InputGroup className="mb-3 rounded-3">
              <span
                className="input-group-text text-muted bg-light pe-1 ps-3"
                id="basic-addon1"
              >
                <i className="ri-search-line search-icon font-size-18"></i>
              </span>
              <Input
                type="text"
                className="form-control bg-light"
                placeholder="Search messages or users"
              />
            </InputGroup>
          </div>
          {/* Search Box */}
        </div>

        {/* online users */}
        <OnlineUsers />

        {/* Start chat-message-list  */}
        <div>
          <h5 className="mb-3 px-3 font-size-16">Recent</h5>
          <SimpleBar className="chat-message-list">
            <ul
              className="list-unstyled chat-list chat-user-list px-2"
              id="chat-list"
            >
              {chatBar.recentChatList.map((chat, key) => (
                <li
                  key={key}
                  id={"conversation" + key}
                  className={
                    chat.unRead
                      ? "unread"
                      : chat.isTyping
                      ? "typing"
                      : key === props.active_user
                      ? "active"
                      : ""
                  }
                >
                  <Link to="#" onClick={(e) => openUserChat(e, chat)}>
                    <div className="d-flex">
                      {chat.profilePicture === "Null" ? (
                        <div
                          className={
                            "chat-user-img " +
                            chat.status +
                            " align-self-center me-1 ms-0"
                          }
                        >
                          <div className="avatar-xs">
                            <span className="avatar-title rounded-circle bg-primary-subtle text-primary">
                              {chat.name.charAt(0)}
                            </span>
                          </div>
                          {chat.status && <span className="user-status"></span>}
                        </div>
                      ) : (
                        <div
                          className={
                            "chat-user-img " +
                            chat.status +
                            " align-self-center me-1 ms-0"
                          }
                        >
                          <img
                            src={chat.profilePicture}
                            className="rounded-circle avatar-xs"
                            alt="chatvia"
                          />
                          {chat.status && <span className="user-status"></span>}
                        </div>
                      )}

                      <div className="flex-grow-1 overflow-hidden">
                        <h5 className="text-truncate font-size-15 mb-1 ms-3">
                          {chat.name}
                        </h5>
                        <p className="chat-user-message font-size-14 text-truncate mb-0 ms-3">
                          {chat.isTyping ? (
                            <>
                              typing
                              <span className="animate-typing">
                                <span className="dot ms-1"></span>
                                <span className="dot ms-1"></span>
                                <span className="dot ms-1"></span>
                              </span>
                            </>
                          ) : (
                            <>
                              {chat.messages &&
                              chat.messages.length > 0 &&
                              chat.messages[chat.messages.length - 1]
                                .isImageMessage === true ? (
                                <i className="ri-image-fill align-middle me-1"></i>
                              ) : null}
                              {chat.messages &&
                              chat.messages.length > 0 &&
                              chat.messages[chat.messages.length - 1]
                                .isFileMessage === true ? (
                                <i className="ri-file-text-fill align-middle me-1"></i>
                              ) : null}
                              {chat.messages && chat.messages.length > 0
                                ? chat.messages[chat.messages.length - 1]
                                    .message
                                : null}
                            </>
                          )}
                        </p>
                      </div>
                      <div className="font-size-11">
                        {chat.messages && chat.messages.length > 0
                          ? chat.messages[chat.messages.length - 1].time
                          : null}
                      </div>
                      {chat.unRead === 0 ? null : (
                        <div className="unread-message" id={"unRead" + chat.id}>
                          <span className="badge badge-soft-danger rounded-pill">
                            {chat.messages && chat.messages.length > 0
                              ? chat.unRead >= 20
                                ? chat.unRead + "+"
                                : chat.unRead
                              : ""}
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </SimpleBar>
        </div>
        {/* End chat-message-list */}
      </div>
    </React.Fragment>
  );
};

export default Chats;
