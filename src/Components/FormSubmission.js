import { Form, Button, Input} from "antd";
import React from "react";


const FormSubmission = () => {

  return (

    <div className="formSubmission">
        <Form
          autoComplete="off"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 10 }}
          onFinish={(values) => {
            console.log({ values });
          }}
          onFinishFailed={(error) => {
            console.log({ error });
          }}
        >
          <Form.Item
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
            <Input placeholder="First Name*" />
          </Form.Item>

          <Form.Item
            name="lastName"
            
            rules={[
              {
                required: true,
                message:"Required Field",
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
              { min: 6 },
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
                  if (!value || getFieldValue("password") === value) {    /* see if passwords match */
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "Try again"
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Confirm your password" />
          </Form.Item>

          <Form.Item
            name="budgetLimit"
            
            rules={[
              {
                required: true,
                message: "Required Field",
              },
              { whitespace: true },
              { min: 1 },
            ]}
            hasFeedback
          >
            <Input placeholder="Budget Limit*" />
          </Form.Item>



          <Form.Item wrapperCol={{ span: 5 }}>
            <Button block type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
    </div>

    );
  }

 
export default FormSubmission;