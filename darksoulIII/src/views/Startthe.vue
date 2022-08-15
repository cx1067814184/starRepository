<template>
  <div class="container">
    <div class="left shadow">
      <div id="drawChart" />
    </div>
    <div class="right shadow">
      <div class="dashboard">
        <div class="w-full">
          <el-tag class="tag" :hit="true">{{ this.Name }}</el-tag>
        </div>
        <marquee
          behavior="scroll"
          direction="right"
          scrollamount="10"
          width="100%"
        >
          {{ this.Description }}
        </marquee>
        <el-image class="img" :src="url" />
        <div class="ops">
          <el-button round type="primary" class="under" @click="startServer">
            启动服务器
          </el-button>
          <el-button
            round
            type="primary"
            plain
            @click="$router.push({ name: 'Select' })"
          >
            服务器选择
            <i class="el-icon-upload el-icon--right" />
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import request from "../utils/request";
export default {
  name: "Startthe",
  components: {},
  data() {
    return {
      titledata: "个地图玩家分布情况",
      seriesname: ["友好灵体", "火主", "暗灵"],
      xdata: ["亚诺尔隆德", "冷冽谷", "磔罚森林", "洛斯里克的高墙"],
      // ydata: []
      ydata: [5, 20, 36, 10],
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      data: {
        id: 1,
        pwd: "11345",
      },
      Name: "服务器名称",
      Description: "服务器Description滚动条",
      ServerInfo: {
        gameExePath: "",
        hostName: "",
        hostPublicKey: "",
      },
    };
  },
  mounted() {
    this.drawChart();
    this.getPublicKey();
  },
  methods: {
    getDS3Path() {
      request.get("http://localhost:5000/api/loader/game-path").then((res) => {
        console.log(res);
        if (res.succeeded) {
          this.ServerInfo.gameExePath = res.data;
        } else {
          this.$message({
            type: "error",
            message: res.errors,
          });
        }
      });
    },
    getPublicKey() {
      if (localStorage.getItem("servers")) {
        this.Name = JSON.stringify(
          JSON.parse(localStorage.getItem("servers")).Name
        );
        this.Description = JSON.stringify(
          JSON.parse(localStorage.getItem("servers")).Description
        );
      }
      request
        .post("http://dev.ymchangge.cn/sid/api/v1/servers/detail", this.data)
        .then((res) => {
          console.log(res);
          this.ServerInfo.hostPublicKey = res.data.PublicKey;
          this.ServerInfo.hostName = res.data.Hostname;
        });
    },
    startServer() {
      this.getDS3Path();
      request
        .post("http://localhost:5000/api/loader/launch-game", this.ServerInfo)
        .then((res) => {
          console.log(res);
        });
    },
    drawChart() {
      if (this.ydata == []) {
        echarts.init(document.getElementById("drawChart")).dispose(); //无数据则清空图表内容
      } else {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById("drawChart"));
        // 绘制图表
        myChart.setOption({
          legend: {
            // Try 'horizontal'
            orient: "vertical",
            icon: "rect",
            top: 5,
            right: 2,
          },
          title: {
            text: this.titledata,
          },
          // 不清楚，但是删掉的话，hover不能显示信息
          tooltip: {},
          // x 轴信息
          xAxis: {
            data: this.xdata,
          },
          // y轴信息
          yAxis: {},
          // hover 时激活的信息
          series: [
            {
              name: this.seriesname[0],
              // 设置柱状图的方式，是将 series 的 type 设为 'bar'
              type: "bar",
              data: this.ydata,
            },
            {
              name: this.seriesname[1],
              type: "bar",
              data: this.ydata,
            },
            {
              name: this.seriesname[2],
              type: "bar",
              data: this.ydata,
            },
          ],
        });
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
}

.left {
  /* margin-top: 30px;
  margin-left: 7%;
  float: left; */
  padding: 10px;
  border: 1.5px solid #dcdfe6;
  border-radius: 10px;
}

.left #drawChart {
  width: 600px;
  height: 500px;
}

.right {
  /* margin-right: 7%;
  margin-top: 30px;
  float: right; */
  border: 1.5px solid #dcdfe6;
  border-radius: 10px;
  padding: 10px;
  height: 500px;
  width: 400px;
  overflow: hidden;
}

.right .dashboard {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

.dashboard .ops {
  margin-top: 20px;
}

.w-full {
  width: 100%;
}

.img {
  margin: 100px;
  width: 100px;
  height: 100px;
}

.tag {
  margin: 20px;
  width: 300px;
}
.el-button--primary.is-plain {
  margin-top: 10px;
}

.shadow {
  --tw-shadow: 0 20px 25px -5px rgb(0 0 0/0.1), 0 8px 10px -6px rgb(0 0 0/0.1);
  --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color),
    0 8px 10px -6px var(--tw-shadow-color);
  -webkit-box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
</style>
