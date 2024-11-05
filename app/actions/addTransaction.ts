'use server'

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface TransactionData {
  text: string;
  amount: number;
}

interface TransactionResult {
  data?: TransactionData;
  error?: string;
}

async function addTransaction(formData: FormData): Promise<TransactionResult> {
  const textValue = formData.get('text');
  const amountValue = formData.get('amount');

  // Check for input value
  if (!textValue || textValue === "" || !amountValue) {
    return {
      error: "Text or amount cannot be empty"
    };
    
  }

  const text: string = textValue.toString();
  const amount: number = parseFloat(amountValue.toString());

  // Await the auth() promise to get the userId
  const { userId } = await auth();  // Add `await` here
  if (!userId) {
    return {
      error: "User not authenticated"
    };
  }

  try {
    const transactionData: TransactionData = await db.transaction.create({
        data: {
            text,
            amount,
            userId
        }
      });

      revalidatePath('/');
    
      return { data: transactionData };
  } catch (error) {
    return { 
        error: "Transaction Not Added"
    };
  }


}

export default addTransaction;
