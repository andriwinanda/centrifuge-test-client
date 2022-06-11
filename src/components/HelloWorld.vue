<template>
  <div class="hello">
    <h1>Test Centrifuge</h1>
    <el-row :gutter="10">
      <el-col :span="10" :offset="2">
        <el-card shadow="always">
          <div>
            <h3>URL</h3>
            <!-- <el-date-picker v-model="value2" type="datetime" placeholder="Select date and time" :shortcuts="shortcuts" /> -->
            <el-input v-model="form.url" placeholder="Example: ws://100.24.42.115:8080/connection/websocket" />
            <h3>TOKEN</h3>
            <el-input v-model="form.token" placeholder="Please input token" />
          </div>
          <br>
          <div>
            <el-button v-if="!centrifuge" type="primary" @click.prevent="connectCentrifuge()">Connect</el-button>
            <el-button v-else type="danger" @click.prevent="disconnectCentrifuge()">Disconnect</el-button>
          </div>
        </el-card>
      </el-col>

      <el-col :span="10">
        <el-card shadow="always">
          <div>
            <h3>Subscribe</h3>
            <el-input v-model="form.channel" placeholder="Please input token" />
          </div>
          <br>
          <div>
            <el-button type="primary" @click.prevent="subscribeChannel()">Subscribe</el-button>

          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import 'element-plus/dist/index.css'
import { ElButton, ElInput, ElForm, ElFormItem, ElRow, ElCol, ElMessage, ElCard } from 'element-plus'
import { initCentrifuge, subscribe } from '@/centrifugeHelper'

export default {
  name: 'HelloWorld',
  components: { ElButton, ElInput, ElForm, ElFormItem, ElRow, ElCol, ElCard },
  props: {
    msg: String
  },
  data() {
    return {
      centrifuge: null,
      form: {
        url: 'ws://100.24.42.115:8080/connection/websocket',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTU0NDUxMzR9.-M_9K_GJPwepNkH8E9kINaQBfncbP2jbWhq5bH7BjnE',
        channel: 'test'
      }
    }
  },
  methods: {
    connectCentrifuge() {
      this.centrifuge = initCentrifuge(this.form.url, this.form.token)
      this.centrifuge.on('connect', (context) => {
        ElMessage.success('Congrats, connected to server')
        console.log(context)
      })

      this.centrifuge.on('disconnect', (context) => {
        ElMessage.error('Ops, disconnected from server')
        console.log('disconnect', context)
      })

      this.centrifuge.on('publish', (message) => {
        ElMessage('New Message!! Check log for details')
        console.log(message)
      })

      this.centrifuge.on('error', (message) => {
        ElMessage.error(`Error, ${message.message}`)
        console.log(message)
      })
    },
    disconnectCentrifuge() {
      this.centrifuge.disconnect()
      this.centrifuge = null

    },
    subscribeChannel() {
      if (this.centrifuge && this.form.channel) {
        subscribe(this.form.channel)
      } else {
        ElMessage.error('Connect to centrifuge first')
      }
    }
  }
}
</script>
