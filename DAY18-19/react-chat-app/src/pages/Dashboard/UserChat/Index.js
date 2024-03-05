import React, { useState, useEffect, useRef } from "react";

import {
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Modal,
  ModalHeader,
  ModalBody,
  CardBody,
  Button,
  ModalFooter,
} from "reactstrap";

import SimpleBar from "simplebar-react";

//컴포넌트 라우팅 추가 바인딩
import withRouter from "../../../components/withRouter";

//Import Components

//채팅대상자의 상세 프로필정보 표시 영역-최우측 선택표시
import UserProfileSidebar from "../../../components/UserProfileSidebar";
// import SelectContact from "../../../components/SelectContact";

//현재 선택한 채팅대상자의 기본정보 출력영역
import UserHead from "./UserHead";

//채팅이력내 이미지 첨부 이력 표시영역
import ImageList from "./ImageList";

//채팅 메시지 입력 영역
import ChatInput from "./ChatInput";

//채팅이력내 파일 목록 표시 영역
import FileList from "./FileList";

//Import Images
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import avatar1 from "../../../assets/images/users/avatar-1.jpg";

const Index = (props) => {
  const ref = useRef();

  const [modal, setModal] = useState(false);

  //demo conversation messages
  //userType must be required
  const [allUsers] = useState(props.recentChatList);

  const [chatMessages, setchatMessages] = useState(
    props.recentChatList[props.active_user].messages
  );

  //채팅대상자 변경이나 채팅이력내용이 변경될때마다 실행되는 기능정의
  useEffect(() => {
    setchatMessages(props.recentChatList[props.active_user].messages);

    ref.current.recalculate();

    if (ref.current.el) {
      ref.current.getScrollElement().scrollTop =
        ref.current.getScrollElement().scrollHeight;
    }

    setTimeout(() => {
      scrolltoBottom();
    }, 500);
  }, [props.active_user, props.recentChatList]);

  const toggle = () => setModal(!modal);

  //채팅이력표시 영역에 신규 메시지를 추가해주는 함수
  const addMessage = (message, type) => {
    var messageObj = null;

    let d = new Date();
    var n = d.getSeconds();

    var userType = "other";
    if (message.member_id === props.loginUser.member_id) {
      userType = "sender";
    }

    //matches the message type is text, file or image, and create object according to it
    switch (type) {
      case "textMessage":
        messageObj = {
          id: chatMessages.length + 1,
          message: message.message,
          time: message.msg_date,
          userType,
          image: message.profile_url,
          isFileMessage: false,
          isImageMessage: false,
        };
        break;

      case "fileMessage":
        messageObj = {
          id: chatMessages.length + 1,
          message: "file",
          fileMessage: message.name,
          size: message.size,
          time: "00:" + n,
          userType: "sender",
          image: avatar4,
          isFileMessage: true,
          isImageMessage: false,
        };
        break;

      case "imageMessage":
        var imageMessage = [{ image: message }];

        messageObj = {
          id: chatMessages.length + 1,
          message: "image",
          imageMessage: imageMessage,
          size: message.size,
          time: "00:" + n,
          userType: "sender",
          image: avatar4,
          isImageMessage: true,
          isFileMessage: false,
        };
        break;

      default:
        break;
    }

    //해당 채널의 채팅이력목록에  신규 채팅 메시지 데이터를 추가함
    setchatMessages([...chatMessages, messageObj]);

    let copyallUsers = [...allUsers];

    copyallUsers[props.active_user].messages = [...chatMessages, messageObj];
    copyallUsers[props.active_user].isTyping = false;

    //전체 사용자 목록 전역 데이터를 최신 데이터로 갱신해준다.
    props.setFullUser(copyallUsers);

    //최신 메시지가 채팅이력 영역에 표시되면 스크롤바를 가장 하단이동시킴..
    scrolltoBottom();
  };

  function scrolltoBottom() {
    if (ref.current.el) {
      ref.current.getScrollElement().scrollTop =
        ref.current.getScrollElement().scrollHeight;
    }
  }

  //입력한 메시지 삭제기능
  const deleteMessage = (id) => {
    let conversation = chatMessages;

    var filtered = conversation.filter(function (item) {
      return item.id !== id;
    });

    setchatMessages(filtered);
  };

  return (
    <React.Fragment>
      <div className="user-chat w-100 overflow-hidden">
        <div className="d-lg-flex">
          <div
            className={
              props.userSidebar
                ? "w-70 overflow-hidden position-relative"
                : "w-100 overflow-hidden position-relative"
            }
          >
            {/* render user head */}
            <UserHead
              users={props.recentChatList}
              active_user={props.active_user}
            />

            <SimpleBar
              style={{ maxHeight: "100%" }}
              ref={ref}
              className="chat-conversation p-5 p-lg-4"
              id="messages"
            >
              <ul className="list-unstyled mb-0">
                {chatMessages.map((chat, key) =>
                  chat.isToday && chat.isToday === true ? (
                    <li key={"dayTitle" + key}>
                      <div className="chat-day-title">
                        <span className="title">Today</span>
                      </div>
                    </li>
                  ) : props.recentChatList[props.active_user].isGroup ===
                    true ? (
                    <li
                      key={key}
                      className={chat.userType === "sender" ? "right" : ""}
                    >
                      <div className="conversation-list">
                        <div className="chat-avatar">
                          {chat.userType === "sender" ? (
                            <img src={avatar1} alt="chatvia" />
                          ) : props.recentChatList[props.active_user]
                              .profilePicture === "Null" ? (
                            <div className="chat-user-img align-self-center me-3">
                              <div className="avatar-xs">
                                <span className="avatar-title rounded-circle bg-primary-subtle text-primary">
                                  {chat.userName && chat.userName.charAt(0)}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <img
                              src={
                                props.recentChatList[props.active_user]
                                  .profilePicture
                              }
                              alt="chatvia"
                            />
                          )}
                        </div>

                        <div className="user-chat-content">
                          <div className="ctext-wrap">
                            <div className="ctext-wrap-content">
                              {chat.message && (
                                <p className="mb-0">{chat.message}</p>
                              )}
                              {chat.imageMessage && (
                                // image list component
                                <ImageList images={chat.imageMessage} />
                              )}
                              {chat.fileMessage && (
                                //file input component
                                <FileList
                                  fileName={chat.fileMessage}
                                  fileSize={chat.size}
                                />
                              )}
                              {chat.isTyping && (
                                <p className="mb-0">
                                  typing
                                  <span className="animate-typing">
                                    <span className="dot ms-1"></span>
                                    <span className="dot ms-1"></span>
                                    <span className="dot ms-1"></span>
                                  </span>
                                </p>
                              )}
                              {!chat.isTyping && (
                                <p className="chat-time mb-0">
                                  <i className="ri-time-line align-middle"></i>{" "}
                                  <span className="align-middle">
                                    {chat.time}
                                  </span>
                                </p>
                              )}
                            </div>
                            {!chat.isTyping && (
                              <UncontrolledDropdown className="align-self-start">
                                <DropdownToggle
                                  tag="a"
                                  className="text-muted ms-1"
                                >
                                  <i className="ri-more-2-fill"></i>
                                </DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem>
                                    Copy
                                    <i className="ri-file-copy-line float-end text-muted"></i>
                                  </DropdownItem>
                                  <DropdownItem>
                                    Save
                                    <i className="ri-save-line float-end text-muted"></i>
                                  </DropdownItem>
                                  <DropdownItem onClick={toggle}>
                                    Forward{" "}
                                    <i className="ri-chat-forward-line float-end text-muted"></i>
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={() => deleteMessage(chat.id)}
                                  >
                                    Delete{" "}
                                    <i className="ri-delete-bin-line float-end text-muted"></i>
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            )}
                          </div>
                          {
                            <div className="conversation-name">
                              {chat.userType === "sender"
                                ? "Patricia Smith"
                                : chat.userName}
                            </div>
                          }
                        </div>
                      </div>
                    </li>
                  ) : (
                    <li
                      key={key}
                      className={chat.userType === "sender" ? "right" : ""}
                    >
                      <div className="conversation-list">
                        {
                          //logic for display user name and profile only once, if current and last messaged sent by same receiver
                          chatMessages[key + 1] ? (
                            chatMessages[key].userType ===
                            chatMessages[key + 1].userType ? (
                              <div className="chat-avatar">
                                <div className="blank-div"></div>
                              </div>
                            ) : (
                              <div className="chat-avatar">
                                {chat.userType === "sender" ? (
                                  <img src={avatar1} alt="chatvia" />
                                ) : props.recentChatList[props.active_user]
                                    .profilePicture === "Null" ? (
                                  <div className="chat-user-img align-self-center me-3">
                                    <div className="avatar-xs">
                                      <span className="avatar-title rounded-circle bg-primary-subtle text-primary">
                                        {props.recentChatList[
                                          props.active_user
                                        ].name.charAt(0)}
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  <img
                                    src={
                                      props.recentChatList[props.active_user]
                                        .profilePicture
                                    }
                                    alt="chatvia"
                                  />
                                )}
                              </div>
                            )
                          ) : (
                            <div className="chat-avatar">
                              {chat.userType === "sender" ? (
                                <img src={avatar1} alt="chatvia" />
                              ) : props.recentChatList[props.active_user]
                                  .profilePicture === "Null" ? (
                                <div className="chat-user-img align-self-center me-3">
                                  <div className="avatar-xs">
                                    <span className="avatar-title rounded-circle bg-primary-subtle text-primary">
                                      {props.recentChatList[
                                        props.active_user
                                      ].name.charAt(0)}
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <img
                                  src={
                                    props.recentChatList[props.active_user]
                                      .profilePicture
                                  }
                                  alt="chatvia"
                                />
                              )}
                            </div>
                          )
                        }

                        <div className="user-chat-content">
                          <div className="ctext-wrap">
                            <div className="ctext-wrap-content">
                              {chat.message && (
                                <p className="mb-0">{chat.message}</p>
                              )}
                              {chat.imageMessage && (
                                // image list component
                                <ImageList images={chat.imageMessage} />
                              )}
                              {chat.fileMessage && (
                                //file input component
                                <FileList
                                  fileName={chat.fileMessage}
                                  fileSize={chat.size}
                                />
                              )}
                              {chat.isTyping && (
                                <p className="mb-0">
                                  typing
                                  <span className="animate-typing">
                                    <span className="dot ms-1"></span>
                                    <span className="dot ms-1"></span>
                                    <span className="dot ms-1"></span>
                                  </span>
                                </p>
                              )}
                              {!chat.isTyping && (
                                <p className="chat-time mb-0">
                                  <i className="ri-time-line align-middle"></i>{" "}
                                  <span className="align-middle">
                                    {chat.time}
                                  </span>
                                </p>
                              )}
                            </div>
                            {!chat.isTyping && (
                              <UncontrolledDropdown className="align-self-start ms-1">
                                <DropdownToggle tag="a" className="text-muted">
                                  <i className="ri-more-2-fill"></i>
                                </DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem>
                                    Copy{" "}
                                    <i className="ri-file-copy-line float-end text-muted"></i>
                                  </DropdownItem>
                                  <DropdownItem>
                                    Save{" "}
                                    <i className="ri-save-line float-end text-muted"></i>
                                  </DropdownItem>
                                  <DropdownItem onClick={toggle}>
                                    Forward{" "}
                                    <i className="ri-chat-forward-line float-end text-muted"></i>
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={() => deleteMessage(chat.id)}
                                  >
                                    Delete{" "}
                                    <i className="ri-delete-bin-line float-end text-muted"></i>
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            )}
                          </div>
                          {chatMessages[key + 1] ? (
                            chatMessages[key].userType ===
                            chatMessages[key + 1].userType ? null : (
                              <div className="conversation-name">
                                {chat.userType === "sender"
                                  ? "Patricia Smith"
                                  : props.recentChatList[props.active_user]
                                      .name}
                              </div>
                            )
                          ) : (
                            <div className="conversation-name">
                              {chat.userType === "sender"
                                ? "Admin"
                                : props.recentChatList[props.active_user].name}
                            </div>
                          )}
                        </div>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </SimpleBar>

            <Modal backdrop="static" isOpen={modal} centered toggle={toggle}>
              <ModalHeader toggle={toggle}>Forward to...</ModalHeader>
              <ModalBody>
                <CardBody className="p-2">
                  <SimpleBar style={{ maxHeight: "200px" }}>
                    {/* <SelectContact handleCheck={() => { }} /> */}
                  </SimpleBar>
                  <ModalFooter className="border-0">
                    <Button color="primary">Forward</Button>
                  </ModalFooter>
                </CardBody>
              </ModalBody>
            </Modal>

            <ChatInput onaddMessage={addMessage} />
          </div>

          <UserProfileSidebar
            activeUser={props.recentChatList[props.active_user]}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Index;
