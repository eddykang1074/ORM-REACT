import React, { useState } from "react";
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
//import SelectContact from "../../../components/SelectContact";

//Import Images
import avatar2 from "../../../assets/images/users/avatar-2.jpg";
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import avatar6 from "../../../assets/images/users/avatar-6.jpg";
import avatar7 from "../../../assets/images/users/avatar-7.jpg";
import avatar8 from "../../../assets/images/users/avatar-8.jpg";

const Groups = () => {
  const [config, setConfig] = useState({
    modal: false,
    isOpenCollapse: false,
    groups: [
      {
        gourpId: 1,
        name: "#General",
        profilePicture: "Null",
        isGroup: true,
        unRead: 0,
        desc: "General Group",
        members: [
          {
            userId: 1,
            name: "Sara Muller",
            profilePicture: "Null",
            role: null,
          },
          {
            userId: 2,
            name: "Ossie Wilson",
            profilePicture: avatar8,
            role: "admin",
          },
          {
            userId: 3,
            name: "Jonathan Miller",
            profilePicture: "Null",
            role: null,
          },
          {
            userId: 4,
            name: "Paul Haynes",
            profilePicture: avatar7,
            role: null,
          },
          { userId: 5, name: "Yana sha", profilePicture: avatar3, role: null },
          {
            userId: 6,
            name: "Steve Walker",
            profilePicture: avatar6,
            role: null,
          },
        ],
      },
      {
        gourpId: 2,
        name: "#Reporting",
        profilePicture: "Null",
        isGroup: true,
        unRead: 23,
        desc: "reporing Group here...",
        members: [
          {
            userId: 1,
            name: "Sara Muller",
            profilePicture: "Null",
            role: null,
          },
          {
            userId: 2,
            name: "Ossie Wilson",
            profilePicture: avatar8,
            role: "admin",
          },
          {
            userId: 3,
            name: "Jonathan Miller",
            profilePicture: "Null",
            role: null,
          },
          {
            userId: 4,
            name: "Paul Haynes",
            profilePicture: avatar7,
            role: null,
          },
          { userId: 5, name: "Yana sha", profilePicture: avatar3, role: null },
          {
            userId: 6,
            name: "Steve Walker",
            profilePicture: avatar6,
            role: null,
          },
        ],
      },
      {
        gourpId: 3,
        name: "#Designer",
        profilePicture: "Null",
        isGroup: true,
        unRead: 0,
        isNew: true,
        desc: "designers Group",
        members: [
          {
            userId: 1,
            name: "Sara Muller",
            profilePicture: "Null",
            role: null,
          },
          {
            userId: 2,
            name: "Ossie Wilson",
            profilePicture: avatar8,
            role: "admin",
          },
          {
            userId: 3,
            name: "Jonathan Miller",
            profilePicture: "Null",
            role: null,
          },
          {
            userId: 4,
            name: "Paul Haynes",
            profilePicture: avatar7,
            role: null,
          },
          { userId: 5, name: "Yana sha", profilePicture: avatar3, role: null },
          {
            userId: 6,
            name: "Steve Walker",
            profilePicture: avatar6,
            role: null,
          },
        ],
      },
      {
        gourpId: 4,
        name: "#Developers",
        profilePicture: "Null",
        isGroup: true,
        unRead: 0,
        desc: "developers Group",
        members: [
          {
            userId: 1,
            name: "Sara Muller",
            profilePicture: "Null",
            role: null,
          },
          {
            userId: 2,
            name: "Ossie Wilson",
            profilePicture: avatar8,
            role: "admin",
          },
          {
            userId: 3,
            name: "Jonathan Miller",
            profilePicture: "Null",
            role: null,
          },
          {
            userId: 4,
            name: "Paul Haynes",
            profilePicture: avatar7,
            role: null,
          },
          { userId: 5, name: "Yana sha", profilePicture: avatar3, role: null },
          {
            userId: 6,
            name: "Steve Walker",
            profilePicture: avatar6,
            role: null,
          },
        ],
      },
      {
        gourpId: 5,
        name: "#Project-aplha",
        profilePicture: "Null",
        isGroup: true,
        unRead: 0,
        isNew: true,
        desc: "project related Group",
        members: [
          {
            userId: 1,
            name: "Sara Muller",
            profilePicture: "Null",
            role: null,
          },
          {
            userId: 2,
            name: "Ossie Wilson",
            profilePicture: avatar8,
            role: "admin",
          },
          {
            userId: 3,
            name: "Jonathan Miller",
            profilePicture: "Null",
            role: null,
          },
          {
            userId: 4,
            name: "Paul Haynes",
            profilePicture: avatar7,
            role: null,
          },
          { userId: 5, name: "Yana sha", profilePicture: avatar3, role: null },
          {
            userId: 6,
            name: "Steve Walker",
            profilePicture: avatar6,
            role: null,
          },
        ],
      },
      {
        gourpId: 6,
        name: "#Snacks",
        profilePicture: "Null",
        isGroup: true,
        unRead: 0,
        desc: "snacks Group",
        members: [
          {
            userId: 1,
            name: "Sara Muller",
            profilePicture: "Null",
            role: null,
          },
          {
            userId: 2,
            name: "Ossie Wilson",
            profilePicture: avatar8,
            role: "admin",
          },
          {
            userId: 3,
            name: "Jonathan Miller",
            profilePicture: "Null",
            role: null,
          },
          {
            userId: 4,
            name: "Paul Haynes",
            profilePicture: avatar7,
            role: null,
          },
          { userId: 5, name: "Yana sha", profilePicture: avatar3, role: null },
          {
            userId: 6,
            name: "Steve Walker",
            profilePicture: avatar6,
            role: null,
          },
        ],
      },
    ],
    selectedContact: [],
    isOpenAlert: false,
    message: "",
    groupName: "",
    groupDesc: "",
  });

  const toggle = () => {
    setConfig({ ...config, modal: !config.modal });
  };

  return (
    <React.Fragment>
      <div>
        <div className="p-4">
          <div className="user-chat-nav float-end">
            <div id="create-group">
              {/* Button trigger modal */}
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

          {/* Start add group Modal */}
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
                    className="form-control"
                    id="addgroupname-input"
                    placeholder="Enter Group Name"
                    value={config.groupName}
                  />
                </div>
                <div className="mb-4">
                  <Label className="form-label">Group Members</Label>
                  <Alert isOpen={false} color="danger">
                    메시지
                  </Alert>
                  <div className="mb-3">
                    <Button color="light" size="sm" type="button">
                      Select Members
                    </Button>
                  </div>

                  <Collapse isOpen={false} id="groupmembercollapse">
                    <Card className="border">
                      <CardHeader>
                        <h5 className="font-size-15 mb-0">Contacts</h5>
                      </CardHeader>
                      <CardBody className="p-2">
                        <SimpleBar style={{ maxHeight: "150px" }}>
                          {/* contacts */}
                          {/* <div id="addContacts">
                            <SelectContact />
                          </div> */}
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
                    rows="3"
                    value={config.groupDesc}
                    placeholder="Enter Description"
                  ></textarea>
                </div>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button type="button" color="link">
                Close
              </Button>
              <Button type="button" color="primary">
                Create Group
              </Button>
            </ModalFooter>
          </Modal>
          {/* End add group Modal */}

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
                          {group.name.charAt(1)}
                        </span>
                      </div>
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="text-truncate font-size-14 mb-0">
                        {group.name}
                        {group.unRead !== 0 ? (
                          <Badge
                            color="none"
                            pill
                            className="badge-soft-danger float-end"
                          >
                            {group.unRead >= 20
                              ? group.unRead + "+"
                              : group.unRead}
                          </Badge>
                        ) : null}

                        {group.isNew && (
                          <Badge
                            color="none"
                            pill
                            className="badge-soft-danger float-end"
                          >
                            New
                          </Badge>
                        )}
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
