import { Button, Card, CardBody } from '@nextui-org/react'
import { DatePicker, DatePickerProps, message } from 'antd'
import React, { useState } from 'react'
import type { Dayjs } from 'dayjs';
import "../style.css";
import 'dayjs/locale/zh-cn';
import { useGlobalContext } from '../MyGlobalContext';
import { post } from '@/request';


export default function ReserveComponent() {
  const [messageApi, contextHolder] = message.useMessage();
  const { userData, login } = useGlobalContext()
  const [dateString, setDataString] = useState<string>("")
  const onChange: DatePickerProps<Dayjs[]>['onChange'] = (date, dateString) => {

    setDataString(dateString as string)
  };

  const onclickSubmit = async () => {
    if (!userData?.token) {
      login()
      return
    }

    if (dateString.length !== 0) {
      const response = await post("api/reserve/editReserve", {
        dateString,
        username: userData.username
      })

      if (response.success) {
        messageApi.success('提交成功')
      } else {
        messageApi.success('提交失败')
      }

    } else {
      messageApi.error('请选择预约日期')
    }


  }
  return (
    <div className='reserveContainer'>
      {contextHolder}
      <Card className='selectDateContainer'>
        <CardBody>
          <p>请选择您的预约日期</p>
        </CardBody>
      </Card> <DatePicker onChange={onChange} showTime needConfirm={false} />

      <div className='flex justify-start btnContainer'>
        <Button onClick={onclickSubmit}>
          提交
        </Button>
      </div></div>
  )
}
