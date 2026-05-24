// services/payment.service.ts
import midtransClient from 'midtrans-client';

export const snap = new midtransClient.Snap({
  isProduction: false, // Ubah ke true untuk production
  serverKey: process.env.MIDTRANS_SERVER_KEY || '',
  clientKey: process.env.MIDTRANS_CLIENT_KEY || ''
});

export const createPaymentToken = async (orderId: string, grossAmount: number, customerDetails: any) => {
  try {
    const parameter = {
      transaction_details: { order_id: orderId, gross_amount: grossAmount },
      customer_details: customerDetails,
      credit_card: { secure: true }
    };
    const transaction = await snap.createTransaction(parameter);
    return transaction.token;
  } catch (error) {
    throw new Error('Midtrans Token Generation Failed');
  }
};