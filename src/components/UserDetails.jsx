import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import Bowler from "../Images/Bowler.png";
import Spinner from "../Images/Spinner.png";
import Fast from "../Images/Fast.png";

const validationSchema = Yup.object().shape({
  picture: Yup.mixed().required("Please upload your picture"),
  name: Yup.string().required("Name is required"),
  employeeId: Yup.string().required("Employee ID is required"),
  phone: Yup.string().required("Phone number is required"),
  email: Yup.string().required("Wipro Mail Id is required"),
  radioButtonValue: Yup.string().required("Select at least one skill"),
});

const UserDetails = () => {
  const initialValues = {
    picture: "",
    name: "",
    employeeId: "",
    phone: "",
    radioButtonValue: "",
    email: "",
    skillLevel: "intermediate",
  };
  const fileInputRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (values, { resetForm }) => {
    fetch("http://127.0.0.1:5000/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        EmployeeID: values.employeeId,
        EmployeeName: values.name,
        MailID: values.email,
        PhoneNum: values.phone,
        Role: values.radioButtonValue,
        RoleLevel: values.skillLevel,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data?.error.includes("Duplicate entry")) {
          setErrorMessage(
            "YOU HAVE ALREADY BEEN REGISTERED."
          );
        }
        else if(data.msg) setSuccessMessage(data.msg.toUpperCase())
      })
      .catch((errorMessage) => {
        console.error(errorMessage);
      });
    resetForm();
  };

  return (
    <>
      <div className="flex w-full h-full justify-center">
        <div className="flex w-full min-h-[700px] md:w-2/3 rounded-xl border shadow-md drop-shadow-md flex-col">
          <h1 className="text-3xl mx-auto my-4">User Details Form</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ touched, errors, setFieldValue, values }) => (
              <Form>
                <div className="flex justify-around p-6">
                  <table className="border-spacing-y-2.5">
                    <tr className="p-2 h-12">
                      <td
                        className={`text-left ${
                          touched.name && errors.name
                            ? "align-top"
                            : "align-middle"
                        }`}
                      >
                        <label htmlFor="name">Name:</label>
                      </td>
                      <td className="text-right">
                        <div>
                          <Field
                            type="text"
                            id="name"
                            name="name"
                            className={`w-96 border-[1px] rounded-md ${
                              touched.name && errors.name
                                ? "border-red-500"
                                : "border-indigo-600"
                            }`}
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="error text-red-500"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr className="p-2 h-12">
                      <td
                        className={`text-left ${
                          touched.email && errors.email
                            ? "align-top"
                            : "align-middle"
                        }`}
                      >
                        <label htmlFor="email">Wipro Email:</label>
                      </td>
                      <td className="text-right">
                        <div>
                          <Field
                            type="text"
                            id="email"
                            name="email"
                            className={`w-96 border-[1px] rounded-md ${
                              touched.email && errors.email
                                ? "border-red-500"
                                : "border-indigo-600"
                            }`}
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="error text-red-500"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr className="p-2 h-12">
                      <td
                        className={`text-left ${
                          touched.employeeId && errors.employeeId
                            ? "align-top"
                            : "align-middle"
                        }`}
                      >
                        <label htmlFor="employeeId">Employee ID:</label>
                      </td>
                      <td className="text-right">
                        <div>
                          <Field
                            type="text"
                            id="employeeId"
                            name="employeeId"
                            className={`w-96 border-[1px] rounded-md ${
                              touched.employeeId && errors.employeeId
                                ? "border-red-500"
                                : "border-indigo-600"
                            }`}
                          />
                          <ErrorMessage
                            name="employeeId"
                            component="div"
                            className="error text-red-500"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr className="p-2 h-12">
                      <td
                        className={`text-left ${
                          touched.phone && errors.phone
                            ? "align-top"
                            : "align-middle"
                        }`}
                      >
                        <label htmlFor="phone">Mobile:</label>
                      </td>
                      <td className="text-right">
                        <div>
                          <Field
                            type="text"
                            id="phone"
                            name="phone"
                            className={`w-96 border-[1px] rounded-md ${
                              touched.phone && errors.phone
                                ? "border-red-500"
                                : "border-indigo-600"
                            }`}
                          />
                          <ErrorMessage
                            name="phone"
                            component="div"
                            className="error text-red-500"
                          />
                        </div>
                      </td>
                    </tr>
                  </table>
                  <div className="flex flex-col justify-center items-center">
                    <div
                      className={`w-36 h-36 rounded-full border-[1px] border-dashed flex justify-center items-center ${
                        touched.picture && errors.picture
                          ? "border-red-500"
                          : "border-indigo-600 cursor-pointer"
                      }`}
                      onClick={handleUploadClick}
                    >
                      {values.picture ? (
                        <img
                          src={URL.createObjectURL(values.picture)}
                          alt="Profile"
                          className="w-full h-full rounded-full object-contain"
                        />
                      ) : (
                        <span>Click to upload</span>
                      )}
                    </div>
                    <input
                      type="file"
                      id="picture"
                      name="picture"
                      ref={fileInputRef}
                      onChange={(event) => {
                        console.log(
                          event.currentTarget.files[0],
                          values.picture,
                          "HEYY"
                        );
                        setFieldValue("picture", event.currentTarget.files[0]);
                      }}
                      className="hidden"
                    />
                    {touched.picture && errors.picture && (
                      <div className="error text-red-500">{errors.picture}</div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between py-2 px-20">
                  <p className="py-2 h-12"> WHAT'S YOUR GIG ON THE FIELD ?</p>
                  <div className="w-36"></div>
                </div>
                <div>
                  <div className="flex space-evenly w-full justify-around p-6">
                    <label className="flex">
                      <Field
                        type="radio"
                        name="radioButtonValue"
                        value="Batsman"
                        className="mr-2"
                      />
                      <img
                        src={Bowler}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover"
                      />
                    </label>
                    <label className="flex">
                      <Field
                        type="radio"
                        name="radioButtonValue"
                        value="Fast Bowler"
                        className="mr-2"
                      />
                      <img
                        src={Fast}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover"
                      />
                    </label>
                    <label className="flex">
                      <Field
                        type="radio"
                        name="radioButtonValue"
                        value="Spin Bowler"
                        className="mr-2"
                      />
                      <img
                        src={Spinner}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover"
                      />
                    </label>
                  </div>
                  <ErrorMessage
                    name="radioButtonValue"
                    component="div"
                    className="error text-red-500 self-start"
                  />
                </div>
                <div className="flex justify-around p-4">
                  <table className="border-spacing-y-2.5">
                    <tr className="p-2 h-12">
                      <td>
                        <label htmlFor="skillLevel" className="mr-2">
                          Select Skill Level:
                        </label>
                      </td>
                      <td className="text-right">
                        <div>
                          <Field as="select" name="skillLevel" className="w-80">
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="master">Master</option>
                          </Field>
                        </div>
                      </td>
                    </tr>
                  </table>
                  <div className="w-36"></div>
                </div>

                <div className="flex w-full justify-center flex-col items-center">
                  <button
                    type="submit"
                    className="w-32 bg-sky-500 p-2 rounded-md mt-6"
                  >
                    Submit
                  </button>
                  {!Object.values(touched).some(Boolean) ? (
                    <p
                      className={
                        successMessage.length
                          ? "text-green-800 mt-2"
                          : "text-red-500 mt-2"
                      }
                    >
                      {successMessage.length
                        ? successMessage
                        : errorMessage.length
                        ? errorMessage
                        : ""}
                    </p>
                  ) : null}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="h-16 w-full"></div>
    </>
  );
};

export default UserDetails;
