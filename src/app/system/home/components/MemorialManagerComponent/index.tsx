import { Button, Card, Col, Row, message } from 'antd'
import React, { useState } from 'react'
import "./style.css"
import { Flex, Input } from 'antd';
import useSWR from 'swr';
import { get, post } from '@/request';
import { IHome } from '@/models/home';

const { TextArea } = Input;
export default function MemorialManagerComponent() {
    const { data: homeInfo, error, isLoading, mutate } = useSWR<{ data: IHome }>("/api/home", get)
    const [messageApi, contextHolder] = message.useMessage();
    const [newIntroduction, setNewIntroduction] = useState(homeInfo?.data.introduction)
    const [newNotice, setNewNotice] = useState(homeInfo?.data.notice)

    const [newTimeDetail, setNewTimeDetail] = useState(homeInfo?.data.timeDetail)

    const [newPhone, setNewPhone] = useState(homeInfo?.data.phone)

    const onChangeIntroduction: React.ChangeEventHandler<HTMLTextAreaElement> | undefined = (e) => {
        setNewIntroduction(e.target.value)
    }
    const onChangeNotice: React.ChangeEventHandler<HTMLTextAreaElement> | undefined = (e) => {
        setNewNotice(e.target.value)
    }
    const onChangeTimeDetail: React.ChangeEventHandler<HTMLTextAreaElement> | undefined = (e) => {
        setNewTimeDetail(e.target.value)
    }
    const onChangePhone: React.ChangeEventHandler<HTMLTextAreaElement> | undefined = (e) => {
        setNewPhone(e.target.value)
    }

    const onSubmit = async () => {
        const response = await post("/api/home", {
            introduction: newIntroduction,
            notice: newNotice,
            timeDetail: newTimeDetail,
            phone: newPhone
        })

        if (response.success) {
            messageApi.success('修改成功');
        } else {
            messageApi.error('修改失败');
        }
    }
    return (
        <div className='container'>
            {contextHolder}
            <Row gutter={20} >
                <Col span={10} className='itemContainer'>
                    <Card title="编辑三五九旅纪念馆基本简介" bordered={false}>
                        <TextArea
                            showCount
                            onChange={onChangeIntroduction}
                            placeholder="请输入三五九旅纪念馆基本简介"
                            defaultValue={homeInfo?.data.introduction}
                            style={{ height: 120, resize: 'none' }}
                        />
                        <div style={{ display: "flex", justifyContent: "flex-end", margin: '30px 0 0 0' }}>
                            <Button onClick={onSubmit} >提交</Button>
                        </div>

                    </Card>
                </Col>
                <Col span={10} className='itemContainer'>
                    <Card title="编辑通知公告" bordered={false}>
                        <TextArea
                            showCount
                            defaultValue={homeInfo?.data.notice}
                            onChange={onChangeNotice}
                            placeholder="请输入通知公告"
                            style={{ height: 120, resize: 'none' }}
                        />

                        <div style={{ display: "flex", justifyContent: "flex-end", margin: '30px 0 0 0' }}>
                            <Button onClick={onSubmit}>提交</Button>
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col span={10} className='itemContainer'>
                    <Card title="编辑开闭馆时间详情" bordered={false}>
                        <TextArea
                            showCount
                            defaultValue={homeInfo?.data.timeDetail}
                            onChange={onChangeTimeDetail}
                            placeholder="请输入开闭馆时间详情"
                            style={{ height: 120, resize: 'none' }}
                        />
                        <div style={{ display: "flex", justifyContent: "flex-end", margin: '30px 0 0 0' }}>
                            <Button onClick={onSubmit}>提交</Button>
                        </div>
                    </Card>
                </Col>
                <Col span={10} className='itemContainer'>
                    <Card title="编辑联系电话" bordered={false}>
                        <TextArea
                            showCount
                            defaultValue={homeInfo?.data.phone}
                            onChange={onChangePhone}
                            placeholder="请输入联系电话"
                            style={{ height: 120, resize: 'none' }}
                        />
                        <div style={{ display: "flex", justifyContent: "flex-end", margin: '30px 0 0 0' }}>
                            <Button onClick={onSubmit}>提交</Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
