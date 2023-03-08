<script setup></script>

<template>
  <div class="footer">
    <dl class="itemList">
      <dt class="item">法律法规</dt>
      <dd class="item"><a href="#">xxxxx</a></dd>
      <dd class="item"><a href="#">xxxxx</a></dd>
      <dd class="item"><a href="#">xxxxx</a></dd>
      <dd class="item"><a href="#">xxxxx</a></dd>
    </dl>
    <dl class="itemList">
      <dt class="item">软件相关</dt>
      <dd class="item">xxxxx</dd>
      <dd class="item">xxxxx</dd>
      <dd class="item">xxxxx</dd>
      <dd class="item">xxxxx</dd>
    </dl>
    <dl class="itemList">
      <dt class="item">硬件相关</dt>
      <dd class="item">xxxxx</dd>
      <dd class="item">xxxxx</dd>
      <dd class="item">xxxxx</dd>
      <dd class="item">xxxxx</dd>
    </dl>
    <dl class="itemList">
      <dt class="item">新手指引</dt>
      <dd class="item">xxxxx</dd>
      <dd class="item">xxxxx</dd>
      <dd class="item">xxxxx</dd>
      <dd class="item">xxxxx</dd>
    </dl>
    <dl class="itemList">
      <dt class="item">最新资讯</dt>
      <dd class="item">xxxxx</dd>
      <dd class="item">xxxxx</dd>
      <dd class="item">xxxxx</dd>
    </dl>
    <div class="block"></div>
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
</style>
