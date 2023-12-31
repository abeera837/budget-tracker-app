import { Form, Button, Input } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import "../Styles/FormSubmission.css";

const FormSubmission = () => {
    const history = useHistory(); // Create a history object

    const saveNewUser = (user) => {
        fetch("http://localhost:8001/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
        .then((response) => response.json())
        .then((savedUser) => {
            console.log("New user data:", savedUser);
            // Handle success, update state, show messages, etc.
        })
        .catch((error) => {
            console.error("Error adding new user:", error);
            // Handle error, show error messages, etc.
        });
    };
    
    const onFinish = (values) => {
        console.log("Received values of form: ", values);
//TODO const { firstName, } = values;
        const newUser = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            budget: values.budget,
        };

        // Call the function to save the new user data
        saveNewUser(newUser);

        // Redirect to the sign-in page after registration
        history.push("/signin");
    };

    return (
        <div className="formSubmission">
            <Form
                autoComplete="off"
                labelCol={{ span: 15 }}
                wrapperCol={{ span: 30 }}
                onFinish={onFinish}
                onFinishFailed={(error) => {
                    console.log({ error });
                }}
            >
                <Form.Item
                    className="formItem"
                    name="firstName"
                    rules={[
                        {
                            required: true,
                            message: "Required Field",
                        },
                        { whitespace: true },
                        { min: 2 },
                    ]}
                    hasFeedback
                >
                    <div className="inputContainer">
                        <Input className="inputField" placeholder="First Name" />
                    </div>
                </Form.Item>

                <Form.Item
                    name="lastName"
                    rules={[
                        {
                            required: true,
                            message: "Required Field",
                        },
                        { whitespace: true },
                        { min: 3 },
                    ]}
                    hasFeedback
                >
                    <Input placeholder="Last Name*" />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Required Field",
                        },
                        { type: "email", message: "Please enter a valid email" },
                    ]}
                    hasFeedback
                >
                    <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Required Field",
                        },
                        { min: 3 },
                        {
                            validator: (_, value) =>
                                value
                                    ? Promise.resolve()
                                    : Promise.reject("Password does not match criteria."),
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="Password*" />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                        {
                            required: true,
                            message: "Required Field",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject("Passwords do not match");
                            },
                        }),
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="Confirm your password" />
                </Form.Item>

                <Form.Item
                    name="budget"
                    rules={[
                        {
                            required: true,
                            message: "Required Field",
                        },
                        { whitespace: true },
                        { min: 1, message: "Please enter a valid budget" }, 
                    ]}
                    hasFeedback
                >
                    <Input placeholder="Budget*" />
                </Form.Item>


                <Form.Item wrapperCol={{ offset: 5, span: 14 }}>
                    <Button className="submitButton" block type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default FormSubmission;
