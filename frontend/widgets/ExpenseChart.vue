<script setup lang="ts">
import { computed } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import type { Transaction } from '../entities/transaction';

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps<{
  transactions: Transaction[];
}>();

const expensesByCategory = computed(() => {
  const expenses = props.transactions.filter((t) => t.type === 'expense');
  const categoryMap = new Map<string, number>();

  expenses.forEach((t) => {
    const categoryName = t.category?.name || 'Без категории';
    const current = categoryMap.get(categoryName) || 0;
    categoryMap.set(categoryName, current + t.amount);
  });

  return Array.from(categoryMap.entries()).map(([name, amount]) => ({ name, amount }));
});

const chartData = computed(() => ({
  labels: expensesByCategory.value.map((item) => item.name),
  datasets: [
    {
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      data: expensesByCategory.value.map((item) => item.amount),
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
  },
};
</script>

<template>
  <a-card title="Расходы по категориям" style="height: 400px">
    <div v-if="expensesByCategory.length > 0" style="height: 300px">
      <Doughnut :data="chartData" :options="chartOptions" />
    </div>
    <a-empty v-else description="Нет данных" />
  </a-card>
</template>
