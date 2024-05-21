<script setup lang="ts">
import { addGoodsApi, selectGoodsApi,editGoodsApi } from "@/api/goods/goodslist";
import { upLoadApi } from "@/api/upload";
import type { AddGoodsParamsType, Datum3, SelectGoodsType, } from "@/types/goodsList";
import { ElMessage, ElNotification, type FormInstance, type UploadRequestOptions } from "element-plus";
// 富文本需要的
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { onBeforeUnmount, ref, reactive, shallowRef, onMounted, nextTick } from 'vue'
// 深拷贝
import _ from "lodash"
// 弹框数据
const visible = ref<boolean>(false);
const dialogTitle = ref<string>("");
const dialogType = ref<string>("");
// 表单数据
const formDataRef = ref<FormInstance>()
const formData = ref<AddGoodsParamsType>({
  address: "", // 商品产地
  brand: "", // 品牌名称
  code: null, //  商品编码
  cost: null, // 成本价格
  discountPrice: null, // 商品特价
  goodsDetail: "", // 富文本描述
  id: 0,
  imageUrl: "", // 商品主图
  name: "", // 商品名称
  price: null, // 销售价格
  quickCode: "", // 商品简码
  remark: "", // 描述信息
  score: null, // 获得积分
  sort: 0, // 排序号
  specsName: "", //商品规格
  status: 1, // 商品状态
  stockNum: null, // 库存数量
  unitName: "", // 商品单位
  categoryId: null, // 商品分类
});
// 表单校验
const rules = reactive({
  name: [{ required: true, message: "商品名称为必填项", trigger: "blur" }],
  code: [{ required: true, message: "商品编码为必填项", trigger: "blur" }],
  stockNum: [{ required: true, message: "库存数量为必填项", trigger: "blur" }],
  price: [{ required: true, message: "销售价格为必填项", trigger: "blur" }],
  categoryId: [{ required: true, message: "商品分类为必填项", trigger: "blur" }],
})
// 关闭回调
const handleClose = () => {
  formDataRef.value?.resetFields()
  visible.value = false;
};
const emits = defineEmits(["refresh"])
// 保存数据
const handleSubmit = () => {
  try {
    formDataRef.value?.validate(async (valid: boolean) => {
      if (valid) {
        if (dialogType.value === "add") {
          const res = await addGoodsApi(formData.value)
          console.log(res);
        } else {
          await editGoodsApi(formData.value)
        }
        ElNotification({
          title: '操作成功',
          type: 'success',
        })
        visible.value = false
        emits("refresh")
      }
    })

  } catch (error) {
    console.log(error);

  }
}
// 打开弹框
const openDrawer = (title: string, type: string, data = {} as any) => {
  dialogTitle.value = title;
  dialogType.value = type;
  formData.value.imageUrl = ""
  formData.value.goodsDetail = ""
  getSelectGoods()
  if (type === "edit") {
    nextTick(() => {
      formData.value = _.cloneDeep(data)
    })
  }
  visible.value = true;

};
// 获取级联数据
const options = ref<SelectGoodsType>()
const getSelectGoods = async () => {
  try {
    const res = await selectGoodsApi()
    options.value = res.data
  } catch (error) {
    console.log(error);

  }
}
// 上传图片
const handleUpload = async (options: UploadRequestOptions) => {
  try {
    console.log(options);
    // 获取选择的文件
    const file = options.file

    // 判断文件大小
    if (file.size > 1 * 1024 * 1024) {
      ElMessage.error("文件大小不能超过1M")
      return
    }
    // 判断文件类型
    const fileType = file.type
    const whiteList = ["image/jpeg", "image/png", "image/gif"]
    if (!whiteList.includes(fileType)) {
      ElMessage.error("文件类型不正确")
      return
    }

    // 实例formData对象
    const fileData = new FormData()
    fileData.append("file", file)
    fileData.append("data", JSON.stringify({ sourceType: "goods_img" }))

    // 调用接口
    const res = await upLoadApi(fileData)
    formData.value.imageUrl = res.data
  } catch (error) {
    console.log(error);

  }
}
// 富文本逻辑
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
// 内容 HTML
const valueHtml = ref('<p>hello</p>')
// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
  }, 1500)
})
const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
// 暴漏给父组件
defineExpose({
  openDrawer,
});


