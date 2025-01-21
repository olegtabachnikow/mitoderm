'use server';
import axios from 'axios';
import type { FormDataType } from '@/types';

const crmUserName = process.env.NEXT_PUBLIC_CRM_USERNAME;
const crmAccount = process.env.NEXT_PUBLIC_CRM_ACCOUNT;
const crmPassword = process.env.NEXT_PUBLIC_CRM_PASSWORD;
const crmUrl = `https://${crmAccount}.senzey.com/extapi/work_order/add.php?username=${crmUserName}&password=${crmPassword}`;

export async function sendPaymentDataToCRM(formData: FormDataType) {
  const data = {
    client_name: formData.name.value,
    client_email: formData.email.value,
    client_phone: formData.phone.value,
    total_payment: formData.totalPrice,
    currency: 'USD',
    pay_url: true,
  };

  try {
    const response = await axios.post(crmUrl, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    });

    return response.data;
  } catch (err: any) {
    console.log(err);
    return err.response.data || 'Error';
  }
}
