<script setup></script>

<template>
  <div class="footer">
    <dl class="itemList">
      <dt class="item">法律法规</dt>
      <router-link to="/ArticleList/law/10/1">
        <dd class="item">GDPR-通用数据保护条例</dd>
      </router-link>
      <router-link to="/ArticleList/law/10/2"
        ><dd class="item">网络安全与数据安全</dd></router-link
      >

      <router-link to="/ArticleList/law/10/3"
        ><dd class="item">信息安全管理</dd></router-link
      >

      <router-link to="/ArticleList/law/10/4"
        ><dd class="item">行业标准</dd></router-link
      >
    </dl>
    <dl class="itemList">
      <router-link to="/ArticleList/software/10/0"
        ><dt class="item">软件相关</dt></router-link
      >
      <router-link to="/ArticleList/Article/52"
        ><dd class="item">软件信息安全你必须要知道的30个概念</dd></router-link
      >
    </dl>
    <dl class="itemList">
      <router-link to="/ArticleList/hardware/10/0"
        ><dt class="item">硬件相关</dt></router-link
      >

      <router-link to="/ArticleList/Article/46"
        ><dd class="item">硬件信息安全最重要的三十个概念</dd></router-link
      >
    </dl>
    <dl class="itemList">
      <dt class="item">新手指南</dt>

      <router-link to="/ArticleList/Article/58"
        ><dd class="item">新手入门篇1</dd></router-link
      >

      <router-link to="/ArticleList/Article/59"
        ><dd class="item">新手入门篇2_软件</dd></router-link
      >

      <router-link to="/ArticleList/Article/60"
        ><dd class="item">新手入门篇3_硬件</dd></router-link
      >
    </dl>

    <div class="block"></div>
  </div>
  <div class="beian">
    <a href="https://beian.miit.gov.cn" class="item">粤ICP备2023053504号-1</a>
  </div>
</template>

<style scoped>
.footer {
  display: flex;
  /* justify-content: flex-end; */
  padding-bottom: 30px;
}
.itemList {
  flex: 1;
  margin-top: 12px;
  padding-left: 24px;
  /* display: inline-block; */
  border-right: 1px solid #e4e4e4;
}
.item {
  line-height: 16px;
  margin-top: 10px;
  font-size: 12px;
}
.item + dd {
  text-indent: 1em;
  font-size: 14px;
}
a:hover {
  color: #686de0;
}
.block {
  flex-basis: 50%;
}
.beian {
  padding: 10px 0;
}
</style>
