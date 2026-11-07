import './style.css';
import { WalletSDK } from '@wallet-sdk-lab/sdk';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('App element not found.');
}

const sdk = new WalletSDK({
  baseURL: 'http://localhost:3000/api/v1',
});

app.innerHTML = `
  <div class="min-h-screen bg-[#080d19] text-slate-100 md:flex">

    <aside class="hidden w-64 shrink-0 border-r border-white/5 bg-[#0c1423] p-6 md:flex md:flex-col">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">W</div>
        <div>
          <h1 class="font-bold tracking-wide">Wallet SDK</h1>
          <p class="text-xs text-slate-500">Digital Wallet</p>
        </div>
      </div>

      <nav class="mt-12 space-y-2">
        <a href="#overview" class="block rounded-xl bg-blue-600/15 px-4 py-3 text-sm font-medium text-blue-400">◈ Overview</a>
        <a href="#balances" class="block rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white">◉ My Wallet</a>
        <a href="#exchange" class="block rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white">⇄ Exchange</a>
        <a href="#transfer" class="block rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white">↗ Transfer</a>
        <a href="#transactions" class="block rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white">☷ Transactions</a>
      </nav>

      <div class="mt-auto rounded-2xl border border-blue-500/15 bg-blue-500/5 p-4">
        <p class="text-xs text-slate-400">Environment</p>
        <div class="mt-2 flex items-center gap-2">
          <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
          <span class="text-sm font-medium">Test Mode</span>
        </div>
        <p class="mt-2 text-xs leading-5 text-slate-500">This is a demonstration wallet. No real money is involved.</p>
      </div>
    </aside>

    <main id="overview" class="min-w-0 flex-1 p-5 md:p-8 lg:p-10">

      <header class="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p class="text-sm text-slate-500">Welcome back</p>
          <h2 class="mt-1 text-2xl font-bold tracking-tight md:text-3xl">Dashboard</h2>
          <p id="walletOwner" class="mt-1 text-xs text-slate-500">Loading wallet...</p>
        </div>

        <div class="flex items-center gap-3">
          <span class="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">● API Connected</span>
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-sm font-bold">TU</div>
        </div>
      </header>

      <div id="statusMessage" role="status" aria-live="polite" class="mb-6 hidden rounded-xl border p-4 text-sm"></div>

      <section id="balances">
        <div class="mb-5 flex items-center justify-between">
          <h3 class="text-lg font-semibold">Your balances</h3>
          <button id="refreshButton" class="text-xs text-blue-400 hover:text-blue-300">↻ Refresh</button>
        </div>

        <div class="grid gap-5 sm:grid-cols-2">
          <article class="relative overflow-hidden rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-600 to-blue-900 p-6">
            <div class="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
            <div class="relative flex items-center justify-between">
              <span class="text-sm font-medium text-blue-100">US Dollar</span>
              <span class="rounded-lg bg-white/15 px-3 py-1 text-xs font-bold">USD</span>
            </div>
            <p id="usdBalance" class="relative mt-8 text-3xl font-bold tracking-tight">Loading...</p>
            <p class="relative mt-2 text-xs text-blue-200">Available balance</p>
          </article>

          <article class="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#19263c] to-[#101827] p-6">
            <div class="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-500/10 blur-2xl"></div>
            <div class="relative flex items-center justify-between">
              <span class="text-sm font-medium text-slate-300">Euro</span>
              <span class="rounded-lg bg-white/10 px-3 py-1 text-xs font-bold">EUR</span>
            </div>
            <p id="eurBalance" class="relative mt-8 text-3xl font-bold tracking-tight">Loading...</p>
            <p class="relative mt-2 text-xs text-slate-400">Available balance</p>
          </article>
        </div>
      </section>

      <section class="mt-10 grid gap-5 lg:grid-cols-2">

        <article id="exchange" class="rounded-2xl border border-white/5 bg-[#101827] p-6">
          <div class="mb-6 flex items-center justify-between">
            <h3 class="font-semibold">Exchange currency</h3>
            <span class="text-xl text-blue-400">⇄</span>
          </div>

          <form id="exchangeForm">
            <label for="exchangeAmount" class="mb-2 block text-xs text-slate-400">Amount to exchange</label>
            <div class="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0b1220] p-4">
              <select id="exchangeFrom" class="bg-transparent text-sm font-bold text-white outline-none">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
              <input id="exchangeAmount" type="number" min="0.01" step="0.01" required placeholder="0.00" class="w-full bg-transparent text-right text-lg text-white outline-none placeholder:text-slate-600" />
            </div>

            <div class="my-4 flex justify-center">
              <span class="rounded-full border border-white/10 bg-[#172337] px-3 py-2 text-blue-400">↓</span>
            </div>

            <label class="mb-2 block text-xs text-slate-400">Estimated receive</label>
            <div class="flex items-center justify-between rounded-xl border border-white/10 bg-[#0b1220] p-4">
              <span id="exchangeTo" class="font-bold">EUR</span>
              <span id="exchangePreview" class="text-lg text-slate-400">0.00</span>
            </div>

            <p class="mt-3 text-xs text-slate-500">Demo rate: 1 USD = 0.92 EUR</p>

            <button id="exchangeButton" type="submit" class="mt-6 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50">
              Exchange currency
            </button>
          </form>
        </article>

        <article id="transfer" class="rounded-2xl border border-white/5 bg-[#101827] p-6">
          <div class="mb-6 flex items-center justify-between">
            <h3 class="font-semibold">Send money</h3>
            <span class="text-xl text-blue-400">↗</span>
          </div>

          <form id="transferForm">
            <label for="recipient" class="mb-2 block text-xs text-slate-400">Recipient</label>
            <input id="recipient" type="text" minlength="3" maxlength="50" required placeholder="Enter recipient ID" class="w-full rounded-xl border border-white/10 bg-[#0b1220] p-4 text-sm outline-none placeholder:text-slate-600 focus:border-blue-500" />

            <label for="transferAmount" class="mb-2 mt-5 block text-xs text-slate-400">Amount</label>
            <input id="transferAmount" type="number" min="0.01" step="0.01" required placeholder="0.00" class="w-full rounded-xl border border-white/10 bg-[#0b1220] p-4 text-sm outline-none placeholder:text-slate-600 focus:border-blue-500" />

            <label for="transferCurrency" class="mb-2 mt-5 block text-xs text-slate-400">Currency</label>
            <select id="transferCurrency" class="w-full rounded-xl border border-white/10 bg-[#0b1220] p-4 text-sm text-white outline-none">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>

            <button id="transferButton" type="submit" class="mt-6 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50">
              Send money
            </button>
          </form>
        </article>

      </section>

      <section id="transactions" class="mt-10 overflow-hidden rounded-2xl border border-white/5 bg-[#101827]">
        <div class="flex items-center justify-between border-b border-white/5 p-6">
          <div>
            <h3 class="font-semibold">Recent transactions</h3>
            <p class="mt-1 text-xs text-slate-500">Your latest wallet activity</p>
          </div>
          <span id="transactionCount" class="text-xs text-slate-500">0 transactions</span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-white/[0.02] text-xs text-slate-500">
              <tr>
                <th class="px-6 py-4 font-medium">Transaction</th>
                <th class="px-6 py-4 font-medium">Date</th>
                <th class="px-6 py-4 font-medium">Status</th>
                <th class="px-6 py-4 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody id="transactionsBody">
              <tr>
                <td colspan="4" class="px-6 py-12 text-center text-slate-500">Loading transactions...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <footer class="mt-10 text-center text-xs text-slate-600">
        Wallet SDK Lab · Demo Environment
      </footer>
    </main>
  </div>
`;

