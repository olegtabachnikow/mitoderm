'use client';
import { FC, FormEvent, useState } from 'react';
import styles from './Form.module.scss';
import Image from 'next/image';
import Button from '../Shared/Button/Button';
import { useTranslations } from 'next-intl';
import FormInput from './FormInput/FormInput';
import { emailRegex } from '@/constants';
import { useMediaQuery } from 'react-responsive';
import useAppStore from '@/store/store';

interface FormDataType {
  name: { value: string; error: string };
  email: { value: string; error: string };
  phone: { value: string; error: string };
}

const initialFormData: FormDataType = {
  name: { value: '', error: '' },
  email: { value: '', error: '' },
  phone: { value: '', error: '' },
};

const Form: FC = () => {
  const toggleModal = useAppStore((state) => state.toggleModal);
  const t = useTranslations();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataType>(initialFormData);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isSent, setIsSent] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { name, email, phone } = formData;
    const errors = { name: '', email: '', message: '' };
    if (name.value.trim().length < 3) {
      errors.name = t('form.errors.name_length');
    }
    if (!name.value.length) {
      errors.name = t('form.errors.name_required');
    }
    if (!email.value.match(emailRegex)) {
      errors.email = t('form.errors.email_invalid');
    }
    if (!email.value.length) {
      errors.email = t('form.errors.email_required');
    }
    if (phone.value.trim().length < 9) {
      errors.message = t('form.errors.phone_length');
    }
    if (!phone.value.length) {
      errors.message = t('form.errors.phone_required');
    }
    if (errors.name || errors.email || errors.message) {
      setFormData({
        name: { value: name.value, error: errors.name },
        email: { value: email.value, error: errors.email },
        phone: { value: phone.value, error: errors.message },
      });
      return;
    }
    const validatedData = {
      name: name.value,
      email: email.value,
      phone: phone.value,
    };
    // setIsSending(true);
    // try {
    //   const response = await fetch('/api/contact', {
    //     method: 'POST',
    //     body: JSON.stringify(validatedData),
    //   });

    //   if (!response.ok) {
    //     throw new Error(`response status: ${response.status}`);
    //   }

    //   setIsSending(false);
    //   setIsSent(true);
    //   setIsError(false);
    // } catch (err) {
    //   setIsSending(false);
    //   setIsSent(true);
    //   setIsError(true);
    // }

    console.log(validatedData);
  };

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} onClick={() => toggleModal(false)}>
        <Image
          src='/images/formCloseButton.svg'
          width={20}
          height={20}
          alt='close icon'
        />
      </button>
      <div className={styles.formContainer}>
        <h2>
          {t('form.titleP1')}
          <br />
          <span>{t('form.titleP2')}</span>
          {t('form.titleP3')}
        </h2>
        <p>
          {t('form.subtitleP1')}
          <span>{t('form.subtitleP2')}</span>
        </p>
        <form
          noValidate
          className={styles.form}
          onSubmit={onSubmit}
          action='submit'
        >
          <FormInput
            label={t('form.placeholderInputName')}
            value={formData.name.value}
            onChange={(str: string) => {
              setFormData({ ...formData, name: { value: str, error: '' } });
            }}
            min={3}
            max={20}
            type='text'
            name='name'
            placeholder='Aaron Smith'
            error={formData.name.error}
          />
          <FormInput
            label={t('form.placeholderEmailName')}
            value={formData.email.value}
            onChange={(str: string) => {
              setFormData({ ...formData, email: { value: str, error: '' } });
            }}
            type='email'
            name='email'
            placeholder='mitoderm@mail.com'
            error={formData.email.error}
          />
          <FormInput
            label={t('form.placeholderPhoneName')}
            value={formData.phone.value}
            onChange={(str: string) => {
              setFormData({ ...formData, phone: { value: str, error: '' } });
            }}
            type='tel'
            name='phone'
            placeholder='586 412 924'
            error={formData.phone.error}
          />
          <label className={styles.checkboxLabel}>
            {t('form.checkboxLabel')}
            <input
              checked={isChecked}
              onChange={() => setIsChecked((state) => !state)}
              name='approve'
              type='checkbox'
              required
            />
            <div className={styles.customCheckbox} />
          </label>
          <Button
            disabled={!isChecked}
            submit
            colored
            text={t('buttons.requestCallback')}
          />
          <div className={styles.row}>
            <Image
              src='/images/lockIcon.svg'
              width={14}
              height={14}
              alt='lock icon'
            />
            <p>{t('form.sharing')}</p>
          </div>
        </form>
      </div>
      {isTabletOrMobile ? null : (
        <Image
          width={620}
          height={664}
          src='/images/formImage.png'
          alt='background with exosome'
        />
      )}
    </div>
  );
};

export default Form;
