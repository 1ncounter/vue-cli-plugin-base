<template>
  <div class="paging-query-list" v-loading="loading">
    <div class="queries-container">
      <slot name="queries"></slot>
    </div>

    <template v-if="data && data.length > 0">
      <div class="list-container">
        <slot :data="data"></slot>
      </div>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          :current-page="page"
          :total="total"
          :page-size="count"
          @current-change="handlePaginationPageChange"
        ></el-pagination>
      </div>
    </template>
  </div>
</template>

<script>
import qs from 'query-string';

export default {
  name: 'PagingQueryList',
  props: {
    count: {
      type: Number,
      default: 10,
    },
    queryParams: {
      type: Object,
      default: () => ({}),
    },
    fetchMethod: Function,
    afterMountedRequest: Boolean,
    isSavingParams: Boolean,
  },
  data: () => ({
    data: [],
    total: 0,
    page: 1,
    loading: false,
    result: {
      status: 'nodata',
      title: null,
    },
    effectedParams: null,
  }),
  mounted() {
    if (this.afterMountedRequest) {
      if (this.isSavingParams) {
        const queryHash = location.hash.slice(1);
        const params = qs.parse(queryHash);

        if (typeof params.count === 'string') params.count = parseInt(params.count);
        if (typeof params.page === 'string') params.page = parseInt(params.page);

        if (Object.keys(params).length > 0) {
          this.fetchData(params, true);
        } else {
          this.request();
        }
      } else {
        this.request();
      }
    }
  },
  methods: {
    handlePaginationPageChange(page) {
      this.page = page;
      this.fetchData(this.effectedParams);
    },
    request(params = this.queryParams, isFullParams = false) {
      this.page = 1;
      this.fetchData(params, isFullParams);
    },
    reset(isFullParams = false) {
      this.page = 1;
      this.fetchData({}, isFullParams);
    },

    fetchData(params, isFullParams = false) {
      this.loading = true;

      if (!isFullParams) {
        params = Object.assign({}, params, { count: this.count, page: this.page });
      }

      const result = this.fetchMethod(params);

      Promise.resolve(result)
        .then(val => {
          this.effectedParams = params;

          this.data = val.data;
          this.total = val.total;
          this.result.status = val.data && val.data.length > 0 ? null : 'nodata';
          this.result.title = null;
        })
        .catch(() => {
          this.data = [];
          this.total = 0;
          this.result.status = 'failed';
          this.result.title = '请求失败';
        })
        .finally(() => (this.loading = false));
    },
  },
  watch: {
    effectedParams(val) {
      if (this.isSavingParams) location.hash = qs.stringify(val);
    },
  },
};
</script>

<style lang="scss">
.paging-query-list {
  width: 100%;

  .list-container,
  .pagination {
    margin-top: 20px;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
