import React, { useEffect } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  // MDBSelect,
} from "mdb-react-ui-kit";
import TodoCard from "./TodoCard";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "./redux/features/todoSlice";
import { useFormik } from "formik";
import { AddTodoSchema } from "./schemas";
import toast from "react-hot-toast";

export default function App() {

  const todos = useSelector(state => state.todo.value);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])

  const dispatch = useDispatch();

  const { values, handleChange, handleSubmit, errors, setFieldValue } = useFormik({
    initialValues: {
      title: '',
      description: ''
    },
    validationSchema: AddTodoSchema,
    onSubmit: () => {
      dispatch(addTodo({
        title: values.title,
        description: values.description || ''
      }))
      setFieldValue('title', '');
      setFieldValue('description', '');
      toast.success('To-Do Added');
    }
  })

  return (
    <MDBContainer className="py-5">
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol>
          <MDBCard
            id="list1"
            style={{ borderRadius: ".75rem", backgroundColor: "#eff1f2" }}
          >
            <MDBCardBody className="py-4 px-4 px-md-5">
              <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                <MDBIcon fas icon="check-square" className="me-1" />
                <u>My Todo-s</u>
              </p>
              <div className="pb-2">
                <MDBCard>
                  <MDBCardBody>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                      <div className=" align-items-center">
                        <input
                          value={values.title}
                          onChange={handleChange}
                          name="title"
                          type="text"
                          className="form-control form-control-lg"
                          id="exampleFormControlInput1"
                          placeholder="Add Title..."
                        />
                        {errors.title && <p className="text-danger px-1">{errors.title}</p>}
                      </div>
                      <textarea 
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                        placeholder="Add Description"
                      />                
                      <div className="p-2">
                        <MDBBtn type="submit">Add</MDBBtn>
                      </div>      
                    </form>
                  </MDBCardBody>
                </MDBCard>
              </div>

            {/* Array of Todos */}
            {
              todos.map((each, i) => {
                return <TodoCard 
                  key={each.id}
                  id={each.id}
                  title={each.title}
                  description={each.description}
                  pending={each.pending}
                />
              })
            }

            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}