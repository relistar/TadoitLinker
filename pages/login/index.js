import React from "react"
import {Button, Form, Input} from "antd";
import {LockOutlined, MailOutlined} from "@ant-design/icons";
import {Api} from "../../strapi/api";
import {useRouter} from "next/router";
import {Layout} from 'antd';
import Image from 'next/image'
import MainLayout from "../../components/MainLayout";

const {Header, Content, Footer} = Layout;

export default function Login() {
    const router = useRouter();

    const onFinish = (values) => {
        Api.loginByCredentials(values).then(res => {
            router.push({pathname: "/auth", query: res.data})
        }).catch(res => {
            console.log(res)
        })
    }

    return (
        <MainLayout title="Вход">
            <Layout className={"page"}>
                <Layout>
                    <Header className="site-layout-sub-header-background">
                        <Image
                            src="/images/logo.png"
                            alt="Logo"
                            width={200}
                            height={50}
                        />
                    </Header>
                    <Content style={{margin: '2px 1px 0'}}>
                        <div className="site-layout-background">
                            <div>
                                <Form
                                    name="normal_login"
                                    className="login-form"
                                    onFinish={onFinish}
                                    size="large"
                                >
                                    <Form.Item
                                        name="identifier"
                                        rules={[
                                            {
                                                type: 'email',
                                                message: 'Email введен неверно',
                                            },
                                            {
                                                required: true,
                                                message: 'Введите Email',
                                            },
                                        ]}
                                    >
                                        <Input prefix={<MailOutlined className="site-form-item-icon"/>}
                                               placeholder="Email"/>
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Введите пароль'
                                            }
                                        ]}
                                    >
                                        <Input
                                            prefix={<LockOutlined className="site-form-item-icon"/>}
                                            type="password"
                                            placeholder="Пароль"
                                        />
                                    </Form.Item>

                                    <Form.Item>
                                        <div className="button">
                                            <Button type="primary" htmlType="submit" className="login-form-button">
                                                Войти
                                            </Button>
                                        </div>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>TadoitLinker ©2021 Created by Tadoit</Footer>
                </Layout>
            </Layout>
        </MainLayout>
    )
}
