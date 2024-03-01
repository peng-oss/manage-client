import { IHome } from '@/models/home'
import { Card, CardBody, CardHeader, Divider, Image } from '@nextui-org/react'
import React, { useState } from 'react'
import "../style.css"
import { Affix, Alert, Button } from 'antd'
import Marquee from 'react-fast-marquee';
import moment from 'moment'

interface Props {
    homeData?: IHome
}
export default function MainComponent(props: Props) {
    const { homeData } = props
    const [bottom, setBottom] = useState<number>(100);
    return (
        <div className='mainContainer'>
            <div className='marqueeContainer'>
                {/* 公告 */}
                <Alert
                    banner
                    message={
                        <Marquee pauseOnHover gradient={false}>
                            {homeData?.notice}
                        </Marquee>
                    }
                />
            </div>

            <div className='timeContainer'>
                <Card className='leftTimeContainer'>
                    <CardHeader className="flex gap-3">

                        <div className="flex flex-col">
                            <p className="text-md">当前时间</p>

                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <p className="text-md">{moment().locale('zh-cn').format('YYYY-MM-DD HH:mm:ss')}</p>
                    </CardBody>


                </Card>
                <Card className='rightTimeContainer' >
                    <CardHeader className="flex gap-3">

                        <div className="flex flex-col">
                            <p className="text-md">开放时间</p>

                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <p className="text-md">{homeData?.timeDetail}</p>
                    </CardBody>


                </Card>
            </div>
            {/* 基本简介 */}
            <Card >
                <CardHeader className="flex gap-3">

                    <div className="flex flex-col">
                        <p className="text-md">三五九旅纪念馆基本介绍</p>
                        <p className="text-small text-default-500">简介</p>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <p>{homeData?.introduction}</p>
                </CardBody>


            </Card>

        </div>
    )
}
