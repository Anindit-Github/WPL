import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRef } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  picture: Yup.mixed().required("Please upload your picture"),
  name: Yup.string().required("Name is required"),
  employeeId: Yup.string().required("Employee ID is required"),
  phone: Yup.string().required("Phone number is required"),
});

const UserDetails = () => {
  const initialValues = {
    picture: "",
    name: "",
    employeeId: "",
    phone: "",
  };
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    // Perform submission logic here
  };

  return (
    <div className="flex w-full h-full justify-center">
      <div className="flex w-full h-full md:w-2/3 justify-content rounded-xl border shadow-md drop-shadow-md flex-col">
        <h1 className="text-xl mx-auto my-10">User Details Form</h1>
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
                    <td className={`text-left ${
                        touched.employeeId && errors.employeeId
                          ? "align-top"
                          : "align-middle"
                      }`}>
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
                    <td className={`text-left ${
                        touched.phone && errors.phone
                          ? "align-top"
                          : "align-middle"
                      }`}>
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
                <div className="flex items-center">
                <div
                    className={`w-36 h-36 rounded-full border-[1px] border-dashed flex justify-center items-center ${
                      touched.picture && errors.picture
                        ? 'border-red-500'
                        : 'border-indigo-600 cursor-pointer'
                    }`}
                    onClick = {handleUploadClick}
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
                        console.log(event.currentTarget.files[0], values.picture, "HEYY");
                      setFieldValue("picture", event.currentTarget.files[0]);
                    }}
                    className="hidden"
                  />
                  {touched.picture && errors.picture && (
                    <div className="error">{errors.picture}</div>
                  )}
                </div>
              </div>

              <button type="submit" className="w-32 bg-sky-500 p-2 rounded-md">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UserDetails;
