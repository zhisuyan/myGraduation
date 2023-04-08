<script setup>
import { onMounted, reactive, ref } from 'vue';
import * as echarts from 'echarts';
import { createAxiosByinterceptors } from '../../utils/net';
import { useRouter } from 'vue-router';
const router = useRouter();

const request = createAxiosByinterceptors({});

let api = reactive({});
let api2 = reactive({});
let api3 = reactive({});

function getFlow() {
  return request
    .get(`/admin/visitorFlow`)
    .then(response => {
      api = response.data;
      if (api.status === 0) {
      } else if (api.status === 401) {
        ElMessage({
          showClose: true,
          message: '身份认证已过期,请重新登陆',
          type: 'warning',
          duration: 2000,
          offset: 450,
        });
        setTimeout(() => {
          router.push({ path: '/login' });
        }, 1000);
      } else if (api.status === 1) {
        ElMessage({
          showClose: true,
          message: '服务器错误,请稍后再试',
          type: 'warning',
          duration: 2000,
          offset: 450,
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function getArticleFlow() {
  return request
    .get(`/admin/visitArticle`)
    .then(response => {
      api2 = response.data;
    })
    .catch(error => {
      console.log(error);
    });
}

function getOrderFlow() {
  return request
    .get(`/admin/orderFlow`)
    .then(response => {
      api3 = response.data;
      console.log(api3.data);
    })
    .catch(error => {
      console.log(error);
    });
}

const view_one = ref();
const view_two = ref();
const view_three = ref();

// 访客流量表
const init_one = () => {
  const myChart = echarts.init(view_one.value);

  // 此处粘贴图表代码
  let option = {
    title: {
      text: '访客流量',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['总访客', '登录用户', '游客'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
    },
    yAxis: {},
    dataset: {
      dimensions: ['days', '总访客', '登录用户', '游客'],
      source: api.data,
    },
    series: [{ type: 'line' }, { type: 'line' }, { type: 'line' }],
  };

  myChart.setOption(option);
};

// 最受欢迎文章
const init_two = () => {
  const myChart = echarts.init(view_two.value);

  let option = {
    title: {
      text: '最受欢迎文章',
    },
    legend: {
      top: 'bottom',
    },
    tooltip: {
      trigger: 'item',
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [36, 150],
        center: ['50%', '40%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8,
        },
        label: {
          show: false,
        },
        data: api2.data,
      },
    ],
  };
  myChart.setOption(option);
};

// 付费文章排行
const init_three = () => {
  const myChart = echarts.init(view_three.value);

  let option = {
    title: {
      text: '付费文章排行',
    },
    tooltip: {
      trigger: 'item',
    },
    dataset: [
      {
        dimensions: ['title', 'count'],
        source: api3.data,
      },
      {
        transform: {
          type: 'sort',
          config: { dimension: 'count', order: 'desc' },
        },
      },
    ],
    xAxis: {
      type: 'category',
      axisLabel: {
        interval: 0,
        rotate: 0,
        formatter: function (value) {
          var texts = value;
          if (texts.length > 10) {
            // 限制长度自设
            texts = texts.substr(0, 10) + '...';
          }
          return texts;
        },
      },
    },
    yAxis: {},
    series: {
      type: 'bar',
      encode: { x: 'title', y: 'count' },
      datasetIndex: 1,
    },
  };
  myChart.setOption(option);
};

async function getData() {
  await getFlow();
  await getArticleFlow();
  await getOrderFlow();
  init_one();
  init_two();
  init_three();
}

getData();
</script>

<template>
  <div style="display: flex">
    <div class="box1">
      <div ref="view_one" style="width: 100%; height: 450px"></div>
    </div>
    <div class="box2">
      <div ref="view_two" style="width: 100%; height: 450px"></div>
    </div>
  </div>

  <div class="box3">
    <div ref="view_three" style="width: 100%; height: 350px"></div>
  </div>
</template>

<style scoped>
.box1 {
  background-color: #fff;
  width: 1100px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.2);
}
.box2 {
  width: 450px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  margin-left: 30px;
}
.box3 {
  width: 1600px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  display: inline-block;
  height: 300px;
  margin-top: 30px;
}
</style>
