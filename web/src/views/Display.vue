<template>
  <div class="display">
    <div class="topBar">
      <span @click="$router.go(-1)">
        <img class="back" src="../static/back.svg" alt />
      </span>
      <span class="myProfile">商品详情</span>
    </div>
    <div class="box">
      <div class="user">
        <img :src="userdata.header_img_url" alt />
        <div class="about">
          <div class="name">
            {{userdata.name}} *
            <span class="schoolName">{{userdata.school || '未认证'}}</span>
          </div>
          <div class="price">￥{{data.price}}</div>
        </div>
      </div>
      <div class="content">
        <div class="operating">
          <span v-if="!isAttention" class="attention" @click.stop="postAttention(data.from_id)">关注</span>
          <span
            v-if="isAttention"
            class="unattention"
            @click.stop="postAttention(data.from_id)"
          >取消关注</span>
          <span
            v-if="!isCollect"
            class="collect"
            @click.stop="collect(data.commodity_id,data.from_id)"
          >收藏</span>
          <span v-else class="uncollect" @click.stop="collect(data.commodity_id,data.from_id)">取消收藏</span>
        </div>
        <div class="textarea" v-html="data.textarea"></div>
        <div>
          <img class="img" v-if="data.commodity_img1_url" :src="data.commodity_img1_url" alt />
          <img class="img" v-if="data.commodity_img2_url" :src="data.commodity_img2_url" alt />
          <img class="img" v-if="data.commodity_img3_url" :src="data.commodity_img3_url" alt />
          <img class="img" v-if="data.commodity_img4_url" :src="data.commodity_img4_url" alt />
          <img class="img" v-if="data.commodity_img5_url" :src="data.commodity_img5_url" alt />
          <img class="img" v-if="data.commodity_img6_url" :src="data.commodity_img6_url" alt />
        </div>
        <div class="comment">
          <div class="title">留言</div>
          <cube-textarea v-model="content" placeholder="请在这里留言"></cube-textarea>
          <cube-button class="button" @click="postComment" type="submit" :primary="true">确认</cube-button>
        </div>
        <div class="comment">
          <div class="title">全部留言 · {{comment.length}}</div>
          <div v-for="item in comment" :key="item.id">
            <div class="commentLi">
              <img class="header" :src="item.header_img" alt />
              <div class="about">
                <div class="name">{{item.name}}</div>
                <div class="content">{{item.content}}</div>
              </div>
              <cube-button
                :primary="true"
                class="replyButton"
                @click="!replayShow ? replayShow=item.id: replayShow==item.id? replayShow='':replayShow=item.id"
              >{{replayShow == item.id ? "取消":"回复"}}</cube-button>
            </div>
            <div v-if="replayShow == item.id">
              <cube-textarea v-model="replay" placeholder="请在这里留言"></cube-textarea>
              <cube-button class="button" @click="postReplay(item)" type="submit" :primary="true">确认</cube-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Display",
  props: { id: null },
  data() {
    return {
      data: {},
      userdata: {},
      content: "",
      comment: "",
      replayShow: "",
      replay: "",
      isCollect: 0,
      isAttention: Boolean
    };
  },
  created: async function() {
    let res = await this.$http.get("/getarticle", {
      params: {
        id: this.id
      }
    });
    res = res.data;
    this.data = res.data;
    let userdata = await this.$http.get("/simple", {
      params: { id: res.data.from_id }
    });
    userdata = userdata.data;
    let comment = await this.$http.get("/getcomments", {
      params: {
        commodityId: res.data.commodity_id
      }
    });
    this.comment = comment.data.data;
    let isCollect = await this.$http.get("/getcollects", {
      params: {
        owner_id: this.id
      }
    });
    this.isCollect = isCollect.data.data;
    let isAttention = await this.$http.get("/getattention", {
      params: { from_id: this.data.from_id }
    });
    this.isAttention = isAttention.data.data;
    console.log(this.isAttention);

    switch (res.status && userdata.status) {
      case 0:
        this.login = false;
        this.$router.push("/login");
        break;
      case 1:
        this.userdata = userdata.data;
      default:
        break;
    }
  },
  methods: {
    async postComment() {
      if (this.content == "") {
        const toast = this.$createToast({
          txt: "请输入评论再提交",
          time: 1000,
          type: "warn",
          mask: true
        });
        toast.show();
      }
      await this.$http.post("/comments", {
        content: this.content,
        createTime: new Date().getTime(),
        parentId: null,
        toID: this.data.from_id,
        commodityId: this.data.commodity_id
      });
      this.content = "";
      let comment = await this.$http.get("/getcomments", {
        params: {
          commodityId: this.data.commodity_id
        }
      });
      this.comment = comment.data.data;
    },
    async getComment() {
      let res = await this.$http.get("/getcomments", {
        params: {
          commodityId: this.data.commodity_id
        }
      });
      this.comment = res.data.data;
      console.log(this.comment);
    },
    async postReplay(item) {
      if (this.replay == "") {
        const toast = this.$createToast({
          txt: "请输入回复再提交",
          time: 1000,
          type: "warn",
          mask: true
        });
        toast.show();
      }
      await this.$http.post("/comments", {
        content: this.replay,
        createTime: new Date().getTime(),
        parentId: item.id,
        toID: item.from_id,
        commodityId: this.data.commodity_id
      });
      this.replay = "";
      this.replayShow = null;
    },
    async collect(commodity_id, to_id) {
      let isCollect = await this.$http.post("/iscollects", {
        commodity_id: commodity_id,
        to_id: to_id
      });
      if (isCollect.data.status == 3) {
        const toast = this.$createToast({
          time: 1000,
          type: "warn",
          txt: "不可以收藏自己哦！！！"
        });
        toast.show();
      }
      this.isCollect = isCollect.data.data;
    },
    async postAttention(attentios_id) {
      let isAttention = await this.$http.post("/isattentios", {
        attentios_id: attentios_id
      });
      if (isAttention.data.status == 3) {
        const toast = this.$createToast({
          time: 1000,
          type: "warn",
          txt: "不可以关注自己哦！！！"
        });
        toast.show();
      }
      this.isAttention = isAttention.data.data;
    }
  }
};
</script>
<style lang="scss" scoped>
.display {
  position: relative;
  width: 100vw;
  z-index: 100;
  background-color: white;
  .scroll-list-wrap {
    height: calc(100vh - 55px);
  }
  .topBar {
    position: sticky;
    top: 0;
    background-color: #ff4544;
    display: flex;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    .back {
      position: absolute;
      width: 50px;
    }
    .myProfile {
      margin: 0 auto;
    }
  }
  .box {
    // height: calc(100vh + 55px);
    // margin-top: 50px;
    padding: 0 10px;
    .user {
      display: flex;
      font-size: 16px;
      border-bottom: 1px solid #b5b5b5;
      align-items: center;

      .schoolName {
        width: 100px;
        text-align: right;
        height: 16px;
        overflow: hidden;
        color: #ff4544;
      }
      img {
        object-fit: cover;
        width: 40px;
        height: 40px;
      }
      .about {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .price {
          color: red;
        }
      }
    }
    .content {
      padding: 10px 0;
      .operating {
        margin: 10px 0;
        right: 10px;
        font-size: 16px;
        .attention {
          border-radius: 5px;
          padding: 7px 10px 5px;
          background-color: #ff4544;
        }
        .unattention {
          border-radius: 5px;
          padding: 7px 10px 5px;
          background: #b5b5b5;
        }
        .collect {
          border-radius: 5px;
          padding: 7px 10px 5px;
          background-color: #ff4544;
          margin-right: 10px;
        }
        .uncollect {
          border-radius: 5px;
          margin-right: 10px;
          padding: 7px 10px 5px;
          background: #b5b5b5;
        }
      }
      .textarea {
        margin-bottom: 10px;
      }
      .img {
        width: 100%;
        object-fit: cover;
        border-radius: 15px;
      }
      .comment {
        margin-top: 10px;
        font-size: 18px;
        display: flex;
        flex-direction: column;
        .title {
          padding: 10px 0;
          border-top: 1px solid #b5b5b5;
          border-bottom: 1px solid #b5b5b5;
        }
        .button {
          border-radius: 20px;
          margin-top: 10px;
          text-align: center;
          padding: 5px 10px;
          border: 1px solid #b5b5b5;
        }
        .commentLi {
          display: flex;
          border-bottom: 1px solid #b5b5bb;
          .header {
            height: 40px;
            width: 40px;
          }
          .about {
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            .name {
              margin-top: 10px;
              font-weight: 600;
              font-size: 16px;
            }
            .content {
              font-size: 16px;
            }
          }
          .replyButton {
            padding: 0;
            margin-top: 10px;
            border-radius: 5px;
            position: absolute;
            right: 10px;
            width: 50px;
            height: 30px;
          }
        }
      }
    }
  }
}
</style>