import { List, message } from "antd";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../MyGlobalContext";
import { IAppraisal } from "@/models/appraisal";
import { get, post } from "@/request";
import { Avatar, Button, Textarea } from "@nextui-org/react";
import "../style.css"
export default function AppraisalComponent() {
  const [value, setValue] = useState('')
  const [messageApi, contextHolder] = message.useMessage();
  const { userData, login } = useGlobalContext()

  const [appraisalList, setAppraisalList] = useState<IAppraisal[]>([])
  useEffect(() => {
    getMessageListData()
  }, [])

  const getMessageListData = async () => {


    const response = await get<IAppraisal[]>("api/appraisal/getAppraisalList")

    if (response.success && response.data) {
      setAppraisalList(response.data)
    }

  }
  const onclickSubmit = () => {

    if (!userData?.token) {
      login()
      return
    }

    if (value.length !== 0) {
      post("api/appraisal/editAppraisal", {
        content: value,
        userName: userData?.userName
      })
      messageApi.success('提交成功')
      setAppraisalList(pre => {
        return [{ content: value, userName: userData?.userName ?? '' }, ...pre]
      })
    } else {
      messageApi.error('请填写你的留言')
    }
  }

  return (
    <div className='appraisalContainer'>
      {contextHolder}
      <div className='textAreaContainer'>
        <Textarea
          isRequired
          label="请填写你的观后评价"
          labelPlacement="outside"
          placeholder="请输入你的观后评价"
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
        dataSource={appraisalList}
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
