<template>
  <div id="wrapper" align="center">
    <div align="center">
      <el-input id="input01"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 10}"
        placeholder="请选择文件"
        v-model="textarea">
      </el-input>
    </div>

    <div align="center">
      <el-button type="primary" v-on:click="openFile()" round>选择文件</el-button>
      <el-button type="primary" v-on:click="showRealPath()" round>显示路径</el-button>
      <input type="file" name="filename" id="open" style="display:none" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea: ''
    }
  },
  methods: {
    openFile: function () {
      document.getElementById('open').click()
    },
    showRealPath: function () {
      document.getElementById('input01').value = document.getElementById('open').files[0].path
    }
  }
}
</script>
