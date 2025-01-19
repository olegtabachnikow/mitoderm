'use server';
const nodemailer = require('nodemailer');
import axios from 'axios';
import type { FormDataType } from '@/types';

export async function sendDataOnMail(formData: any) {
  'use server';
  const username = process.env.NEXT_PUBLIC_EMAIL_USERNAME;
  const password = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;
  const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;

  const { name, email, phone } = {
    name: formData.name.value,
    email: formData.email.value,
    phone: formData.phone.value,
  };

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: username,
      pass: password,
    },
  });
  try {
    const mail = await transporter.sendMail({
      from: username,
      to: myEmail,
      subject: `New form submit from ${name}`,
      html: `
      <p>Name: ${name} </p>
      <p>Email: ${email} </p>
      <p>Phone number: ${phone} </p>
      `,
    });
    return mail;
  } catch (error) {
    return new Error('Something goes wrong');
  }
}

export async function sendDataToCRM(formData: FormDataType) {
  'use server';
  const username = process.env.NEXT_PUBLIC_CRM_USERNAME;
  const account = process.env.NEXT_PUBLIC_CRM_ACCOUNT;
  const password = process.env.NEXT_PUBLIC_CRM_PASSWORD;

  const data = {
    x_name: formData.name.value,
    x_email: formData.email.value,
    x_phone: formData.phone.value,
    x_comments: formData.profession.value,
  };

  const encodedData = new URLSearchParams(data).toString();

  const response = await axios.post(
    `https://${account}.senzey.com/extapi/pclient/add.php?username=${username}&password=${password}`,
    encodedData,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  return response;
}
