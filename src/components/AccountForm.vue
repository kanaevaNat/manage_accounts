<template>
  <div class="account-form">
    <div class="form-header">
      <h2>Управление учетными записями</h2>
      <el-button
          type="primary"
          class="add-button"
          @click="addAccount"
      >
        +
      </el-button>
    </div>
    <div class="accounts-list">
      <div
          v-for="account in accounts"
          :key="account.id"
          class="account-item">

        <div class="account-row">
          <div class="field-group">
            <label class="field-label">Метка</label>
            <el-input
                placeholder="Метки через ;"
                :maxlength="50"
                show-word-limit
                v-model="account.label"
                :class="{ 'error': !isLabelValid(account.label) }"
            />
            <div class="field-hint">макс. 50 символов</div>
          </div>

          <div class="field-group">
            <label class="field-label">Тип записи *</label>
            <el-select
                placeholder="Тип записи"
                v-model="account.type"
                :class="{ 'error': !isTypeValid(account.type) }"
            >
              <el-option label="LDAP" value="LDAP" />
              <el-option label="Локальная" value="Локальная" />
            </el-select>
          </div>

          <div class="field-group">
            <label class="field-label">Логин *</label>
            <el-input
                placeholder="Логин"
                :maxlength="100"
                show-word-limit
                v-model="account.login"
                :class="{ 'error': !isLoginValid(account.login) }"
            />
          </div>

          <div class="field-group" v-if="account.type === 'Локальная'">
            <label class="field-label">Пароль *</label>
            <el-input
                type="password"
                placeholder="Пароль"
                :maxlength="100"
                show-word-limit
                v-model="account.password"
                :class="{ 'error': !isPasswordValid(account) }"
            />
          </div>

          <div class="field-group" v-else>
            <label class="field-label">&nbsp;</label>
            <div class="empty-field"></div>
          </div>

          <div class="field-group delete-group">
            <label class="field-label">&nbsp;</label>
            <el-button
                type="danger"
                class="delete-button"
                :icon="Delete"
            >
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { Delete } from '@element-plus/icons-vue';
import {type Account, useAccountsStore} from "../store/accounts.ts";

const accountsStore = useAccountsStore();
const accounts = computed(() => accountsStore.accounts);

const isLabelValid = (label: string): boolean => {
  return label.length <= 50;
};
const isTypeValid = (type: string): boolean => {
  return ['LDAP', 'Локальная'].includes(type);
};

const isLoginValid = (login: string): boolean => {
  return login.trim().length > 0 && login.length <= 100;
};

const isPasswordValid = (account: Account): boolean => {
  if (account.type === 'LDAP') return true;
  return account.password !== null && account.password.trim().length > 0 && account.password.length <= 100;
};
const addAccount = () => {
  accountsStore.addAccount();
};
onMounted(() => {
  accountsStore.loadFromLocalStorage();
});
</script>

<style scoped>
.account-form {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}
.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e4e7ed;
}
.form-header h2 {
  margin: 0;
  color: #303133;
  font-size: 24px;
}
.accounts-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.account-item {
  border: 1px solid #e4e7ed;
  border-radius: 15px;
  padding: 20px;
  background-color: #fff;
}
.account-row {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.5fr 1.5fr auto;
  gap: 16px;
  align-items: start;
}
.field-group {
  display: flex;
  flex-direction: column;
  min-height: 80px;
}
.field-label {
  font-weight: 600;
  margin-bottom: 8px;
  color: #606266;
  font-size: 14px;
  white-space: nowrap;
}
.field-hint {
  font-size: 11px;
  color: #909399;
  margin-top: 4px;
  line-height: 1.2;
}
.delete-group {
  display: flex;
  align-items: flex-end;
}

.delete-button {
  height: 30px;
  white-space: nowrap;
  border-radius: 15px;
}
.add-button {
  margin-right: auto;
  height: 40px;
  margin-left: 40px;
}

</style>