type Currency = 'USD' | 'EUR';

const usdBalance = document.querySelector<HTMLElement>('#usdBalance')!;
const eurBalance = document.querySelector<HTMLElement>('#eurBalance')!;
const walletOwner = document.querySelector<HTMLElement>('#walletOwner')!;
const transactionsBody = document.querySelector<HTMLElement>('#transactionsBody')!;
const transactionCount = document.querySelector<HTMLElement>('#transactionCount')!;
const statusMessage = document.querySelector<HTMLElement>('#statusMessage')!;

const exchangeForm = document.querySelector<HTMLFormElement>('#exchangeForm')!;
const exchangeAmount = document.querySelector<HTMLInputElement>('#exchangeAmount')!;
const exchangeFrom = document.querySelector<HTMLSelectElement>('#exchangeFrom')!;
const exchangeTo = document.querySelector<HTMLElement>('#exchangeTo')!;
const exchangePreview = document.querySelector<HTMLElement>('#exchangePreview')!;
const exchangeButton = document.querySelector<HTMLButtonElement>('#exchangeButton');

const transferForm = document.querySelector<HTMLFormElement>('#transferForm')!;
const recipientInput = document.querySelector<HTMLInputElement>('#recipient')!;
const transferAmount = document.querySelector<HTMLInputElement>('#transferAmount')!;
const transferCurrency = document.querySelector<HTMLSelectElement>('#transferCurrency')!;
const transferButton = document.querySelector<HTMLButtonElement>('#transferButton');

const refreshButton = document.querySelector<HTMLButtonElement>('#refreshButton')!;

function formatMoney(amountMinor: number, currency: Currency): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amountMinor / 100);
}

function toMinorUnits(value: string): number {
  const amount = Number(value);

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error('Please enter a valid amount greater than zero.');
  }

  const minorUnits = Math.round(amount * 100);

  if (!Number.isSafeInteger(minorUnits) || minorUnits < 1) {
    throw new Error('The entered amount is invalid.');
  }

  return minorUnits;
}

