'use client';
import { FC } from 'react';
import styles from './Form.module.scss';
import Image from 'next/image';
import Button from '../Shared/Button/Button';
import { useTranslations } from 'next-intl';

const Form: FC = () => {
  const t = useTranslations();
  return (
    <div className={styles.container}>
      <button className={styles.closeButton}>
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
        <form className={styles.form} action='submit'>
          <label className={styles.inputLabel}>
            {t('form.placeholderInputName')}
            <input type='text' name='name' placeholder='Aaron Smith' required />
          </label>
          <label className={styles.inputLabel}>
            {t('form.placeholderEmailName')}
            <input
              type='email'
              name='email'
              placeholder='mitoderm@mail.com'
              required
            />
          </label>
          <label className={styles.inputLabel}>
            {t('form.placeholderPhoneName')}
            <input type='tel' name='phone' placeholder='586 412 924' required />
          </label>
          <label className={styles.checkboxLabel}>
            {t('form.checkboxLabel')}
            <input name='approve' type='checkbox' required />
            <div className={styles.customCheckbox} />
          </label>
          <Button submit colored text={t('buttons.requestCallback')} />
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
      <Image
        width={620}
        height={664}
        src='/images/formImage.png'
        alt='background with exosome'
      />
    </div>
  );
};

export default Form;
