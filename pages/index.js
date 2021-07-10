import React, {useState} from "react"
import {withAuthServerSideProps} from "../session/withAuth"
import {Button, Layout, Menu, Table} from 'antd'
import Image from "next/image"
import {BASE_API} from "../strapi/api";
import {applySession} from "next-iron-session";
import {options} from "../session";
import {Typography} from 'antd';
import {LogoutOutlined} from '@ant-design/icons';
import Link from 'next/link'
import MainLayout from "../components/MainLayout";

const {Title, Paragraph, Link: TypoLink} = Typography;

const {Header, Content, Footer, Sider} = Layout;

export default function Home({projects}) {
    const [project, setProject] = useState(projects[0])

    function handleMenuClick({key}) {
        const selected = projects.find(project => project._id === key)
        setProject(selected)
    }

    let columns = [
        {
            title: 'Лого',
            dataIndex: 'image',
            key: 'image',
            render: image => (<Image
                src={image[0].url}
                alt="Picture of the author"
                width={40}
                height={40}
            />),
            width: 60
        },
        {
            title: 'Куда',
            dataIndex: 'text',
            key: 'text',
            width: 300
        },
        {
            title: 'Ссылка',
            dataIndex: 'link',
            key: 'link',
            render: link => (<TypoLink href={link} target="_blank">Перейти</TypoLink>)
        }
    ];
    return (
        <MainLayout title="Главная">
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    style={{
                        height: '100vh',
                        borderRight: '1px solid rgb(168 183 230 / 15%)'
                    }}
                >
                    <div className="logo">
                        <Image
                            src="/images/logo_integrator.jpeg"
                            alt="Picture of the author"
                            width={500}
                            height={500}
                        />
                    </div>
                    <Menu theme="light"
                          mode="inline"
                          defaultSelectedKeys={[project._id]}
                          inlineCollapsed={false}
                          onSelect={handleMenuClick}>
                        {projects.map(project => (
                            <Menu.Item key={project._id}>
                                <img alt={project.name} width={40} height={40} style={{marginRight: 10}}
                                     src={project.image.url}/>
                                <span>{project.name}</span>
                            </Menu.Item>))}
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="site-layout-sub-header-background">
                        <Image
                            src="/images/logo.png"
                            alt="Logo"
                            width={200}
                            height={50}
                        />
                        <Link href="/logout">
                            <Button type="link" icon={<LogoutOutlined/>}>Выход</Button>
                        </Link>
                    </Header>
                    <Content style={{margin: '2px 1px 0'}}>
                        <div className="site-layout-background">
                            <Image
                                src={project.image.url}
                                alt="Logo"
                                width={100}
                                height={100}
                            />
                            <Title>{project.name}</Title>
                            <Paragraph>{project.description}</Paragraph>
                            <Table pagination={false} columns={columns} dataSource={project.links}
                                   style={{margin: '50px 0', width: 900}}/>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>TadoitLinker ©2021 Created by Tadoit</Footer>
                </Layout>
            </Layout>
        </MainLayout>
    )
}

async function getMainServerSideProps(
    {
        req, res
    }
) {
    await applySession(req, res, options)

    const token = req.session.get("token");

    const projectsRes = await BASE_API.getProjects(token)

    return {
        props: {
            projects: projectsRes.data
        }
    }
}

export const getServerSideProps = withAuthServerSideProps(getMainServerSideProps);