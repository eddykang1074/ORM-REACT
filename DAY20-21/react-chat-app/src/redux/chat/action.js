//STEP1:액션타입 참조
import {
  CHAT_SEND_MSG,
  CHAT_RECEIVE_MSG,
  CHAT_CURRENT_CHANNEL,
} from "../../constants/actionTypes";

//현재 사용자 입력한 신규 전송 메시지 저장처리 액션함수
export const setSendMessage = (msg) => ({
  type: CHAT_SEND_MSG,
  payload: msg,
});

//타인이 보낸 수신 메시지를 저장처리하는 액션함수
export const setReceiveMessage = (msg) => ({
  type: CHAT_RECEIVE_MSG,
  payload: msg,
});

//채널 선택 전역 정보 저장처리하는 액션함수
export const setCurrentChannel = (channel) => ({
  type: CHAT_CURRENT_CHANNEL,
  payload: channel,
});
