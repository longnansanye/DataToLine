<el-input type='text' readonly v-model='uploadFileName' value='uploadFileName' placeholder='请选择需要导入的文件！'>
</el-input>
</el-from-item>
<el-upload class='uploadStyle' 
  ref='fileImport' 
  :file-list='files'
  :http-request='httpRequest'
  :limit='1' // upload one file limit 
  :on-change='onchange'
  :accept='file'>
  <el-button size='small' type='primary' slot='trigger' @click='submitUpload'></el-button>
  <dev slot='tip' class='el-upload_tip'>请上传文件名后缀为.xls或.xlsx</dev>
</el-upload>>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'upload no file!'
    };
  },
  onchange(file, fileList) {
      const event = window.event;
      this.files = fileList.slice(-1); // slice(-1):get one end item from array
      if (event.target.files) {
          this.uploadFileName = event.target.files[0].name;
      }
  },
  httpRequest(file) {
      let formData = new FormData();
      formData.append('file', file.file);
      let config = {
        headers: {
          'Content-Type': 'multipart/from-data'
        }
      }
      axios.post('url', formData, config);
  },
  submitUpload() {
      setTimeOut(() => {
        this.$refs.fileImport.submit();
        this.uploadFileName='';},1000);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
