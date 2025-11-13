<template>
  <NuxtLayout name="dashboard">
    <div>
      <h1>Финансы</h1>

      <a-space style="margin-bottom: 16px;">
        <a-select
          v-model:value="selectedMonth"
          placeholder="Выберите месяц"
          style="width: 150px;"
          @change="handleFilterChange"
          allow-clear
        >
          <a-select-option v-for="month in months" :key="month.value" :value="month.value">
            {{ month.label }}
          </a-select-option>
        </a-select>

        <a-select
          v-model:value="selectedYear"
          placeholder="Выберите год"
          style="width: 120px;"
          @change="handleFilterChange"
          allow-clear
        >
          <a-select-option v-for="year in years" :key="year" :value="year">
            {{ year }}
          </a-select-option>
        </a-select>
      </a-space>

      <StatisticsCards :statistics="transactionStore.statistics" />

      <a-row :gutter="16" style="margin-top: 16px;">
        <a-col :span="24">
          <ExpenseChart :transactions="transactionStore.transactions" />
        </a-col>
      </a-row>

      <a-row :gutter="16" style="margin-top: 16px;">
        <a-col :span="24">
          <TransactionList
            :transactions="transactionStore.transactions"
            :categories="categoryStore.categories"
            :loading="transactionStore.loading"
            @create="handleCreateTransaction"
            @update="handleUpdateTransaction"
            @delete="handleDeleteTransaction"
          />
        </a-col>
      </a-row>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useTransactionStore } from '../../entities/transaction';
import { useCategoryStore } from '../../entities/category';
import { StatisticsCards, TransactionList, ExpenseChart } from '../../widgets';
import type { CreateTransactionDto, UpdateTransactionDto } from '../../entities/transaction';
import { message } from '../../shared/lib';

const transactionStore = useTransactionStore();
const categoryStore = useCategoryStore();

const selectedMonth = ref<number | undefined>(new Date().getMonth() + 1);
const selectedYear = ref<number | undefined>(new Date().getFullYear());

const years = computed(() => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 5 }, (_, i) => currentYear - i);
});

const months = [
  { value: 1, label: 'Январь' },
  { value: 2, label: 'Февраль' },
  { value: 3, label: 'Март' },
  { value: 4, label: 'Апрель' },
  { value: 5, label: 'Май' },
  { value: 6, label: 'Июнь' },
  { value: 7, label: 'Июль' },
  { value: 8, label: 'Август' },
  { value: 9, label: 'Сентябрь' },
  { value: 10, label: 'Октябрь' },
  { value: 11, label: 'Ноябрь' },
  { value: 12, label: 'Декабрь' },
];

const fetchData = async () => {
  await Promise.all([
    transactionStore.fetchTransactions(undefined, selectedMonth.value, selectedYear.value),
    transactionStore.fetchStatistics(selectedMonth.value, selectedYear.value),
  ]);
};

const handleFilterChange = () => {
  fetchData();
};

const handleCreateTransaction = async (data: CreateTransactionDto) => {
  try {
    await transactionStore.createTransaction(data);
    message.success('Транзакция создана');
  } catch (error: any) {
    message.error(error || 'Ошибка создания транзакции');
  }
};

const handleUpdateTransaction = async (id: number, data: UpdateTransactionDto) => {
  try {
    await transactionStore.updateTransaction(id, data);
    message.success('Транзакция обновлена');
  } catch (error: any) {
    message.error(error || 'Ошибка обновления транзакции');
  }
};

const handleDeleteTransaction = async (id: number) => {
  try {
    await transactionStore.deleteTransaction(id);
    message.success('Транзакция удалена');
  } catch (error: any) {
    message.error(error || 'Ошибка удаления транзакции');
  }
};

onMounted(async () => {
  await categoryStore.fetchCategories();
  await fetchData();
});
</script>
