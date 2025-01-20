import axios from 'axios';
import type { FormDataType } from '@/types';

const crmUserName = process.env.NEXT_PUBLIC_CRM_USERNAME;
const crmAccount = process.env.NEXT_PUBLIC_CRM_ACCOUNT;
const crmPassword = process.env.NEXT_PUBLIC_CRM_PASSWORD;
const crmUrl = `https://${crmAccount}.senzey.com/extapi/pclient/add.php?username=${crmUserName}&password=${crmPassword}`;

export async function sendDataToCRM(formData: FormDataType) {
  const data = {
    x_name: formData.name.value,
    x_email: formData.email.value,
    x_phone: formData.phone.value,
    x_comments: formData.profession.value,
  };

  return await axios.post(crmUrl, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}
