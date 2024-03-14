import React, { useState, useEffect } from "react";

import axios from "axios";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledTooltip,
  Form,
  Label,
  Input,
  Collapse,
  CardHeader,
  CardBody,
  Alert,
  InputGroup,
  Card,
  Badge,
} from "reactstrap";

import { Link } from "react-router-dom";

//simple bar
import SimpleBar from "simplebar-react";

//components
// import SelectContact from "../../../components/SelectContact";

//Import Images
import avatar2 from "../../../assets/images/users/avatar-2.jpg";
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import avatar6 from "../../../assets/images/users/avatar-6.jpg";
import avatar7 from "../../../assets/images/users/avatar-7.jpg";
import avatar8 from "../../../assets/images/users/avatar-8.jpg";

//오리지널 데이터를 인덱스형태로 편집한 구조의 전역변수
let sortedContacts = [
  {
    group: "A",
    children: [{ id: 0, name: "Demo", isChecked: false }],
  },
  {
    group: "B",
    children: [{ id: 0, name: "Demo", isChecked: false }],
  },
];

const Groups = () => {
  const [config, setConfig] = useState({
    modal: false,
    isOpenCollapse: false, //멤버목록버튼 클리시 멤버목록 표시여부
    groups: [],
    selectedContact: [],
    isOpenAlert: false,
    message: "",
    groupName: "",
    groupDesc: "",
    contacts: [
      { id: 1, name: "Albert Rodarte", isChecked: false },
      { id: 2, name: "Allison Etter", isChecked: false },
      { id: 3, name: "Craig Smiley", isChecked: false },
      { id: 4, name: "Daniel Clay", isChecked: false },
      { id: 5, name: "Doris Brown", isChecked: false },
      { id: 6, name: "Iris Wells", isChecked: false },
      { id: 7, name: "Juan Flakes", isChecked: false },
      { id: 8, name: "John Hall", isChecked: false },
      { id: 9, name: "Joy Southern", isChecked: false },
      { id: 10, name: "Mary Farmer", isChecked: false },
    ],
  });

  //채널 등록 팝업창 오픈/닫기 관리 이벤트 핸들러
  const toggle = () => {
    setConfig({ ...config, modal: !config.modal });
  };

  //멤버 리스트 영역 보여주기 토글기능 구현
  const handleContactArea = () => {
    setConfig({ ...config, isOpenCollapse: !config.isOpenCollapse });
  };

  //DB에서 가져온 회원정보를 A,B,C단위로 인덱스형태로 데이터를 재구성해주는 함수
  const sortContact = () => {
    let data = config.contacts.reduce((r, e) => {
      try {
        // get first letter of name of current element
        let group = e.name[0];
        // if there is no property in accumulator with this letter create it
        if (!r[group]) r[group] = { group, children: [e] };
        // if there is push current element to children array for that letter
        else r[group].children.push(e);
      } catch (error) {
        return sortedContacts;
      }
      // return accumulator
      return r;
    }, {});

    // since data at this point is an object, to get array of values
    // we use Object.values method
    let result = Object.values(data);
    //setConfig({ ...config, contacts: result });
    // this.setState({ contacts: result });
    sortedContacts = result;
    return result;
  };

  //최초 화면 렌더링시에 딱 1번만 오리지널 데이터를 인덕스형 데이터 구조롤 변환시킨다.
  useEffect(() => {
    //모달팝업 회원목록 데이터 바인딩
    sortContact();
    getChannels();
  }, []);

  //채널목록 정보 조회함수 구현
  const getChannels = () => {
    //그룹데이터 목록 조회 바인딩처리
    axios
      .get("http://localhost:3005/api/chat/channels")
      .then((res) => {
        console.log("채널목록 조회 결과: ", res.data.data, config);

        setConfig({ ...config, groups: res.data.data });
      })
      .catch((err) => {
        console.error("백엔드 호출 에러 발생");
      });
  };

  //모달창에 그룹정보 데이터 바인딩 처리
  const onGroupChange = (e) => {
    setConfig({ ...config, [e.target.name]: e.target.value });
  };

  //모달 팝업내에서 체크박스 체크/해제시 관련 이벤트 처리하기
  const handleCheck = (e, contactId) => {
    //체크박스가 체크된경우 선택사용자 정보 추가하기
    if (e.target.checked) {
      //선택한 사용자의 주요 정보 추출하기
      var selectMember = {
        id: contactId,
        name: e.target.value,
      };
      //기존 선택된 사용자 목록배열의 복사본을 만들고 신규 사용자 객체를 추가한다.
      setConfig({
        ...config,
        selectedContact: [...config.selectedContact, selectMember],
      });
    }
  };

  //신규 채팅방 그룹 추가하기
  const onSaveGroup = (e) => {
    //axios로 데이터 등록처리하기
    const groupData = {
      channel: {
        channel_name: config.groupName,
        category_code: 2,
        channel_desc: config.groupDesc,
      },
      channelMembers: config.selectedContact,
    };

    console.log("신규채널 생성 API호출하기1 ", groupData, config);

    axios
      .post("http://localhost:3005/api/chat/channel", groupData)
      .then((res) => {
        console.log("신규채널 생성결과:", res.data);
        if (res.data.code == "200") {
          console.log("신규채널 생성 API호출하기2 ", groupData, config.modal);
          setConfig({ ...config, modal: false });
          //getChannels();
        }
      })
      .catch((err) => {
        console.error("백엔드 호출에러발생", err);
      });
  };

  return (
    <React.Fragment>
      <div>
        {/* 상단헤더 영역 */}
        <div className="p-4">
          <div className="user-chat-nav float-end">
            <div id="create-group">
              {/* 신규 그룹채널 추가 아이콘 클릭 버튼 */}
              <Button
                type="button"
                color="link"
                onClick={toggle}
                className="text-decoration-none text-muted font-size-18 py-0"
              >
                <i className="ri-group-line me-1"></i>
              </Button>
            </div>
            <UncontrolledTooltip target="create-group" placement="bottom">
              Create group
            </UncontrolledTooltip>
          </div>

          <h4 className="mb-4">Groups</h4>

          {/* 신규 채널등록 모달팝업  */}
          <Modal isOpen={config.modal} centered toggle={toggle}>
            <ModalHeader
              tag="h5"
              className="modal-title font-size-14"
              toggle={toggle}
            >
              Create New Group
            </ModalHeader>

            <ModalBody className="p-4">
              <Form>
                <div className="mb-4">
                  <Label className="form-label" htmlFor="addgroupname-input">
                    Group Name
                  </Label>
                  <Input
                    type="text"
                    name="groupName"
                    className="form-control"
                    id="addgroupname-input"
                    placeholder="Enter Group Name"
                    value={config.groupName}
                    onChange={onGroupChange}
                  />
                </div>
                <div className="mb-4">
                  <Label className="form-label">Group Members</Label>
                  <Alert isOpen={config.isOpenAlert} color="danger">
                    메시지
                  </Alert>
                  <div className="mb-3">
                    <Button
                      color="light"
                      size="sm"
                      type="button"
                      onClick={handleContactArea}
                    >
                      Select Members
                    </Button>
                  </div>

                  {/* 회원목록 출력영역  */}
                  <Collapse
                    isOpen={config.isOpenCollapse}
                    id="groupmembercollapse"
                  >
                    <Card className="border">
                      <CardHeader>
                        <h5 className="font-size-15 mb-0">Contacts</h5>
                      </CardHeader>
                      <CardBody className="p-2">
                        <SimpleBar style={{ maxHeight: "150px" }}>
                          {/* contacts */}
                          <div id="addContacts">
                            {sortedContacts.map((contact, key) => (
                              <div key={key}>
                                <div className="p-3 font-weight-bold text-primary">
                                  {contact.group}
                                </div>

                                <ul className="list-unstyled contact-list">
                                  {contact.children.map((child, keyChild) => (
                                    <li key={keyChild}>
                                      <div className="form-check">
                                        <Input
                                          type="checkbox"
                                          className="form-check-input"
                                          onChange={(e) =>
                                            handleCheck(e, child.id)
                                          }
                                          id={"memberCheck" + child.id}
                                          value={child.name}
                                        />
                                        <Label
                                          className="form-check-label"
                                          htmlFor={"memberCheck" + child.id}
                                        >
                                          {child.name}
                                        </Label>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </SimpleBar>
                      </CardBody>
                    </Card>
                  </Collapse>
                </div>
                <div>
                  <Label
                    className="form-label"
                    htmlFor="addgroupdescription-input"
                  >
                    Description
                  </Label>
                  <textarea
                    className="form-control"
                    id="addgroupdescription-input"
                    name="groupDesc"
                    rows="3"
                    value={config.groupDesc}
                    placeholder="Enter Description"
                    onChange={onGroupChange}
                  ></textarea>
                </div>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button type="button" color="link" onClick={toggle}>
                Close
              </Button>
              <Button type="button" color="primary" onClick={onSaveGroup}>
                Create Group
              </Button>
            </ModalFooter>
          </Modal>

          <div className="search-box chat-search-box">
            <InputGroup size="lg" className="bg-light rounded-lg">
              <Button
                color="link"
                className="text-decoration-none text-muted pr-1"
                type="button"
              >
                <i className="ri-search-line search-icon font-size-18"></i>
              </Button>
              <Input
                type="text"
                className="form-control bg-light"
                placeholder="Search groups..."
              />
            </InputGroup>
          </div>
          {/* end search-box */}
        </div>

        {/* Start chat-group-list */}
        <SimpleBar
          style={{ maxHeight: "100%" }}
          className="p-4 chat-message-list chat-group-list"
        >
          <ul className="list-unstyled chat-list">
            {config.groups.map((group, key) => (
              <li key={key}>
                <Link to="#">
                  <div className="d-flex align-items-center">
                    <div className="chat-user-img me-3 ms-0">
                      <div className="avatar-xs">
                        <span className="avatar-title rounded-circle bg-primary-subtle text-primary">
                          {group.channel_name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="text-truncate font-size-14 mb-0">
                        {group.channel_name}

                        {/* {group.unRead !== 0 ? (
                          <Badge
                            color="none"
                            pill
                            className="badge-soft-danger float-end"
                          >
                            {group.unRead >= 20
                              ? group.unRead + "+"
                              : group.unRead}
                          </Badge>
                        ) : null} */}
                        {/* 
                        {group.isNew && (
                          <Badge
                            color="none"
                            pill
                            className="badge-soft-danger float-end"
                          >
                            New
                          </Badge>
                        )} */}
                      </h5>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </SimpleBar>
        {/* End chat-group-list */}
      </div>
    </React.Fragment>
  );
};

export default Groups;
