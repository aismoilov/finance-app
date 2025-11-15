<script setup lang="ts">
import { ref } from 'vue';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons-vue';
import type {
  Transaction,
  CreateTransactionDto,
  UpdateTransactionDto,
} from '../entities/transaction';
import type { Category } from '../entities/category';
import { formatCurrency, formatDate } from '../shared/lib';

const props = defineProps<{
  transactions: Transaction[];
  categories: Category[];
  loading?: boolean;
}>();

const emit = defineEmits<{
  create: [data: CreateTransactionDto];
  update: [id: number, data: UpdateTransactionDto];
  delete: [id: number];
}>();

const columns = [
  { title: 'Дата', dataIndex: 'date', key: 'date' },
  { title: 'Описание', dataIndex: 'description', key: 'description' },
  { title: 'Категория', dataIndex: 'categoryName', key: 'categoryName' },
  { title: 'Сумма', dataIndex: 'amount', key: 'amount' },
  { title: 'Тип', dataIndex: 'type', key: 'type' },
  { title: 'Действия', key: 'actions' },
];

const isModalVisible = ref(false);
const isEditMode = ref(false);
const editingId = ref<number | null>(null);

const formState = ref<CreateTransactionDto>({
  amount: 0,
  description: '',
  type: 'expense',
  categoryId: 0,
  date: new Date().toISOString().split('T')[0],
});

const filteredCategories = ref<Category[]>([]);

const openCreateModal = (type: 'income' | 'expense') => {
  isEditMode.value = false;
  editingId.value = null;
  formState.value = {
    amount: 0,
    description: '',
    type: type,
    categoryId: 0,
    date: new Date().toISOString().split('T')[0],
  };
  filteredCategories.value = props.categories.filter((c) => c.type === type);
  isModalVisible.value = true;
};

const openEditModal = (transaction: Transaction) => {
  isEditMode.value = true;
  editingId.value = transaction.id;
  formState.value = {
    amount: transaction.amount,
    description: transaction.description || '',
    type: transaction.type,
    categoryId: transaction.categoryId,
    date: transaction.date,
  };
  filteredCategories.value = props.categories.filter((c) => c.type === transaction.type);
  isModalVisible.value = true;
};

const handleTypeChange = (type: 'income' | 'expense') => {
  filteredCategories.value = props.categories.filter((c) => c.type === type);
  formState.value.categoryId = 0;
};

const handleSubmit = () => {
  if (isEditMode.value && editingId.value) {
    emit('update', editingId.value, formState.value);
  } else {
    emit('create', formState.value);
  }
  isModalVisible.value = false;
};

const handleDelete = (id: number) => {
  emit('delete', id);
};
</script>

<template>
  <div>
    <a-space style="margin-bottom: 16px" size="large">
      <a-button
        type="primary"
        size="large"
        @click="openCreateModal('income')"
        style="background: #52c41a; border-color: #52c41a"
      >
        <PlusOutlined />
        Доход
      </a-button>
      <a-button type="primary" size="large" danger @click="openCreateModal('expense')">
        <MinusOutlined />
        Расход
      </a-button>
    </a-space>

    <a-table :dataSource="transactions || []" :columns="columns" :loading="loading" rowKey="id">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'date'">
          {{ formatDate(record.date) }}
        </template>
        <template v-if="column.key === 'categoryName'">
          {{ record.category?.name }}
        </template>
        <template v-if="column.key === 'amount'">
          <span :style="{ color: record.type === 'income' ? '#3f8600' : '#cf1322' }">
            {{ record.type === 'income' ? '+' : '-' }}{{ formatCurrency(record.amount) }}
          </span>
        </template>
        <template v-if="column.key === 'type'">
          <a-tag :color="record.type === 'income' ? 'green' : 'red'">
            {{ record.type === 'income' ? 'Доход' : 'Расход' }}
          </a-tag>
        </template>
        <template v-if="column.key === 'actions'">
          <a-space>
            <a-button size="small" @click="openEditModal(record)">Изменить</a-button>
            <a-popconfirm
              title="Удалить транзакцию?"
              ok-text="Да"
              cancel-text="Нет"
              @confirm="handleDelete(record.id)"
            >
              <a-button size="small" danger>Удалить</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>

    <a-modal
      v-model:open="isModalVisible"
      :title="isEditMode ? 'Изменить транзакцию' : 'Новая транзакция'"
      @ok="handleSubmit"
      ok-text="Сохранить"
      cancel-text="Отмена"
    >
      <a-form :model="formState" layout="vertical">
        <a-form-item label="Тип" name="type">
          <a-radio-group
            v-model:value="formState.type"
            @change="() => handleTypeChange(formState.type)"
          >
            <a-radio-button value="expense">Расход</a-radio-button>
            <a-radio-button value="income">Доход</a-radio-button>
          </a-radio-group>
        </a-form-item>

        <a-form-item label="Категория" name="categoryId">
          <a-select v-model:value="formState.categoryId">
            <a-select-option v-for="cat in filteredCategories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="Сумма" name="amount">
          <a-input-number v-model:value="formState.amount" :min="0" style="width: 100%" />
        </a-form-item>

        <a-form-item label="Описание" name="description">
          <a-textarea v-model:value="formState.description" :rows="3" />
        </a-form-item>

        <a-form-item label="Дата" name="date">
          <a-input v-model:value="formState.date" type="date" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
