<!-- 关于table内容再次封装的问题 -->
<!-- 将html的复制，改为对数据的配置 -->
<!-- 在实际使用的过程中，直接修改html带来的负担相对修改存在数据库中的更为麻烦 -->
<!-- 但是从逻辑上来说修改html页面内容更为简单，但是从维护灵活性的角度上来说更差 -->
<template>
  <div>
    <div class="Table__Button" v-if="$slots.button || button">
      <slot name="button">
        <div :style="{ float: ['left', 'right'].includes(button.dir) ? button.dir : 'left' }">
          <!-- 预设两个按键 add,delete -->
          <template v-for="(item, index) in button.list">
            <el-button
              id="Table__Button__add"
              v-if="item.name === 'add'"
              :key="index"
              @click="typeof item.func === 'function' ? item.func() : ''"
              :icon="typeof item.icon === 'string' ? item.icon : 'el-icon-plus'"
            >
              新增
            </el-button>
            <el-button
              id="Table__Button__delete"
              v-else-if="item.name === 'delete'"
              :key="index"
              @click="typeof item.func === 'function' ? item.func() : ''"
              :icon="typeof item.icon === 'string' ? item.icon : 'el-icon-delete'"
            >
              删除
            </el-button>
          </template>
          <!-- 可以通过传入list的方式生成button，但是样式的问题，不如直接使用 <slot> -->
          <!-- <el-button
            v-for="(item, index) in button.list"
            :key="index"
            icon="item.icon ? item.icon : ''"
            @click="item.func === 'function' ? item.func() : item.func ? item.func : ''"
          >
            {{ item.name }}
          </el-button> -->
        </div>
      </slot>
    </div>
    <div class="Table__body">
      <el-table :data="data" style="width:100%;">
        <el-table-column
          v-for="(item, index) in table.colList"
          :label="item.label"
          :prop="item.prop"
          :key="index"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          v-if="$slots.operation || (table.operation && table.operation.length > 0)"
        >
          <template v-slot="scope">
            <slot name="operation">
              <div
                style="margin-right:15px;display:inline-block;"
                v-for="(item, index) in table.operation"
                :key="index"
              >
                <span
                  v-show="typeof item.show === 'function' ? item.show(scope.row) : 1"
                  @click="typeof item.func === 'function' ? item.func(scope.row) : ''"
                  class="Table__body__operation"
                >
                  {{ item.name }}
                </span>
              </div>
            </slot>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="Table__footer" v-if="page && typeof page.getData === 'function'">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchInfo.page"
        :page-sizes="page.pageSizes ? page.pageSizes : [10, 20, 30, 40]"
        :page-size="searchInfo.size"
        :layout="page.layout ? page.layout : 'total, sizes, prev, pager, next, jumper'"
        :total="searchInfo.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { Table, TableColumn, Button, Pagination } from 'element-ui';
export default {
  name: 'eleTable',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Button.name]: Button,
    [Pagination.name]: Pagination
  },
  props: {
    button: {
      dir: String, // 按键对齐方向 left(默认) right
      list:
        Array[
          {
            name: String, // 按键名称
            func: [Function, String], // 按键事件
            icon: String // 按键图标
          }
        ]
    },
    table: {
      colList: {
        type:
          Array[
            {
              label: String, // 列名称
              prop: String // 对应列内容的字段名
            }
          ],
        required: true
      },
      operation:
        Array[
          {
            name: String, //按键名称,
            func: Function, //事件
            show: Function //按键显示条件
          }
        ]
    },
    page: {
      pageSizes: Array[Number], // 默认【10,20,30,40】,pageSizes和searchInfo.size相对应
      getData: Function // 提供获取数据和页脚信息的方法，当表格需要进行获取信息时，调用
    }
  },
  data() {
    return {
      searchInfo: {
        page: 1,
        size: 10,
        total: 0
      },
      data: []
    };
  },
  created() {
    if (!this.page && (!this.page.getData || typeof this.page.getData !== 'function')) {
      console.error('当开启 page 时，获取数据方法不能为空。');
    } else {
      this.getPageData();
    }
  },
  methods: {
    async getPageData() {
      let { page, size, total, data } = await this.page.getData();
      this.searchInfo.page = page || 1;
      this.searchInfo.size = size || 10;
      this.searchInfo.total = total || 0;
      this.data = data || [];
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.searchInfo.limit = val;
      this.page.getData(this.searchInfo);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val} `);
      this.searchInfo.page = val;
      this.page.getData(this.searchInfo);
    }
  }
};
</script>

<style>
.Table__footer {
  margin: 10px;
  text-align: center;
}
.Table__body {
  margin: 20px;
}
.Table__Button {
  margin: 20px;
}
.Table__body__operation {
  cursor: pointer;
}
.Table__body__operation:hover {
  color: #33aaff;
}
</style>
