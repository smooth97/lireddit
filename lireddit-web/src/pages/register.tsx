import * as React from "react";
import { Formik, Form } from "formik";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={(values) => {
        console.log("values", values);
      }}
    >
      {() => (
        <Form>
          <div>hello</div>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
