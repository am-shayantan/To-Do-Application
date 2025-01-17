import React, { useCallback, useState } from 'react';
import { 
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBListGroup,
    MDBListGroupItem,
    MDBCheckbox,
    MDBTooltip,
    MDBIcon
} from 'mdb-react-ui-kit';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { deleteTodo, editTodo, togglePending } from './redux/features/todoSlice';
import { useFormik } from 'formik';
import { EditTodoSchema } from './schemas';
import toast from 'react-hot-toast';

const TodoCard = ({ id, title, description, pending }) => {
    const dispatch = useDispatch();

    const checkboxClickHandler = useCallback(() => {
        dispatch(togglePending({ id }));
    }, [dispatch, togglePending]);
    
    const deleteTodoHandler = useCallback(() => {
        dispatch(deleteTodo({ id }));
        toast.success('To-Do Deleted');
    }, [dispatch, deleteTodo]);

    const [centredModal, setCentredModal] = useState(false);
  
    const toggleOpen = () => setCentredModal(!centredModal);

  return (
    <>
        <hr className="my-4" />
        <MDBListGroup horizontal className="rounded-0 bg-transparent">
        <MDBListGroupItem className="d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
        <MDBCheckbox
            name="flexCheck"
            checked={!pending}
            onChange={checkboxClickHandler}
            id="flexCheckChecked"
            // defaultChecked
        />
        </MDBListGroupItem>
        <MDBListGroupItem className="px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
        {" "}
        <div>
            <h6 className="lead fw-normal mb-0">
                {title}
            </h6>
            <br />
            <p className='fw-normal mb-0'>{description}</p>
        </div>
        </MDBListGroupItem>
        <MDBListGroupItem className="ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
        <div className="d-flex flex-row justify-content-end mb-1">
            <MDBTooltip
            tag="a"
            wrapperProps={{ href: "#!" }}
            title="Edit description"
            >
            <MDBIcon
                fas
                icon="pencil-alt"
                className="me-3"
                color="info"
                onClick={() => setCentredModal(true)}
            />
            </MDBTooltip>
            <MDBTooltip
            tag="a"
            wrapperProps={{ href: "#!" }}
            title="Delete todo"
            >
            <MDBIcon 
                fas 
                icon="trash-alt" 
                color="danger"
                onClick={deleteTodoHandler}
            />
            </MDBTooltip>
        </div>
        <div className="text-end text-muted">
            <MDBTooltip
            tag="a"
            wrapperProps={{ href: "#!" }}
            title="Created date"
            >
            <p className="small text-muted mb-0">
                <MDBIcon fas icon="info-circle" className="me-2" />
                {format(Number(id), "do MMM yyyy")}
            </p>
            </MDBTooltip>
        </div>
        </MDBListGroupItem>
        </MDBListGroup>
        <EditModal 
            centredModal={centredModal}
            setCentredModal={setCentredModal}
            toggleOpen={toggleOpen}
            id={id}
            title={title}
            description={description}
        />
    </>
  )
}

export default TodoCard

const EditModal = ({ centredModal, setCentredModal, toggleOpen, id, title, description }) => {

  const dispatch = useDispatch()

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: { id, title, description },
    validationSchema: EditTodoSchema,
    onSubmit: () => {
      dispatch(editTodo(values));
      setCentredModal(false);
      toast.success('To-Do Edited');
    }
  })
  
    return (
      <>  
        <MDBModal tabIndex='-1' open={centredModal} onClose={() => setCentredModal(false)}>
          <MDBModalDialog centered>
            <MDBModalContent>
              <form autoComplete='off' onSubmit={handleSubmit}>
                <MDBModalHeader>
                  <MDBModalTitle>Edit To-Do</MDBModalTitle>
                  <MDBBtn type='button' className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                  <input 
                    className='form-control'
                    name='title'
                    value={values.title}
                    onChange={handleChange}
                  />
                  {errors.title && <p className="text-danger px-1">{errors.title}</p>}
                  <textarea 
                    className='form-control'
                    name='description'
                    value={values.description}
                    onChange={handleChange}
                  />
                </MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn type='button' color='secondary' onClick={() => setCentredModal(false)}>
                    Close
                  </MDBBtn>
                  <MDBBtn type='submit'>Save changes</MDBBtn>
                </MDBModalFooter>
              </form>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </>
    );

}