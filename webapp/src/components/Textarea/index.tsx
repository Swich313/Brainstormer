import type { FormikProps } from 'formik'
import cn from 'classnames'

import styles from './index.module.scss'

export const Textarea = ({ name, label, formik }: { name: string; label: string; formik: FormikProps<any> }) => {
  const value = formik.values[name]
  const error = formik.errors[name] as string | undefined
  const touched = formik.touched[name]
  const invalid = !!touched && !!error
  const disabled = formik.isSubmitting

  return (
    <div className={cn({ [styles.field]: true, [styles.disabled]: disabled })}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <textarea
        className={cn({ [styles.input]: true, [styles.invalid]: invalid })}
        onChange={(e) => {
          formik.setFieldValue(name, e.target.value)
        }}
        onBlur={() => {
          formik.setFieldTouched(name, true)
        }}
        value={value}
        name={name}
        id={name}
        disabled={disabled}
      />
      {invalid && <div className={styles.error}>{error}</div>}
    </div>
  )
}
