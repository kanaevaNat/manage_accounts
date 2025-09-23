<template>
  <div class="account-form">
    <div class="form-header">
      <h2>Управление учетными записями</h2>
      <el-button
          type="primary"
          class="add-button"
      >
        +
      </el-button>
    </div>
    <div class="accounts-list">
      <div
          class="account-item">
        <div class="account-row">

          <div class="field-group">
            <label class="field-label">Метка</label>
            <el-input
                placeholder="Метки через ;"
                :maxlength="50"
                show-word-limit
            />
            <div class="field-hint">макс. 50 символов</div>
          </div>

          <div class="field-group">
            <label class="field-label">Тип записи *</label>
            <el-select
                placeholder="Тип записи"
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
            />
          </div>

          <div class="field-group">
            <label class="field-label">Пароль *</label>
            <el-input
                type="password"
                placeholder="Пароль"
                :maxlength="100"
                show-word-limit
            />
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
import { Delete } from '@element-plus/icons-vue';
</script>