import React, { useState, useEffect, useRef } from "react";

import { connect } from "react-redux";
import { setSendMessage, setReceiveMessage } from "../../../redux/actions";

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
  const [chatMessages, setchatMessages] = useState([]);

  useEffect(() => {
    setchatMessages([]);
    props.setSendMessage({
      channel_id: 0,
      member_id: 0,
      name: "",
      profile_url: "",
      message: "",
    });
    props.setReceiveMessage({
      channel_id: 0,
      member_id: 0,
      name: "",
      profile_url: "",
      message: "",
    });
  }, []);

  //채널변경시 마다 메시지목록 초기화
  useEffect(() => {
    setchatMessages([]);
  }, [props.currentChannel]);

  //전역데이터 공간에 메시지 서버로부터 전송된 수신데이터값이 변경될떄마다 특정기능 실행하기
  useEffect(() => {
    console.log(
      "====>신규 메시지 수신 전역데이터 변경===> ",
      props.receiveMessage
    );

    //채팅이력에 신규메시지를 출력하는 함수 호출
    addMessage(props.receiveMessage, "textMessage");
  }, [props.receiveMessage]);

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
    // let conversation = chatMessages;
    // var filtered = conversation.filter(function (item) {
    //   return item.id !== id;
    // });
    // setchatMessages(filtered);
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
                {chatMessages.map((chat, key) => (
                  <li
                    key={key}
                    className={chat.userType === "sender" ? "right" : ""}
                  >
                    <div className="conversation-list">
                      <div className="chat-avatar">
                        <img src={chat.image} />
                      </div>

                      <div className="user-chat-content">
                        <div className="ctext-wrap">
                          <div className="ctext-wrap-content">
                            <p className="mb-0">{chat.message}</p>
                            <p className="chat-time mb-0">
                              <i className="ri-time-line align-middle"></i>{" "}
                              <span className="align-middle">{chat.time}</span>
                            </p>
                          </div>

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
                        </div>
                        <div className="conversation-name">{chat.name}</div>
                      </div>
                    </div>
                  </li>
                ))}
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

const mapStateToProps = (state) => {
  const { receiveMessage, currentChannel } = state.Chat;
  const { userSidebar } = state.Layout;
  const { token, loginUser } = state.Auth;
  return { receiveMessage, currentChannel, loginUser, token, userSidebar };
};

export default connect(mapStateToProps, { setSendMessage, setReceiveMessage })(
  Index
);
