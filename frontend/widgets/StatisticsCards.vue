<script setup lang="ts">
import type { Statistics } from '../entities/transaction';

defineProps<{
  statistics: Statistics | null;
}>();
</script>

<template>
  <a-row :gutter="16">
    <a-col :span="8">
      <a-card>
        <a-statistic
          title="Общий доход"
          :value="statistics?.totalIncome || 0"
          :precision="2"
          :value-style="{ color: '#3f8600' }"
          prefix="₽"
        />
      </a-card>
    </a-col>
    <a-col :span="8">
      <a-card>
        <a-statistic
          title="Общий расход"
          :value="statistics?.totalExpense || 0"
          :precision="2"
          :value-style="{ color: '#cf1322' }"
          prefix="₽"
        />
      </a-card>
    </a-col>
    <a-col :span="8">
      <a-card>
        <a-statistic
          title="Баланс"
          :value="statistics?.balance || 0"
          :precision="2"
          :value-style="{ color: (statistics?.balance || 0) >= 0 ? '#3f8600' : '#cf1322' }"
          prefix="₽"
        />
      </a-card>
    </a-col>
  </a-row>
</template>
