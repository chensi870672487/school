<template>
    <div class='wrap'>
      <div class='innerwrap' ref='innerwrap'>
          <div id=''>
              <div class='w1 fl'>
                  <div class='n1'>分类</div>
                  <ul class='n1-1' id='style-categories' ref='menu_list'>
                      <li @click="switcher($event)" class="active">音视频</li>
                      <li @click="switcher($event)">图片</li>
                  </ul>
              </div>
              <div class='w2 fl'>
                  <div class='n2'> 素材展示区 </div>
                  <div id='insert-style-list' class='item tab-content' ref='insert_list' style='height:549px;background: RGBA(255,255,255,0);'>
                      <happy-scroll color='rgba(0,0,0,0.4)' size='6' :min-length-v='20' hide-horizontal resize>
                      <ul class='editor-template-list ui-portlet-list' id='MixItUpC3340E'>
                          <li class='recomment-style  col-xs-12 brushtagtpl-105-brush tagtpl-105 mix' v-for="(item, index) in dataJson.data.lists" :key="index">
                              <fieldset class='135editor' style='border:0 none;'>
                                  <section style='background-color: #000;margin: 0px;'>
                                    <video v-show="dataJson.data.type=='音视频'" controls='' :src='item.url' style="width:100%"></video>
                                    <img v-show="dataJson.data.type=='图片'" alt='图片' border='0' :src='item.url' style='width:100%;vertical-align: top' title='' vspace='0'>
                                  </section>
                              </fieldset>
                              <div class='origin' style='background:#ed603a;' @click="addContent">点击添加</div>
                          </li>
                      </ul>
                      </happy-scroll>
                  </div>
              </div>
          </div>
          <div class=''>
              <div class='w3 fl'>
                  <div class='editor1 fl'>
                      <UE :defaultMsg=defaultMsg :config=config :id=ue1 ref='ue'></UE>
                  </div>
                  <ul class='rightMenu'>
                    <li @click="clearContent()">清空</li>
                    <li @click="showPC()">PC预览</li>
                    <li @click="showMobile()">手机预览</li>
                    <li @click="">完成提交</li>
                  </ul>
              </div>
          </div>
      </div>
      <div class="model" v-if="isDialog">
        <div class="model-dialog" v-if="isMobile">
          <span class="mCloseBtn" @click="isDialog=false">×</span>
          <div v-html="dislogContent" class="pContent"></div>
          <p class="m_tips">此处预览请作为参考，最终效果以手机为准</p>
        </div>
        <div class="pcDialog" v-if="isPC">
          <span class="mCloseBtn" @click="isDialog=false">×</span>
          <div class="pcInner">
            <div v-html="dislogContent"></div>
            <p class="m_tips">此处预览请作为参考，最终效果以电脑为准</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>import UE from '../common/ue.vue'
