export interface BankAccount {
  id: string,
  userId: string,
  name: string,
  initialBalance: number,
  type: 'CHECKING' | 'INVESTMENT' | 'CASH'
  color: string,
  totalTransactions: number,
  currentBalance: number
}
