<div id="content"></div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
<script>
  const app = new Vue({
    data: () => ({ File: []}),
    template: `
    <div style="border-style:solid;" @dragover.prevent @drop.prevent>
      <input type="file" multiple @change="uploadFile"/>
      <div @drop="dragFile" style="background-color:green;margin-bottom:10px;padding:10px;">
        Or drag the file here
        <div v-if="File.length">
          <ul v-for="file in File" :key="file">
            <li>{{file.name}}</li>
          </ul>
        </div>
      </div>
    </div>
    `,
    methods: {
      uploadFile(e) {
        this.File = e.target.files;
      },
      dragFile(e) {
        this.File = e.dataTransfer.files;
      }
  }
  });
  app.$mount("#content");
</script>