export default {
  components: {UE},
  name: 'Fastencoding',
  data () {
    return {
      dataJson: {
        code: 10000,
        message: '成功',
        data: {
          type: '音视频',
          lists: [
            {
              title: '音视频标题',
              tags: '音视频标签',
              url: 'http://video.tfjyzx.com/d0feb871979147008c84ead1f9956a88/1d72be2b2a2d4961ace836aad76584ae-5287d2089db37e62345123a1be272f8b.mp4'
            },
            {
              title: '音视频标题',
              tags: '音视频标签',
              url: 'http://video.tfjyzx.com/3ba276835c66499295b821c0b4b87a2b/2c6c2c8111b7413b8ef112a4a7dcfe08-5287d2089db37e62345123a1be272f8b.mp4'
            },
            {
              title: '音视频标题',
              tags: '音视频标签',
              url: 'http://video.tfjyzx.com/28fe3a893f624f02b073e0d443ebf9f6/5b34fbe3fb1744699885ae656a22390e-5287d2089db37e62345123a1be272f8b.mp4'
            },
            {
              title: '音视频标题',
              tags: '音视频标签',
              url: 'http://video.tfjyzx.com/28fe3a893f624f02b073e0d443ebf9f6/5b34fbe3fb1744699885ae656a22390e-5287d2089db37e62345123a1be272f8b.mp4'
            }
          ]
        }
      },
      isPC: false,
      isMobile: false,
      dislogContent: '',
      isDialog: false,
      clientHeight: '',
      height: {
        height: ''
      },
      defaultMsg: "Crystal plane oh my love, 起飞的时候很困难，\n" +
        "但还是努力地冲向天空，带着从不曾有的勇敢。\n" +
        "Crystal plane oh my love，飞起来就坠入云中，\n" +
        "感觉像是迷了路，有些忐忑，有些不安。\n" +
        "也许总觉得相识的太晚，所以总担心这段路太短。\n" +
        "Woo……Crystal plane 给我安慰，\n" +
        "不到终点你不能换乘别的航班。\n" +
        "也许总觉得相识的太晚，\n" +
        "所以总担心这段路太短。\n" +
        "Woo……Crystal plane 给我答案，\n" +
        "从此以后每个起点终点我都会陪你一站又一站",
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 541,
        toolbars: [['source', 'undo', 'redo', 'bold', 'italic', 'underline', 'forecolor', 'backcolor', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', 'indent', '|', 'removeformat'], ['paragraph', 'fontsize', 'rowspacingtop', 'lineheight']],
        elementPathEnabled: false,
        wordCount: false,
        autoHeightEnabled: false
      },
      ue1: 'ue1' // 不同编辑器必须不同的id
    }
  },
  mounted () {
    this.clientHeight = `${document.documentElement.clientHeight}`
    const areaHeight = this.clientHeight - 175
    this.$refs.innerwrap.style.height = areaHeight + 'px'
    this.$refs.menu_list.style.height = areaHeight - 65 + 'px'
    this.height.height = areaHeight - 65 + 'px'
  },
  methods: {
    clearContent () {
      this.$refs.ue.clearContent()
    },
    showMobile () {
      this.isDialog = true
      this.isPC = false
      this.isMobile = true
      this.dislogContent = this.$refs.ue.getUEContent()
    },
    showPC () {
      this.isDialog = true
      this.isPC = true
      this.isMobile = false
      this.dislogContent = this.$refs.ue.getUEContent()
    },
    addContent (e) {
      const html = e.target.previousElementSibling.innerHTML
      this.$refs.ue.addHtml(html)
    },
    switcher (e) {
      const lis = e.target.parentNode.children
      for (var i = 0; i < lis.length; i++) {
        lis[i].className = ''
      }
      e.target.className = 'active'

      this.dataJson = {
        code: 10000,
        message: '成功',
        data: {
          type: '图片',
          lists: [
            {
              title: '音视频标题',
              tags: '音视频标签',
              url: 'http://www.tfjyzx.com:8089/schoolhomepage/开封市晋安小学/校园风采/校园外景_1.jpg'
            },
            {
              title: '音视频标题',
              tags: '音视频标签',
              url: 'http://www.tfjyzx.com:8089/schoolhomepage/开封市晋安小学/校园风采/校园外景2_2.jpg'
            },
            {
              title: '音视频标题',
              tags: '音视频标签',
              url: 'http://www.tfjyzx.com:8089/schoolhomepage/开封市晋安小学/校园风采/教室一览_3.jpg'
            }
          ]
        }
      } // 图片
    },
    siblings (elm) {
      const a = []
      const p = elm.parentNode.children
      for (var i = 0, pl = p.length; i < pl; i++) {
        if (p[i] !== elm) a.push(p[i])
      }
      return a
    }
  }
}
</script>

<style>
  .pcInner{
    width:100%;
    height: 590px;
    overflow-y: auto;
    padding:20px 100px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin-top: 5px;
  }
  .n1-1 li.active, .n1-1 li:hover {
    background: #4c4342;
    text-decoration: none;
  }
  .origin{
    position: absolute;
    top: 5px;
    right: 5px;
    height: 20px;
    line-height: 16px;
    color: #FFF;
    font-weight: bold;
    font-size: 12px;
    padding: 2px;
    background:#ed603a;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .pcDialog{
    color: #333;
    padding: 43px 222px;
    height: 680px;
    background: url('../../assets/img/pcimg.png') no-repeat;
    background-size:100% 100%;
    margin-top:30px;
  }
  .pContent{
    padding:20px;
    height: 550px;
    background: #fff;
    box-sizing: border-box;
    margin-left: 20px;
    width: 320px;
    margin-top:85px;
    overflow-y: auto;
  }
  .m_closeBtn{
    display:block;
    width:80px;
    heihgt:36px;
    line-height:36px;
    text-align:center;
    background-color: #409EFF;
    color:#fff;
    font-size:14px;
    margin: 0px auto;
    cursor: pointer;
  }
  .pcDialog .m_tips{
    margin-top: 20px;
  }
  .m_tips{
    color:red;
    font-size:14px;
    text-align:center;
    margin-top: 5px;
  }
  .pcDialog .mCloseBtn{
    float: right;
    font-size: 54px;
    font-weight: bold;
    line-height: 1;
    color: #ccc;
    margin-top: -54px;
    margin-right: -120px;
    cursor: pointer;
  }
  .mCloseBtn{
    float: right;
    font-size: 54px;
    font-weight: bold;
    line-height: 1;
    color: #ccc;
    margin-top: 0;
    margin-right: -80px;
    cursor: pointer;
  }
  .model-dialog{
    display:table;
    width: 360px;
    height: 720px;
    /*background: #fff;*/
    margin: 20px auto;
    padding-bottom:20px;
    background: url('../../assets/img/phone.png');
    background-size: 100% 100%;
  }
  .model{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color: rgba(0, 0, 0, 1);
    z-index:999;
  }
  .happy-scroll-strip--vertical{
    right: 2px!important;
  }
  .edui-default .edui-editor-toolbarbox{
    box-shadow:none!important;
  }
  .edui-default .edui-editor-toolbarboxouter{
    border-bottom:none!important;
    box-shadow:none!important;
    background-color: rgba(245,245,245,0.5)!important;
    border-radius:0px!important;
  }
  .edui-default .edui-editor-toolbarboxinner{
    padding: 6px 85px!important;
  }
  .edui-default .edui-editor{
    background-color: RGBA(255,255,255,0.3)!important;
    padding-bottom: 10px!important;
    border:none!important;
    border-radius: 0px!important;
  }
  .rightMenu li{
    width: 72px;
    height: 32px;
    line-height:32px;
    text-align:center;
    color: #FFF;
    font-size: 14px;
    border: 0 none;
    box-shadow: 0 0 0px 1px rgba(188,176,167,0.8);
    margin-top: 2px;
    background: rgba(58,51,50,0.4);
    cursor:pointer;
  }
  .edui-default .edui-editor-iframeholder{
    background-color: #fff;
    margin:0 85px;
  }
  .rightMenu li:hover{
    background: rgba(58,51,50,0.7);
  }
  .rightMenu{
    position:absolute;
    right:0;
    top:40%;
    z-index: 999;
  }
    .wrap{
        background: url('../../assets/img/bg1.jpg');
        overflow: hidden;
    }
    .innerwrap{
        width:1120px;
        margin: 28px auto;
        /*background:green;*/
    }
    .fl{
        float: left;
        width: 100%;
    }
    .w1{
        width: 80px;
    }
    .w2{
      width: 384px;
      /*border-right: 2px solid rgba(0,0,0,0.2);*/
    }
    .w3{
      position: relative;
      width: 654px;
      height: 614px;
    }
    .n1{
        height: 65px;
        background: #3a3332;
        color: #dad9d8;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        line-height: 65px;
    }
    .n1-1 {
        height: 503px;
        background: RGBA(0,0,0,0.3);
    }
    .n1-1 li {
      width: 80px;
      height: 50px;
      line-height: 50px;
      color: #dad9d8;
      text-align: center;
      font-size: 14px;
    }
    .n1-1 li a {
        display: block;
        line-height: 50px;
        color: #dad9d8;
        text-decoration: none;
        font-size: 14px;
    }
    .n2 {
        height: 65px;
        background: RGBA(218,98,71,0.95);
        color: #dad9d8;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        line-height: 65px;
    }
    ul.editor-template-list{
        width: 375px;
        box-sizing: border-box;
        margin-left: -1px;
    }
    .n2[data-v-16656be2]{
        width:100%;
    }
    ul.editor-template-list video{
        width:100%;
    }
    .happy-scroll-container{
        width:100%;
    }
    #insert-style-list{
      border-bottom: 1px solid RGBA(255,255,255,0.3);
    }
  #insert-style-list li {
    position: relative;
    background: #FFF;
    padding: 10px 15px;
    cursor: pointer;
    border-bottom: 1px dotted #ddd;
  }
</style>
