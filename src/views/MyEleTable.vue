<template>
  <eleTable :table="table" :button="button" :page="pageInfo"> </eleTable>
</template>

<script>
import EleTable from '../components/element/Table';
export default {
  name: 'myEleTable',
  components: {
    [EleTable.name]: EleTable
  },
  data() {
    return {
      pageInfo: {
        getData: this.getData,
        layout: 'prev, pager, next'
      },
      button: {
        dir: 'left',
        list: [
          {
            name: 'add',
            func: this.add,
            icon: 'el-icon-thumb'
          },
          {
            name: 'delete',
            func: this.delete
          }
        ]
      },
      table: {
        colList: [
          {
            prop: 'name',
            label: '名称'
          },
          {
            prop: 'date',
            label: '日期'
          }
        ],
        operation: [
          {
            name: '修改',
            func: this.test
            // show: this.show
          },
          {
            name: '删除',
            func: this.test
            // show: this.show
          },
          {
            name: '删除',
            func: this.test
            // show: this.show
          },
          {
            name: '删除',
            func: this.test
            // show: this.show
          },
          {
            name: '删除',
            func: this.test
            // show: this.show
          },
          {
            name: '删除',
            func: this.test
            // show: this.show
          },
          {
            name: '删除',
            func: this.test
            // show: this.show
          },
          {
            name: '删除',
            func: this.test
            // show: this.show
          },
          {
            name: '删除',
            func: this.test
            // show: this.show
          }
        ]
      }
    };
  },
  methods: {
    getData() {
      let data = [
        {
          name: '名',
          date: '日'
        },
        {
          name: '姓',
          date: '期'
        }
      ];
      return { page: 1, size: 10, total: 0, data: data };
    },
    add() {
      console.log(this.pageInfo);
    },
    delete() {
      console.table(this.pageInfo);
    },
    test(row) {
      console.log(row);
    },
    show() {
      return false;
    }
  }
};
</script>
