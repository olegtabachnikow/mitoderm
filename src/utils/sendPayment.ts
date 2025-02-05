'use server';
import axios from 'axios';
import type { FormDataType } from '@/types';

const env = process.env.NODE_ENV;

let crmUserName;
let crmAccount;
let crmPassword;

if (env === 'production') {
  crmUserName = process.env.NEXT_PUBLIC_CRM_USERNAME;
  crmAccount = process.env.NEXT_PUBLIC_CRM_ACCOUNT;
  crmPassword = process.env.NEXT_PUBLIC_CRM_PASSWORD;
} else if (env === 'development') {
  crmUserName = process.env.NEXT_PUBLIC_CRM_USERNAME_TEST;
  crmAccount = process.env.NEXT_PUBLIC_CRM_ACCOUNT_TEST;
  crmPassword = process.env.NEXT_PUBLIC_CRM_PASSWORD_TEST;
}

const crmUrl = `https://${crmAccount}.senzey.com/extapi/work_order/add.php?username=${crmUserName}&password=${crmPassword}`;

export async function sendPaymentDataToCRM(formData: FormDataType) {
  const finalPrice = formData.discount
    ? (parseInt(formData.totalPrice as string) * 0.9).toString()
    : formData.totalPrice;
  const totalPaymentValue =
    parseInt(formData.quantity as string) * parseInt(finalPrice as string);

  const data = {
    client_name: formData.name.value,
    client_email: formData.email.value,
    client_phone: formData.phone.value,
    client_lang: formData.lang === 'he' ? 'he' : 'en',
    total_payment: totalPaymentValue,
    currency: 'NULL',
    pay_url: true,
    send_invoice: true,
    pay_success_redirect_url: `https://mitoderm.com/${formData.lang}/event/success?username=${formData.name}&phone=${formData.phone}&email=${formData.email}`,
    pay_success_send_invoice: true,
    items: [
      {
        name: 'ticket',
        code: '1',
        price: finalPrice,
        quantity: formData.quantity,
      },
    ],
    pay_success_callback_url: 'https://www.mitoderm.com/en/event',
  };

  try {
    const response = await axios.post(crmUrl, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    });
    console.log(response.data);
    return response.data;
  } catch (err: any) {
    console.log(err.response.data);
    return err.response.data || 'Error';
  }
}
