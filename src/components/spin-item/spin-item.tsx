import classes from './spin-item.module.scss'
import { Spin } from 'antd'

function SpinItem() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.loading}>Подождите, идет загрузка...</div>
      <Spin size="large" />
    </div>
  )
}

export default SpinItem
