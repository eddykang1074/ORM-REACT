import React, { useState } from "react";

//전역데이터 공간연결을 위해 connect/액션함수 참조하기
import { connect } from "react-redux";
import { setSendMessage } from "../../../redux/actions";

import {
  Button,
  Input,
  Row,
  Col,
  UncontrolledTooltip,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  Label,
  Form,
} from "reactstrap";

//yarn add emoji-picker-react
import EmojiPicker from "emoji-picker-react";

const ChatInput = (props) => {
  //사용자 메시지 입력 데이터 상태값정의
  const [textMessage, settextMessage] = useState("");

  const [isOpen, setisOpen] = useState(false);

  const [file, setfile] = useState({
    name: "",
    size: "",
  });

  const [fileImage, setfileImage] = useState("");

  const toggle = () => setisOpen(!isOpen);

  //function for text input value change
  const handleChange = (e) => {
    settextMessage(e.target.value);
  };

  const onEmojiClick = (event) => {
    settextMessage(textMessage + event.emoji);
  };

  //function for file input change
  const handleFileChange = (e) => {
    if (e.target.files.length !== 0)
      setfile({
        name: e.target.files[0].name,
        size: e.target.files[0].size,
      });
  };

  //function for image input change
  const handleImageChange = (e) => {
    if (e.target.files.length !== 0)
      setfileImage(URL.createObjectURL(e.target.files[0]));
  };

  //현재 사용자가 신규 전송 메시지를 입력 전송버튼을 클릭하면 실행되는 함수
  //신규 메시지를 리덕스 전역데이터의 Chat.sendMessage 값을 수정해준다.
  const onaddMessage = (e, textMessage) => {
    e.preventDefault();
    console.log("메시지가 발송되었습니다.................");

    //if text value is not emptry then call onaddMessage function
    if (textMessage !== "") {
      //전역상태공간의 Chat.sendMessage 값을 갱신해야한다.
      // var sendData = {
      //   channel_id: 0,
      //   member_id: props.loginUser.member_id,
      //   name: props.loginUser.name,
      //   profile_url: props.loginUser.profile_url,
      //   message: textMessage,
      // };

      //전역전송 데이터 준비
      var sendData = {
        channel_id: props.currentChannel.channel_id,
        member_id: props.loginUser.member_id,
        name: props.loginUser.name,
        profile_url: props.loginUser.profile_img_path,
        message: textMessage,
      };

      //전역공간에 액션함수를 이용해 전역공간 전송메시지 업데이트처리
      props.setSendMessage(sendData);

      //사용자 메시지 입력박스내 값을 초기화해준다.
      settextMessage("");
    }

    //if file input value is not empty then call onaddMessage function
    if (file.name !== "") {
      props.onaddMessage(file, "fileMessage");
      setfile({
        name: "",
        size: "",
      });
    }

    //if image input value is not empty then call onaddMessage function
    if (fileImage !== "") {
      props.onaddMessage(fileImage, "imageMessage");
      setfileImage("");
    }
  };

  return (
    <React.Fragment>
      <div className="chat-input-section p-3 p-lg-4 border-top mb-0 ">
        <Form onSubmit={(e) => onaddMessage(e, textMessage)}>
          <Row className="g-0">
            <Col>
              <div>
                <Input
                  type="text"
                  value={textMessage}
                  onChange={handleChange}
                  className="form-control form-control-lg bg-light border-light"
                  placeholder="Enter Message..."
                />
              </div>
            </Col>
            <Col xs="auto">
              <div className="chat-input-links ms-md-2">
                <ul className="list-inline mb-0 ms-0">
                  <li className="list-inline-item">
                    <ButtonDropdown
                      className="emoji-dropdown"
                      direction="up"
                      isOpen={isOpen}
                      toggle={toggle}
                    >
                      <DropdownToggle
                        id="emoji"
                        color="link"
                        className="text-decoration-none font-size-16 btn-lg waves-effect"
                      >
                        <i className="ri-emotion-happy-line"></i>
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end">
                        <EmojiPicker onEmojiClick={onEmojiClick} />
                      </DropdownMenu>
                    </ButtonDropdown>
                    <UncontrolledTooltip target="emoji" placement="top">
                      Emoji
                    </UncontrolledTooltip>
                  </li>
                  <li className="list-inline-item input-file">
                    <Label
                      id="files"
                      className="btn btn-link text-decoration-none font-size-16 btn-lg waves-effect"
                    >
                      <i className="ri-attachment-line"></i>
                      <Input type="file" name="fileInput" size="60" />
                    </Label>
                    <UncontrolledTooltip target="files" placement="top">
                      Attached File
                    </UncontrolledTooltip>
                  </li>
                  <li className="list-inline-item input-file">
                    <Label
                      id="images"
                      className="me-1 btn btn-link text-decoration-none font-size-16 btn-lg waves-effect"
                    >
                      <i className="ri-image-fill"></i>
                      <Input
                        accept="image/*"
                        type="file"
                        name="fileInput"
                        size="60"
                      />
                    </Label>
                    <UncontrolledTooltip target="images" placement="top">
                      Images
                    </UncontrolledTooltip>
                  </li>
                  <li className="list-inline-item">
                    <Button
                      type="submit"
                      color="primary"
                      className="font-size-16 btn-lg chat-send waves-effect waves-light"
                    >
                      <i className="ri-send-plane-2-fill"></i>
                    </Button>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const { sendMessage, currentChannel } = state.Chat;
  const { token, loginUser } = state.Auth;
  return { sendMessage, currentChannel, loginUser, token };
};

//export default ChatInput;
export default connect(mapStateToProps, { setSendMessage })(ChatInput);