function showMessage(message: string, type: 'success' | 'error' | 'info' = 'info') {
  const styles = {
    success: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
    error: 'border-red-500/20 bg-red-500/10 text-red-300',
    info: 'border-blue-500/20 bg-blue-500/10 text-blue-300',
  };

  statusMessage.className = `mb-6 rounded-xl border p-4 text-sm ${styles[type]}`;
  statusMessage.textContent = message;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred.';
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };

    return entities[character];
  });
}

async function loadDashboard() {
  refreshButton.disabled = true;

  try {
    const [wallet, balance, transactionList] = await Promise.all([
      sdk.getWallet(),
      sdk.getBalance(),
      sdk.getTransactions(),
    ]);

    walletOwner.textContent = `Wallet owner: ${wallet.owner}`;
    usdBalance.textContent = formatMoney(balance.balances.USD, 'USD');
    eurBalance.textContent = formatMoney(balance.balances.EUR, 'EUR');

    transactionCount.textContent = `${transactionList.count} transactions`;

    if (transactionList.transactions.length === 0) {
      transactionsBody.innerHTML = `
        <tr>
          <td colspan="4" class="px-6 py-12 text-center text-slate-500">
            No transactions yet. Try an exchange or transfer.
          </td>
        </tr>
      `;
      return;
    }

    transactionsBody.innerHTML = transactionList.transactions.map((transaction) => {
      const date = new Date(transaction.createdAt).toLocaleString();
      const description = escapeHtml(transaction.description);
      const amount = formatMoney(transaction.amountMinor, transaction.currency);
      const type = escapeHtml(transaction.type);

      return `
        <tr class="border-t border-white/5 hover:bg-white/[0.02]">
          <td class="px-6 py-4">
            <p class="font-medium capitalize">${type}</p>
            <p class="mt-1 text-xs text-slate-500">${description}</p>
          </td>
          <td class="whitespace-nowrap px-6 py-4 text-xs text-slate-400">${date}</td>
          <td class="px-6 py-4">
            <span class="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
              ${escapeHtml(transaction.status)}
            </span>
          </td>
          <td class="whitespace-nowrap px-6 py-4 text-right font-medium">${amount}</td>
        </tr>
      `;
    }).join('');
  } catch (error) {
    showMessage(`Could not load wallet data: ${getErrorMessage(error)}`, 'error');
  } finally {
    refreshButton.disabled = false;
  }
}

function updateExchangePreview() {
  const from = exchangeFrom.value as Currency;
  const to: Currency = from === 'USD' ? 'EUR' : 'USD';

  exchangeTo.textContent = to;

  const amount = Number(exchangeAmount.value);

  if (!Number.isFinite(amount) || amount <= 0) {
    exchangePreview.textContent = '0.00';
    return;
  }

  const rate = from === 'USD' ? 0.92 : 1 / 0.92;
  const result = amount * rate;

  exchangePreview.textContent = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(result);
}

exchangeAmount.addEventListener('input', updateExchangePreview);
exchangeFrom.addEventListener('change', updateExchangePreview);

exchangeForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!exchangeButton) return;

  exchangeButton.disabled = true;
  exchangeButton.textContent = 'Processing...';

  try {
    const fromCurrency = exchangeFrom.value as Currency;
    const toCurrency: Currency = fromCurrency === 'USD' ? 'EUR' : 'USD';
    const amountMinor = toMinorUnits(exchangeAmount.value);

    const result = await sdk.exchange({
      fromCurrency,
      toCurrency,
      amountMinor,
    });

    showMessage(
      `Exchange successful! You received ${formatMoney(result.received.amountMinor, result.received.currency)}.`,
      'success',
    );

    exchangeAmount.value = '';
    updateExchangePreview();

    await loadDashboard();
  } catch (error) {
    showMessage(getErrorMessage(error), 'error');
  } finally {
    exchangeButton.disabled = false;
    exchangeButton.textContent = 'Exchange currency';
  }
});

transferForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!transferButton) return;

  transferButton.disabled = true;
  transferButton.textContent = 'Sending...';

  try {
    const recipient = recipientInput.value.trim();
    const currency = transferCurrency.value as Currency;
    const amountMinor = toMinorUnits(transferAmount.value);

    if (recipient.length < 3 || recipient.length > 50) {
      throw new Error('Recipient must be between 3 and 50 characters.');
    }

    await sdk.transfer({
      recipient,
      currency,
      amountMinor,
    });

    showMessage(
      `Transfer successful! ${formatMoney(amountMinor, currency)} sent to ${recipient}.`,
      'success',
    );

    recipientInput.value = '';
    transferAmount.value = '';

    await loadDashboard();
  } catch (error) {
    showMessage(getErrorMessage(error), 'error');
  } finally {
    transferButton.disabled = false;
    transferButton.textContent = 'Send money';
  }
});

refreshButton.addEventListener('click', async () => {
  showMessage('Refreshing wallet data...', 'info');
  await loadDashboard();
});

updateExchangePreview();
void loadDashboard();

