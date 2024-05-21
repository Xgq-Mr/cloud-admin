
import { changeStatusApi, delGoodsApi, getGoodsListApi } from '@/api/goods/goodslist';
import type { ListParamsType, Record } from '@/types/goodsList';
import { ref, defineAsyncComponent } from "vue"
import { ElMessage, ElNotification } from 'element-plus';


export const useGoodsList = () => {
    // 列表数据
    const queryData = ref<ListParamsType>({ "keyword": "", "status": "", "current": 1, "size": 20 })
    const tableData = ref<Record[]>()
    const total = ref<number>(0)
    // 初始化列表
    const initGoodsList = async () => {
        try {
            const res = await getGoodsListApi(queryData.value)
            tableData.value = res.data.records
            total.value = res.data.total
            queryData.value.keyword = ""
            queryData.value.status = ""
            ElMessage.success("获取成功！")
        } catch (error) {
            console.log(error);
        }
    }
    initGoodsList()
    // 分页
    const handleSizeChange = (val: number) => {
        queryData.value.size = val
        initGoodsList()

    }
    const handleCurrentChange = (val: number) => {
        queryData.value.current = val
        initGoodsList()
    }
    // 删除
    const handleDelete = async (id: number) => {
        try {
            await delGoodsApi(id)
            ElNotification({
                title: '删除成功',
                type: 'success',
            })
        } catch (error) {
            console.log(error);
        }
    }
    // 修改状态
    const changeStatus = (row: Record) => {
        try {
            changeStatusApi({ ...row })
            ElNotification({
                title: '状态更新成功',
                type: 'success',
            })
        } catch (error) {
            console.log(error);

        }
    }
    // 异步引入新增弹窗组件
    const ListDialog = defineAsyncComponent(() => import("@/views/goods/list/components/listDialog.vue"))
    // 实例化组件
    const listDialogRef = ref<InstanceType<typeof ListDialog>>()
    
    // 添加商品
    const handleAdd = () => {
        listDialogRef.value?.openDrawer("添加商品信息", "add")
    }
    // 编辑商品
    const handleEdit = (row: any) => {
        listDialogRef.value?.openDrawer("编辑商品信息", "edit", row)
    }
    return {
        queryData, tableData, total, initGoodsList, handleSizeChange, handleCurrentChange, handleDelete, changeStatus,
        handleAdd,handleEdit,listDialogRef,ListDialog
    }
}