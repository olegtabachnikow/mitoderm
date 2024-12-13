'use client';
import { FC, FormEvent, useState, useEffect } from 'react';
import styles from './Form.module.scss';
import Image from 'next/image';
import Button from '../Shared/Button/Button';
import { useTranslations } from 'next-intl';
import FormInput from './FormInput/FormInput';
import { emailRegex } from '@/constants';
import { useMediaQuery } from 'react-responsive';
import useAppStore from '@/store/store';
import type { FormDataType } from '@/types';

const Form: FC = () => {
  const toggleModal = useAppStore((state) => state.toggleModal);
  const t = useTranslations();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormDataType>({
    name: { value: '', isValid: false },
    email: { value: '', isValid: false },
    phone: { value: '', isValid: false },
  });
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isSent, setIsSent] = useState<boolean>(false);

  const validateName = (data: string) => {
    let error: string = '';
    if (data.trim().length < 3) {
      error = t('form.errors.name_length');
    }
    if (!data.length) {
      error = t('form.errors.name_required');
    }
    return error;
  };

  const validateEmail = (data: string) => {
    let error: string = '';
    if (!data.match(emailRegex)) {
      error = t('form.errors.email_invalid');
    }
    if (!data.length) {
      error = t('form.errors.email_required');
    }
    return error;
  };

  const validatePhone = (data: string) => {
    let error: string = '';
    if (data.trim().length < 9) {
      error = t('form.errors.phone_length');
    }
    if (!data.length) {
      error = t('form.errors.phone_required');
    }
    return error;
  };

  const handleData = (
    data: string,
    name: 'name' | 'email' | 'phone',
    isValid: boolean
  ) => {
    setFormData({ ...formData, [name]: { value: data, isValid } });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const response = await fetch('/api', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`response status: ${response.status}`);
      }

      setIsSending(false);
      setIsSent(true);
    } catch (err) {
      setIsSending(false);
      setIsSent(true);
    }
    return;
  };

  useEffect(() => {
    !formData.email.isValid ||
    !formData.name.isValid ||
    !formData.phone.isValid ||
    !isChecked
      ? setIsButtonDisabled(true)
      : setIsButtonDisabled(false);
  }, [formData, isChecked]);

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
        {isSent ? (
          <>
            {isTabletOrMobile ? (
              <span className={styles.isSentTitle}>
                {t('form.sent.mobTitle')}
              </span>
            ) : null}
            <p className={styles.formSubmitted}>
              {t('form.sent.text')}
              <span>{t('form.sent.textColored')}</span>
            </p>
          </>
        ) : (
          <>
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
                setFormData={handleData}
                min={3}
                max={20}
                type='text'
                name='name'
                placeholder='Aaron Smith'
                validator={validateName}
              />
              <FormInput
                label={t('form.placeholderEmailName')}
                setFormData={handleData}
                type='email'
                name='email'
                placeholder='mitoderm@mail.com'
                validator={validateEmail}
              />
              <FormInput
                label={t('form.placeholderPhoneName')}
                setFormData={handleData}
                type='tel'
                name='phone'
                placeholder='586 412 924'
                validator={validatePhone}
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
                disabled={isButtonDisabled}
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
          </>
        )}
      </div>
      {isTabletOrMobile ? null : (
        <Image
          className={styles.desktopImage}
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
