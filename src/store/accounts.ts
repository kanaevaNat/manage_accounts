import { defineStore } from 'pinia';

export interface AccountLabel {
    text: string;
}

export interface Account {
    id: string;
    label: string;
    labels: AccountLabel[];
    type: 'LDAP' | 'Локальная';
    login: string;
    password: string | null;
}

interface AccountsState {
    accounts: Account[];
}

export const useAccountsStore = defineStore('accounts', {
    state: (): AccountsState => ({
        accounts: [],
    }),

    actions: {
        addAccount() {
            const newAccount: Account = {
                id: Date.now().toString(),
                label: '',
                labels: [],
                type: 'Локальная',
                login: '',
                password: '',
            };
            this.accounts.push(newAccount);
            this.saveToLocalStorage();
        },
        updateAccount(updatedAccount: Account) {
            const index = this.accounts.findIndex(acc => acc.id === updatedAccount.id);
            if (index !== -1) {
                const labels = this.parseLabels(updatedAccount.label);
                this.accounts[index] = {
                    ...updatedAccount,
                    labels,
                };
                this.saveToLocalStorage();
            }
        },
        deleteAccount(accountId: string) {
            this.accounts = this.accounts.filter(acc => acc.id !== accountId);
            this.saveToLocalStorage();
        },
        parseLabels(labelString: string): AccountLabel[] {
            if (!labelString.trim()) return [];

            return labelString
                .split(';')
                .map(label => label.trim())
                .filter(label => label.length > 0)
                .map(label => ({ text: label }));
        },
        loadFromLocalStorage() {
            if (typeof window !== 'undefined') {
                const saved = localStorage.getItem('accounts');
                if (saved) {
                    try {
                        this.accounts = JSON.parse(saved);
                    } catch (error) {
                        console.error('Error loading accounts from localStorage:', error);
                    }
                }
            }
        },
        saveToLocalStorage() {
            if (typeof window !== 'undefined') {
                localStorage.setItem('accounts', JSON.stringify(this.accounts));
            }
        },
    }
});