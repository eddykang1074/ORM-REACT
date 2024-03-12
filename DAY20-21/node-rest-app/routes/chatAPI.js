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

module.exports = router;
