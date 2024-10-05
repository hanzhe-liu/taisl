<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
    >
      <el-table-column prop="KR" label="KR" sortable />
      <el-table-column prop="KR状态" label="KR状态" sortable />
      <el-table-column prop="KR负责人" label="KR负责人" sortable />
    </el-table>
  </div>
</template>
<script setup>
const tableData = [
  {
    id: 1,
    KR: "2016-05-02",
    KR状态: "wangxiaohu",
    KR负责人: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 2,
    KR: "2016-05-04",
    KR状态: "wangxiaohu",
    KR负责人: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 3,
    KR: "2016-05-01",
    KR状态: "wangxiaohu",
    KR负责人: "No. 189, Grove St, Los Angeles",
    children: [
      {
        id: 31,
        KR: "2016-05-01",
        KR状态: "wangxiaohu",
        KR负责人: "No. 189, Grove St, Los Angeles",
      },
      {
        id: 32,
        KR: "2016-05-01",
        KR状态: "wangxiaohu",
        KR负责人: "No. 189, Grove St, Los Angeles",
        children: [
          {
            id: 39,
            KR: "2016-0-01",
            KR状态: "wangxiaohu",
            KR负责人: "No. 189, Grove St, Los Angeles",
          },
          {
            id: 40,
            KR: "2016-0-01",
            KR状态: "wangxiaohu",
            KR负责人: "No. 189, Grove St, Los Angeles",
            children: [
              {
                id: 41,
                KR: "2016-0-01",
                KR状态: "wangxiaohu",
                KR负责人: "No. 189, Grove St, Los Angeles",
              },
              {
                id: 42,
                KR: "2016-0-01",
                KR状态: "wangxiaohu",
                KR负责人: "No. 189, Grove St, Los Angeles",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    KR: "2016-05-03",
    KR状态: "wangxiaohu",
    KR负责人: "No. 189, Grove St, Los Angeles",
  },
];
</script>
