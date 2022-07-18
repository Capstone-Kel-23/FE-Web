// --- STAGING ENTRY ---
// export const entry = 'http://103.176.79.65:8080/api/v1'

// --- PROD ENTRY ---
// export const entry = 'http://prodapi.tagihin.my.id/api/v1'

// --- PROD ENTRY (SAFE TO DEPLOY) ---
export const entry = 'https://api-tagihin.herokuapp.com/api/v1'

// --- ENDPOINTS ---
export const loginUser = '/login'
export const registerUser = '/register'
export const verifyEmail = '/verify/send'
export const invoices = '/invoices/user'
export const invoicesByUser = '/invoices'
export const detailInvoiceByNumber = '/invoice/detail'
export const detailInvoiceById = '/invoice/detail'
export const createInvoice = '/invoice'
export const importInvoice = '/invoice/file'
export const sendInvoice = '/invoice/send'
export const changeInvoiceStatus = '/invoice/status'
export const deleteInvoice = '/invoice'
