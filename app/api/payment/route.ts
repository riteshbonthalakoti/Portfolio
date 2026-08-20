import { NextResponse } from 'next/server';

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({ status: "Payment API Active" });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, email, paymentMethod, price } = body;

    console.log('Payment request received for product:', productId, 'from:', email);

    // Generate unique transaction metadata
    const transactionId = `TXN_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    const orderId = `ORD_${Date.now().toString().slice(-6)}`;
    const timestamp = new Date().toISOString();

    // Simulate payment gateway validation (Stripe / Razorpay placeholder)
    return NextResponse.json({ 
      success: true, 
      message: 'Payment processed successfully',
      transactionId,
      orderId,
      productId: productId || 'custom-digital-item',
      amountPaid: price || 0,
      currency: 'USD',
      paymentMethod: paymentMethod || 'Card',
      timestamp,
      downloadUrl: `https://riteshbonthalakoti.vercel.app/api/downloads/${transactionId}`,
      receiptUrl: `https://riteshbonthalakoti.vercel.app/receipts/${orderId}`
    });
  } catch (error: any) {
    console.error('Payment error:', error);
    return NextResponse.json({ error: 'Failed to process payment. Please try again.' }, { status: 500 });
  }
}

