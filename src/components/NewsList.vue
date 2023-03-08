<script setup></script>

<template>
  <div class="module-title">最新资讯</div>
  <div class="news-list">
    <div class="card-list sorf-ware">
      <ul>
        <div class="title">
          <span class="type">软件</span><span class="more">查看更多</span>
        </div>
        <li>
          <a href="#"><span>2014-4-1</span>XXXXXXXX</a>
        </li>
        <li>
          <a href="#"><span>2014-5-1</span>XXXXXXXX</a>
        </li>
        <li>
          <a href="#"><span>2014-6-1</span>XXXXXXXX</a>
        </li>
        <li>
          <a href="#"><span>2014-7-1</span>XXXXXXXX</a>
        </li>
        <li>
          <a href="#"><span>2014-7-1</span>XXXXXXXX</a>
        </li>
      </ul>
      <img src="../assets/img/showcase.svg" alt="showcase" class="img1" />
    </div>

    <div class="card-list hard-ware">
      <img src="../assets/img/2.svg" alt="2" class="img2" />
      <ul>
        <div class="title">
          <span class="type">硬件</span><span class="more">查看更多</span>
        </div>
        <li>
          <a href="#"><span>2014-4-1</span>XXXXXXXX</a>
        </li>
        <li>
          <a href="#"><span>2014-5-1</span>XXXXXXXX</a>
        </li>
        <li>
          <a href="#"><span>2014-6-1</span>XXXXXXXX</a>
        </li>
        <li>
          <a href="#"><span>2014-7-1</span>XXXXXXXX</a>
        </li>
        <li>
          <a href="#"><span>2014-7-1</span>XXXXXXXX</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  background-color: #fff;
  display: inline-block;
}
ul li {
  /* max-width: 600px; */
  line-height: 24px;
}
ul li a,
ul li a:active {
  padding: 5px;
  color: #3c3c3c;
  text-decoration: none;
  display: block;
}
ul li a:hover {
  color: #4834d4;
}
ul li a span {
  float: right;
}

/* 通用 */
.news-list {
  overflow: hidden;
  padding-bottom: 90px;
}
.card-list ul {
  margin-top: 10px;
  border-radius: 15px;
  padding: 10px;
  width: 45%;
  min-width: 500px;
  width: 50%;
}

.type {
  color: #ff2b7d;
  font-size: 20px;
}
.title {
  width: 100%;
}
.more {
  float: right;
  font-size: 14px;
  cursor: pointer;
  line-height: 20px;
  color: skyblue;
}
.more:hover {
  color: #4834d4;
}
/* module-title */
.module-title {
  font-size: 56px;
  background-image: linear-gradient(to right bottom, #ff2b7d, #ffbe49);
  -webkit-background-clip: text;
  color: transparent;
  padding-bottom: 60px;
}
/* software */
@media screen and (max-width: 960px) {
  .img1,
  .img2 {
    display: none;
  }
  .news-list {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    max-width: 960px;
  }
  .card-list {
    /* float: none; */
    flex: 1;
    /* flex-basis: 100%; */
    /* width: 100%; */
    /* margin-left: auto;
    margin-right: auto; */
  }
  .hard-ware ul {
    float: none !important;
  }
}

@media screen and (max-width: 550px) {
  .card-list ul {
    min-width: 350px;
  }
}
.img1 {
  float: right;
  width: 35%;
}
/* hardware */
.hard-ware {
  float: right;
  margin-top: 120px;
}
.hard-ware ul {
  float: right;
}
.img2 {
  float: left;
  width: 35%;
}
</style>
