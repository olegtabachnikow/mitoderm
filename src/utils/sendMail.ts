'use server';
const nodemailer = require('nodemailer');
import { FormDataType } from '@/types';

export async function sendData(formData: any) {
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
  } catch (error) {
    return new Error('Something goes wrong');
  }
}