</script>
<template>
  <el-drawer v-model="visible" size="800" :title="dialogTitle" direction="rtl" :before-close="handleClose">
    <!-- 表单数据 -->
    <el-form ref="formDataRef" :rules="rules" :model="formData" label-width="90" :inline="true">
      <el-form-item label="商品名称:" prop="name">
        <el-input v-model="formData.name" maxlength="30" show-word-limit placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品分类:" prop="categoryId">
        <el-select v-model="formData.categoryId" placeholder="请选择商品分类" style="width: 100%">
          <el-option v-for="item in options" :key="item.categoryId" :label="item.categoryName"
            :value="item.categoryId" />
        </el-select>
      </el-form-item>
      <el-form-item label="商品编码:" prop="code">
        <el-input v-model="formData.code" placeholder="请输入(支持条码枪)"></el-input>
      </el-form-item>
      <el-form-item label="商品规格:" prop="specsName">
        <el-input v-model="formData.specsName" maxlength="20" show-word-limit placeholder="请输入商品规格"></el-input>
      </el-form-item>
      <el-form-item label="库存数量:" prop="stockNum">
        <el-input-number style="width:100%" v-model="formData.stockNum" placeholder="请输入库存数量" :min="1" :max="100000" />
      </el-form-item>
      <el-form-item label="商品单位:" prop="unitName">
        <el-input v-model="formData.unitName" placeholder="请输入商品单位"></el-input>
      </el-form-item>
      <el-form-item label="销售价格:" prop="price">
        <el-input-number style="width:100%" v-model="formData.price" placeholder="0.00" :min="1" :max="100000" />
      </el-form-item>
      <el-form-item label="商品特价:" prop="discountPrice">
        <el-input-number style="width:100%" v-model="formData.discountPrice" placeholder="0.00" :min="1"
          :max="100000" />
      </el-form-item>
      <el-form-item label="成本价格:" prop="cost">
        <el-input-number style="width:100%" v-model="formData.cost" placeholder="0.00" :min="1" :max="100000" />
      </el-form-item>
      <el-form-item label="获得积分:" prop="score">
        <el-input-number style="width:100%" v-model="formData.score" placeholder="请输入获取积分" :min="1" :max="100000" />
      </el-form-item>
      <el-form-item label="商品状态:" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :value="1" border>上架</el-radio>
          <el-radio :value="0" border>下架</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="品牌名称:" prop="brand">
        <el-input v-model="formData.brand" maxlength="30" show-word-limit placeholder="请输入品牌名称"></el-input>
      </el-form-item>
      <el-form-item label="商品简码:" prop="quickCode">
        <el-input v-model="formData.quickCode" maxlength="30" show-word-limit placeholder="请输入,方便快速搜索商品"></el-input>
      </el-form-item>
      <el-form-item label="商品产地:" prop="address">
        <el-input v-model="formData.address" maxlength="100" show-word-limit placeholder="商品产地最多输入100个字"></el-input>
      </el-form-item>
      <el-form-item label="排序号:" prop="sort">
        <el-input-number style="width:100%" v-model="formData.sort" placeholder="0.00" :min="1" :max="100000" />
      </el-form-item>
      <el-form-item label="备注信息:" prop="remark">
        <el-input v-model="formData.remark" maxlength="100" show-word-limit placeholder="备注信息最多输入100个字"></el-input>
      </el-form-item>
      <el-row>
        <el-form-item style="width: 100%;" label="商品主图:">
          <el-upload class="avatar-uploader" action="" :http-request="handleUpload" :show-file-list="false"
            list-type="picture">
            <img v-if="formData.imageUrl" :src="formData.imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
            <template #tip>
              <div class="el-upload__tip" style="width: 100%;">
                上传图片大小不能超过1MB,格式为png/jpg的文件。
              </div>
            </template>
          </el-upload>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item style="width: 100%;" label="商品详情:">
          <!-- 富文本 -->
          <div style="border: 1px solid #ccc">
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
              mode="default" />
            <Editor style="height: 500px; overflow-y: hidden;" v-model="formData.goodsDetail"
              :defaultConfig="editorConfig" mode="default" @onCreated="handleCreated" />
          </div>
        </el-form-item>
      </el-row>
    </el-form>
    <!-- 底部内容 -->
    <template #footer>
      <el-row justify="center">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </el-row>
    </template>
  </el-drawer>
</template>
<style lang="scss" scoped>
.el-form-item {
  width: 45%;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
