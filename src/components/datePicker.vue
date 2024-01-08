<template>
    <div class="block">
      <el-date-picker
        v-model="value2"
        type="daterange"
        unlink-panels
        range-separator=" "
        :shortcuts="shortcuts"
        :size="size"
        :clearable="false"
        :disabledDate="disabledDate"
        :style="style"
      />
    </div>
    {{ value2 }}
    {{ formattedValue}}
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
    } from 'date-fns';
    
    export default {
    data() {
      const today = new Date();
    
      return {
        style: {
          width: '250px',
        },
        size: 'default',
        value2: [format(startOfDay(today), "yyyy-MM-dd'T'HH:mm:ss"),
        format( endOfDay(today), "yyyy-MM-dd'T'HH:mm:ss"),],
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
    
        // Check if the selected range includes today's date
        const includesToday = isToday(new Date(endDate));
    
        // Format based on different scenarios
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
    },
    };
    </script>
    
    <style scoped></style>
    