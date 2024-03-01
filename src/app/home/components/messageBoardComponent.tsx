import { Avatar, Button, Textarea } from '@nextui-org/react'

import React, { useEffect, useState } from 'react'
import "../style.css"
import { List, message } from 'antd';
import { post, get } from '@/request';
import { useGlobalContext } from '../MyGlobalContext';
import { IMessage } from '@/models/message';
import useSWR from 'swr';


export default function MessageBoardComponent() {
  const [value, setValue] = useState('')
  const [messageApi, contextHolder] = message.useMessage();
  const { userData, login } = useGlobalContext()

  const { data: messageList, error, isLoading, mutate } = useSWR<{
    data: IMessage[]
  }>("/api/message/getMessageList", get)


  const onclickSubmit = () => {

    if (!userData?.token) {
      login()
      return
    }

    if (value.length !== 0) {
      post("api/message/editMessage", {
        content: value,
        userName: userData?.username
      })
      messageApi.success('提交成功')
      mutate()
    } else {
      messageApi.error('请填写你的留言')
    }
  }
  return (
    <div className='messageContainer'>
      {contextHolder}
      <div className='textAreaContainer'>
        <Textarea
          isRequired
          label="请填写你的留言"
          labelPlacement="outside"
          placeholder="请输入留言内容"
          onValueChange={setValue}
        />
      </div>
      <div className='flex justify-end'>
        <Button onClick={onclickSubmit}>
          提交
        </Button>
      </div>

      <List
        loading={isLoading}
        className="dark"
        itemLayout="horizontal"
        dataSource={messageList?.data}
        renderItem={(item: IMessage, index) => (
          <List.Item>
            <div className="flex gap-2 items-center">
              <Avatar name={item.username} className="flex-shrink-0" size="sm" />
              <div className="flex flex-col">
                <span className="text-small" style={{ color: "white" }}>{item.username}</span>
                <span className="text-tiny text-default-400">{item.content}</span>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  )
}
