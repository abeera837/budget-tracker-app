import { Form, Button, Input } from "antd";
import React from "react";

const SignIn = () => {
    const onFinish = (values) => {
        console.log("Received values of form: ", values);
    };

    return (
        <div className="signIn-container">
            <div className="signIn">
                <h2>Sign In</h2>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your email!",
                        },
                        {
                            type: "email",
                            message: "Please enter a valid email!",
                        },
                    ]}
                >
                    <Input size="large" placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your password!",
                        },
                    ]}
                >
                    <Input.Password size="large" placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" size="large" block>
                        Sign In
                    </Button>
                </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default SignIn;
