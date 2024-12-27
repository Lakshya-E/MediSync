import React from "react";
import { Button, Form, Input } from 'antd';
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/actions/authAction";

const Register = () => {
    const dispatch = useDispatch();

    const onFinish = (values) => {
        console.log('Success:', values);
        dispatch(registerUser(values))
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
        <h2>This is a signup page</h2>
        <Form
            name="basic"
            labelCol={{
            span: 8,
            }}
            wrapperCol={{
            span: 16,
            }}
            style={{
            maxWidth: 600,
            }}
            initialValues={{
            remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >

            <Form.Item
            label="Username"
            name="username"
            rules={[
                {
                required: false,
                message: 'Please input your First Name',
                },
            ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
            label="Email"
            name="email"
            rules={[
                {
                required: true,
                message: 'Please input your email!',
                },
            ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
            label="Password"
            name="password"
            rules={[
                {
                required: true,
                message: 'Please input your password!',
                },
            ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
            label="Confirm Password"
            name="confirm_password"
            rules={[
                {
                required: true,
                message: 'Please input your password!',
                },
            ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
            >
                <Button type="primary" htmlType="submit">
                    SignUp
                </Button>
            </Form.Item>
        </Form>
        </>
    )
}

export default Register
