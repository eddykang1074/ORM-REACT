import React, { useState, useEffect } from "react";
import { Input, InputGroup } from "reactstrap";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { setCurrentChannel } from "../../../redux/actions";

import axios from "axios";

//simplebar
//yarn add simplebar-react
import SimpleBar from "simplebar-react";

//현재 온라인 접속자 목록
import OnlineUsers from "./OnlineUsers";

const Chats = (props) => {
  //채팅대장자 정보조회 키워드 와 최근 채팅대상자 데이터 상태값 정의
  const [chatBar, setChatBar] = useState({
    searchChat: "조회",
    myChatList: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:3005/api/chat/mychannels")
      .then((res) => {
        console.log("내 채팅방 목록 조회결과:", res.data);
        setChatBar({ ...chatBar, myChatList: res.data.data });
      })
      .catch((err) => {
        console.log("백엔드 호출 에러 발생");
      });
  }, []);

  //채팅 대상자 목록에서 특정 채팅방을 클릭하며 우측에 채팅화면을 표시해줌
  const openUserChat = (e, chat) => {
    e.preventDefault();
    console.log("현재 선택한 채널 정보 출력", chat);
    props.setCurrentChannel(chat);
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
              {chatBar.myChatList.map((chat, key) => (
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
                      {chat.category_code === 2 ? (
                        <div
                          className={
                            "chat-user-img " +
                            chat.status +
                            " align-self-center me-1 ms-0"
                          }
                        >
                          <div className="avatar-xs">
                            <span className="avatar-title rounded-circle bg-primary-subtle text-primary">
                              {chat.channel_name.charAt(0)}
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
                            src={chat.channel_img_path}
                            className="rounded-circle avatar-xs"
                            alt="chatvia"
                          />
                          {chat.status && <span className="user-status"></span>}
                        </div>
                      )}

                      <div className="flex-grow-1 overflow-hidden">
                        <h5 className="text-truncate font-size-15 mb-1 ms-3">
                          {chat.channel_name}
                        </h5>
                        <p className="chat-user-message font-size-14 text-truncate mb-0 ms-3">
                          {chat.is_typing ? (
                            <>
                              typing
                              <span className="animate-typing">
                                <span className="dot ms-1"></span>
                                <span className="dot ms-1"></span>
                                <span className="dot ms-1"></span>
                              </span>
                            </>
                          ) : (
                            <>{chat.message ? chat.message : null}</>
                          )}
                        </p>
                      </div>
                      <div className="font-size-11">
                        {chat.message.length > 0 ? chat.msg_date : null}
                      </div>
                      {chat.unRead === 0 ? null : (
                        <div className="unread-message">
                          <span className="badge badge-soft-danger rounded-pill">
                            {chat.message && chat.message.length > 0
                              ? chat.not_yet_cnt >= 20
                                ? chat.not_yet_cnt + "+"
                                : chat.not_yet_cnt
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

//export default Chats;
export default connect(null, { setCurrentChannel })(Chats);
