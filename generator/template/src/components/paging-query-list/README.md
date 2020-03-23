## 分页列表组件

### 基本用法

```html
<paging-query-list>
  <template #queries>
    <!-- todo -->
  </template>
  <template v-slot="{ data }">
    <!-- todo -->
  </template>
</paging-query-list>
```

### Attributes

| 参数                |                            说明                             |     类型 | 可选 | 默认值 |
| ------------------- | :---------------------------------------------------------: | -------: | ---: | -----: |
| count               |                          每页个数                           |   Number |    - |     10 |
| queryParams         | 请求参数，传入后会与 count、page 一起 assign 后传入请求方法 |   Object |    - |      - |
| fetchMethod         |         自定义列表请求方法，需返回对象{data, total}         | Function |    - |      - |
| afterMountedRequest |               是否在 mouted 后自动发一次请求                |  Boolean |    - |  false |

### Methods

| 方法名  |       说明       |   参数 |
| ------- | :--------------: | -----: |
| request | 发起列表内容请求 | params |
| reset   |   重置列表内容   |      - |

### Slots

| name    |                 说明                  |
| ------- | :-----------------------------------: |
| -       | 列表 slot，传入 scope 为列表数据 data |
| queries |             表单查询 slot             |
