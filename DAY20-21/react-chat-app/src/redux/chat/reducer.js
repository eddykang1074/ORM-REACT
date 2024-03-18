//STEP1:액션타입 참조
import {
  CHAT_SEND_MSG,
  CHAT_RECEIVE_MSG,
  CHAT_CURRENT_CHANNEL,
} from "../../constants/actionTypes";

//STEP2: 채팅 전역데이터 구조 정의 및 초기값 할당
const INIT_STATE = {
  sendMessage: {
    channel_id: 0,
    member_id: 0,
    name: "",
    profile_url: "",
    message: "",
  },
  receiveMessage: {
    channel_id: 0,
    member_id: 0,
    name: "",
    profile_url: "",
    message: "",
    msg_date: "",
  },
  currentChannel: {},
};

//STEP3: Layout 전역데이터 처리 리듀서 함수 정의
const Chat = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHAT_SEND_MSG:
      return {
        ...state,
        sendMessage: action.payload,
      };
    case CHAT_RECEIVE_MSG:
      return {
        ...state,
        receiveMessage: action.payload,
      };
    case CHAT_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload,
      };
    default:
      return state;
  }
};

export default Chat;
