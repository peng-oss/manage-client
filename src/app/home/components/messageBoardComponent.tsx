import { Avatar, Button, Textarea } from '@nextui-org/react'

import React, { useEffect, useState } from 'react'
import "../style.css"
import { List, message } from 'antd';
import { post, get } from '@/request';
import { useGlobalContext } from '../MyGlobalContext';
import { IMessage } from '@/models/message';


export default function MessageBoardComponent() {
  const [value, setValue] = useState('')
  const [messageApi, contextHolder] = message.useMessage();
  const { userData, login } = useGlobalContext()

  const [messageList, setMessageList] = useState<IMessage[]>([])



  useEffect(() => {
    getMessageListData()
  }, [])

  const getMessageListData = async () => {


    const response = await get<IMessage[]>("api/message/getMessageList")

    if (response.success && response.data) {
      setMessageList(response.data)
    }

  }

  const onclickSubmit = () => {

    if (!userData?.token) {
      login()
      return
    }

    if (value.length !== 0) {
      post("api/message/editMessage", {
        content: value,
        userName: userData?.userName
      })
      messageApi.success('提交成功')
      setMessageList(pre => {
        return [{ content: value, userName: userData?.userName ?? '' }, ...pre]
      })
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
        className="dark"
        itemLayout="horizontal"
        dataSource={messageList}
        renderItem={(item, index) => (
          <List.Item>
            <div className="flex gap-2 items-center">
              <Avatar name={item.userName} className="flex-shrink-0" size="sm" />
              <div className="flex flex-col">
                <span className="text-small" style={{ color: "white" }}>{item.userName}</span>
                <span className="text-tiny text-default-400">{item.content}</span>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  )
}
