<template>
  <NuxtLayout name="dashboard">
    <div class="categories-page">
      <a-tabs v-model:activeKey="activeTab">
        <a-tab-pane key="expense" tab="Расходы">
          <a-row :gutter="[16, 16]">
            <a-col
              v-for="category in expenseCategories"
              :key="category.id"
              :xs="24"
              :sm="12"
              :md="8"
              :lg="6"
            >
              <a-card
                hoverable
                class="category-card"
                @mouseenter="hoveredCategory = category.id"
                @mouseleave="hoveredCategory = null"
              >
                <div class="category-content">
                  <h3>{{ category.name }}</h3>
                  <a-tag :color="category.isDefault ? 'blue' : 'green'">
                    {{ category.isDefault ? 'Базовая' : 'Своя' }}
                  </a-tag>
                </div>
                <EditOutlined
                  v-if="!category.isDefault && hoveredCategory === category.id"
                  class="edit-icon"
                  @click="editCategory(category)"
                />
              </a-card>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :lg="6">
              <a-card hoverable class="add-card" @click="showAddModal('expense')">
                <PlusOutlined style="font-size: 48px; color: #1890ff" />
                <p>Добавить категорию</p>
              </a-card>
            </a-col>
          </a-row>
        </a-tab-pane>

        <a-tab-pane key="income" tab="Доходы">
          <a-row :gutter="[16, 16]">
            <a-col
              v-for="category in incomeCategories"
              :key="category.id"
              :xs="24"
              :sm="12"
              :md="8"
              :lg="6"
            >
              <a-card
                hoverable
                class="category-card"
                @mouseenter="hoveredCategory = category.id"
                @mouseleave="hoveredCategory = null"
              >
                <div class="category-content">
                  <h3>{{ category.name }}</h3>
                  <a-tag :color="category.isDefault ? 'blue' : 'green'">
                    {{ category.isDefault ? 'Базовая' : 'Своя' }}
                  </a-tag>
                </div>
                <EditOutlined
                  v-if="!category.isDefault && hoveredCategory === category.id"
                  class="edit-icon"
                  @click="editCategory(category)"
                />
              </a-card>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :lg="6">
              <a-card hoverable class="add-card" @click="showAddModal('income')">
                <PlusOutlined style="font-size: 48px; color: #52c41a" />
                <p>Добавить категорию</p>
              </a-card>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>

      <a-modal
        v-model:open="modalVisible"
        :title="editingCategory ? 'Редактировать категорию' : 'Новая категория'"
        @ok="handleSaveCategory"
        :confirm-loading="loading"
      >
        <a-form layout="vertical">
          <a-form-item label="Название" required>
            <a-input
              v-model:value="categoryForm.name"
              size="large"
              placeholder="Название категории"
            />
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { PlusOutlined, EditOutlined } from '@ant-design/icons-vue';
import { useCategoryStore, type Category } from '../../entities/category';
import { message } from '../../shared/lib';

const categoriesStore = useCategoryStore();

const activeTab = ref('expense');
const modalVisible = ref(false);
const loading = ref(false);
const hoveredCategory = ref<number | null>(null);
const editingCategory = ref<Category | null>(null);

const categoryForm = ref({
  name: '',
  type: 'expense' as 'income' | 'expense',
});

const expenseCategories = computed(() => categoriesStore.expenseCategories);
const incomeCategories = computed(() => categoriesStore.incomeCategories);

const showAddModal = (type: 'income' | 'expense') => {
  editingCategory.value = null;
  categoryForm.value = { name: '', type };
  modalVisible.value = true;
};

const editCategory = (category: Category) => {
  editingCategory.value = category;
  categoryForm.value = {
    name: category.name,
    type: category.type,
  };
  modalVisible.value = true;
};

const handleSaveCategory = async () => {
  if (!categoryForm.value.name) {
    message.error('Введите название категории');
    return;
  }

  loading.value = true;
  try {
    if (editingCategory.value) {
      await categoriesStore.updateCategory(editingCategory.value.id, {
        name: categoryForm.value.name,
      });
      message.success('Категория обновлена');
    } else {
      await categoriesStore.createCategory(categoryForm.value);
      message.success('Категория создана');
    }
    modalVisible.value = false;
  } catch (error: any) {
    message.error(error || 'Ошибка сохранения');
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  try {
    await categoriesStore.fetchCategories();
  } catch {
    message.error('Ошибка загрузки категорий');
  }
});
</script>

<style scoped>
.categories-page {
  max-width: 1200px;
  margin: 0 auto;
}

.category-card {
  position: relative;
  text-align: center;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-content h3 {
  margin: 8px 0;
}

.edit-icon {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 18px;
  color: #1890ff;
  cursor: pointer;
}

.add-card {
  text-align: center;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #d9d9d9;
  background: #fafafa;
}

.add-card:hover {
  border-color: #1890ff;
}

.add-card p {
  margin-top: 8px;
  color: #666;
}
</style>
