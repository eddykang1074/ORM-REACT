var express = require("express");
var router = express.Router();

var db = require("../models/index");
var sequelize = db.sequelize;
var Op = db.Sequelize.Op;
const { QueryTypes } = sequelize;

/* 
-모든 채널정보 조회 REST API 라우팅 메소드 
-호출주소: http://localhost:3005/api/chat/channels
-호출방식: GET
-반환값:
*/
router.get("/channels", async (req, res, next) => {
  var apiResult = {
    code: "",
    data: {},
    result: "",
  };

  try {
    var channels = await db.Channel.findAll();

    apiResult.code = "200";
    apiResult.data = channels;
    apiResult.result = "Ok";
  } catch (err) {
    apiResult.code = "500";
    apiResult.data = null;
    apiResult.result = "Failed";
  }

  res.json(apiResult);
});

/* 
  -신규 채널 등록처리  REST API 라우팅 메소드 
  -호출주소: http://localhost:3005/api/chat/channel
  -호출방식: POST
  -반환값:신규채널정보
  */
router.post("/channel", async (req, res, next) => {
  var apiResult = {
    code: "",
    data: {},
    result: "",
  };

  try {
    var channel = req.body.channel;
    var channelMembers = req.body.channelMembers;

    var channel = {
      community_id: 1,
      category_code: channel.category_code,
      channel_name: channel.channel_name,
      user_limit: 100,
      channel_desc: channel.channel_desc,
      channel_state_code: 1,
      reg_date: Date.now(),
      reg_member_id: 1,
    };

    //채널정보 등록
    var dbChannel = await db.Channel.create(channel);

    //채널참여멤버 일괄 등록
    for (member of channelMembers) {
      var chatMember = {
        channel_id: dbChannel.channel_id,
        member_id: member.id,
        nick_name: member.name,
        member_type_code: 0,
        active_state_code: 0,
        connection_id: "",
        ip_address: "",
      };

      await db.ChannelMember.create(chatMember);
    }

    apiResult.code = "200";
    apiResult.data = dbChannel;
    apiResult.result = "Ok";
  } catch (err) {
    apiResult.code = "500";
    apiResult.data = null;
    apiResult.result = "Failed";
  }

  res.json(apiResult);
});

/* 
-마이 채널 목록 조회 REST API 라우팅 메소드 
-호출주소: http://localhost:3005/api/chat/mychannels
-호출방식: GET
-반환값:
*/
router.get("/mychannels", async (req, res, next) => {
  var apiResult = {
    code: "",
    data: {},
    result: "",
  };

  try {
    //현재 로그인한 사용자정보는 req.header의 jwt인증 토큰값을 기반으로
    //로그인한 사용자 정보를 조회해옵니다.

    let memberId = 1;

    var sqlQuery = `SELECT 
    C.channel_id,
    C.category_code,
    CASE WHEN C.category_code = 2 THEN C.channel_name ELSE (SELECT nick_name FROM channel_member WHERE channel_id=C.channel_id AND member_id != 1) END AS channel_name,
    CASE WHEN C.category_code = 2 THEN IFNULL(C.channel_img_path,'') ELSE (
    (SELECT profile_img_path FROM member WHERE member_id = (SELECT member_id FROM channel_member WHERE channel_id=C.channel_id AND member_id != 1))
    ) END AS channel_img_path,
    C.channel_state_code,
    M.member_id,
    (SELECT group_concat(nick_name)  FROM channel_member WHERE channel_id=C.channel_id) as chat_users,
    (SELECT count(*) from channel_member WHERE channel_id = C.channel_id) as chat_user_cnt,
    (SELECT COUNT(*) FROM channel_msg WHERE channel_id = C.channel_id AND 
    msg_date > (SELECT IFNULL(M1.last_out_date,M1.edit_date) FROM channel_member M1 WHERE M1.channel_id = C.channel_id AND M1.member_id =1 AND M1.ACTIVE_STATE_CODE = 0)
    AND msg_type_code ='2') AS not_yet_cnt,
    IFNULL(L.message,'') AS message,
    IFNULL(L.msg_date,'') AS msg_date,
    0 as is_typing 
    FROM channel C 
    INNER JOIN channel_member M
      ON C.channel_id = M.channel_id AND M.member_id = ${memberId}
    Left Outer Join
    (
        #채널별 최근 메시지 가져오기 
      SELECT channel_id,member_id,message,msg_date FROM 
      (
        SELECT 
        ROW_NUMBER() OVER(PARTITION BY channel_id ORDER BY channel_msg_id Desc) AS 'row_num',
        channel_id,
        member_id,
        msg_type_code,
        message,
            msg_date
        FROM channel_msg WHERE msg_type_code = '2' 
      ) AA WHERE row_num = 1
    ) L 
    ON C.channel_id = L.channel_id          
    WHERE C.channel_state_code = 1 `;

    var myChannels = await sequelize.query(sqlQuery, {
      raw: true,
      type: QueryTypes.SELECT,
    });

    apiResult.code = "200";
    apiResult.data = myChannels;
    apiResult.result = "Ok";
  } catch (err) {
    apiResult.code = "500";
    apiResult.data = null;
    apiResult.result = "Failed";
  }

  res.json(apiResult);
});

module.exports = router;
