<template>
    <div class="date-picker-wrapper">
      <el-date-picker v-model="value2" type="daterange" unlink-panels range-separator=" " :shortcuts="shortcuts"
      :clearable="false" :disabledDate="disabledDate" :style="style" @change='handleChange' />
      <button @click="goOneDayBackward" class="btn-date-picker"><el-icon>
          <Back />
        </el-icon></button>
      <button @click="goOneDayForward" class="btn-date-picker" :disabled="isNextDayButtonDisabled"><el-icon>
          <Right />
        </el-icon></button>
    </div>
</template>
  
<script>
import {
  format,
  subWeeks,
  subMonths,
  subDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isToday,
  startOfDay,
  endOfDay,
  isAfter,
  addDays
} from 'date-fns';

import { Back, Right } from '@element-plus/icons-vue';


export default {
  emits: ['changeFromToDetails'],
  components: { Back, Right },
  data() {
    const today = new Date();

    return {
      style: {
        height: '30px',
        color: 'black',
        display: 'flex',
        alignItems: 'center',
        fontSize: '11px',
        width: '210px',
        padding: '3px 3px 3px 7px',
        whiteSpace: 'pre',
        cursor: 'pointer',
      },
      size: 'default',
      value2: [format(startOfDay(today), "yyyy-MM-dd'T'HH:mm:ss"),
      format(today, "yyyy-MM-dd'T'HH:mm:ss"),],
      todayFormatted: format(today, "yyyy-MM-dd'T'HH:mm:ss"),
      updatingInternal: false,
      shortcuts: [
        {
          text: 'Today',
          value: () => [startOfDay(today), endOfDay(today)],
        },
        {
          text: 'Yesterday',
          value: () => {
            const yesterday = subDays(today, 1);
            return [startOfDay(yesterday), endOfDay(yesterday)];
          },
        },
        {
          text: 'This Week',
          value: () => {
            const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 });
            const endOfThisWeek = endOfDay(today);
            return [startOfThisWeek, endOfThisWeek];
          },
        },
        {
          text: 'Last Week',
          value: () => {
            const startOfLastWeek = startOfWeek(subWeeks(today, 1), { weekStartsOn: 1 });
            const endOfLastWeek = endOfWeek(subWeeks(today, 1), { weekStartsOn: 1 });
            return [startOfLastWeek, endOfLastWeek];
          },
        },
        {
          text: 'This Month',
          value: () => {
            const startOfThisMonth = startOfMonth(today);
            const endOfThisMonth = endOfDay(today);
            return [startOfThisMonth, endOfThisMonth];
          },
        },
        {
          text: 'Last Month',
          value: () => {
            const startOfLastMonth = startOfMonth(subMonths(today, 1));
            const endOfLastMonth = endOfMonth(subMonths(today, 1));
            return [startOfLastMonth, endOfLastMonth];
          },
        },
      ],
    };
  },
  computed: {
    formattedValue() {
      const [startDate, endDate] = this.value2;
      const includesToday = isToday(new Date(endDate));
      if (includesToday) {
        return [
          format(startDate, "yyyy-MM-dd'T'00:00:00"),
          format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
        ];
      } else {
        return [
          format(startDate, "yyyy-MM-dd'T'00:00:00"),
          format(endDate, "yyyy-MM-dd'T'23:59:59"),
        ];
      }
    },
    isNextDayButtonDisabled() {
      const tomorrow = addDays(new Date(this.value2[1]), 0);
      return isToday(tomorrow);
    },
  },
  watch: {
    formattedValue(newFormattedValue) {
      if (!this.updatingInternal) {
        this.updatingInternal = true;
        this.value2 = [
          format(newFormattedValue[0], "yyyy-MM-dd'T'HH:mm:ss"),
          format(newFormattedValue[1], "yyyy-MM-dd'T'HH:mm:ss"),
        ];
        this.updatingInternal = false;
      }
    },
  },
  methods: {
    disabledDate(date) {
      const today = new Date();
      return isAfter(date, today);
    },
    handleChange() {
      this.$emit('changeFromToDetails', this.formattedValue)
    },
    goOneDayBackward() {
      this.value2 = [
        format(subDays(new Date(this.value2[0]), 1), "yyyy-MM-dd'T'HH:mm:ss"),
        format(subDays(new Date(this.value2[1]), 1), "yyyy-MM-dd'T'HH:mm:ss"),
      ];
      this.handleChange()
    },
    goOneDayForward() {
      this.value2 = [
        format(addDays(new Date(this.value2[0]), 1), "yyyy-MM-dd'T'HH:mm:ss"),
        format(addDays(new Date(this.value2[1]), 1), "yyyy-MM-dd'T'HH:mm:ss"),
      ];
      this.handleChange()
    },
  },
};
</script>
  
<style scoped>
.date-picker-label {
  color: rgb(137, 137, 138);
  font-size: 14px;
  font-weight: normal;
  margin-bottom: 5px;
}

.date-picker-wrapper {
  display: flex;
  align-items: center;
  margin-top:2px;
}

.btn-date-picker {
  line-height: 14px;
  border: 1px solid rgb(201, 201, 201);
  padding: 10px 3px;
  margin-left: 10px;
  cursor: pointer;
  height: 30px;
  background-color: white;
  display: flex;
  align-items: center;
}

</style>
  