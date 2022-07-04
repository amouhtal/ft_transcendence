import { Code } from '@nextui-org/react'
import React from 'react'
import ErrorType from '../../components/AllError/ErrorType'
import style from '../../styles/ErrorPage/Error.module.css'

function ErrorPage() {
  return (
    <div className={style.Container}>
      <ErrorType />
    </div>
  )
}

export default ErrorPage





