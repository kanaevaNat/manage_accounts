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