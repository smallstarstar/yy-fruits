<template>
  <div>
    <div class="block">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
        >
          {{activity.rTime}} {{activity.rName}}
          <div>{{activity.dec}}</div>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import FruitService from "@/common/fruit-service.js";
import getTimes from "@/common/getTime.js";
import rxevent from "pubsub-js";
import EventsKey from "@/common/eventsKey.js";
export default {
  data() {
    return {
      activities: []
    };
  },
  async mounted() {
    await this.getTimesheetInfo();
    rxevent.subscribe(EventsKey.refreshTimeSheet, async () => {
      await this.getTimesheetInfo();
    });
  },
  methods: {
    async getTimesheetInfo() {
      const result = await FruitService.getTimeSheet();
      this.activities = result.data;
      this.activities.forEach(e => {
        e.size = "large";
        e.type = "primary";
        e.icon = "el-icon-more";
        e.rTime = getTimes.timeTranfer(e.rTime);
      });
    }
  },
  destroyed() {
    rxevent.unsubscribe(EventsKey.refreshTimeSheet, true);
  }
};
</script>

<style scoped>
</style>
