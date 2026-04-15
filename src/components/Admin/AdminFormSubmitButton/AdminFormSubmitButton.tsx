import { FC } from 'react';
import styles from './AdminFormSubmitButton.module.scss';
import { motion } from 'motion/react';
import Image from 'next/image';

interface Props {
  isSubmitting: boolean;
  isEditing: boolean;
}

const AdminFormSubmitButton: FC<Props> = ({ isSubmitting, isEditing }) => {
  return (
    <motion.button
      type="submit"
      disabled={isSubmitting}
      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
      className={`${styles.submitBtn} ${isSubmitting && styles.submitBtnDisabled}`}
    >
      {isSubmitting ? (
        <>
          <div className={styles.spinner} />
          <span>Sending...</span>
        </>
      ) : (
        <>
          <span>{isEditing ? 'Update' : 'Send'}</span>
          <Image
            src="/images/icons/submitAdminPage.svg"
            width={16}
            height={16}
            alt="admin arrow right"
            className={styles.submitIcon}
          />
        </>
      )}
    </motion.button>
  );
};

export default AdminFormSubmitButton;
