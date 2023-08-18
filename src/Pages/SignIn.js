import { Form, Button, Input, message } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../Styles/SignIn.css";

const SignIn = () => {
    const history = useHistory();

    const onFinish = async (values) => {
        console.log("Received values of form: ", values);

        try {
            // Fetch user data from the server
            const response = await fetch("http://localhost:8001/users");
            const users = await response.json();

            // Find a match in the user data
            const match = users.find(
                (user) => user.email === values.email && user.password === values.password
            );

            if (match) {
                history.push("/dashboard");
            } else {
                if (!users.some((user) => user.email === values.email)) {
                    message.error("Email does not exist");
                } else {
                    message.error("Incorrect Password");
                }
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            message.error("An error occurred during login. Please try again later.");
        }
    };

    return (
        <div className="signIn-container">
            <div className="signIn">
                <h2>Sign In</h2>
                <Form name="normal_login" className="login-form" onFinish={onFinish}>
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
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            size="large"
                            block
                        >
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default SignIn;
