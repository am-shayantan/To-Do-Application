import { useFormik } from 'formik';
import { 
    MDBBtn, 
    MDBModal, 
    MDBModalBody, 
    MDBModalContent, 
    MDBModalDialog, 
    MDBModalFooter, 
    MDBModalHeader, 
    MDBModalTitle 
} from 'mdb-react-ui-kit';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeEditModal } from './redux/features/editModalSlice';
import { EditTodoSchema } from './schemas';
import { editTodo } from './redux/features/todoSlice';
import toast from 'react-hot-toast';

const EditModal = () => {

    const dispatch = useDispatch()

    const editModal = useSelector((state) => state.editModal.value);
  
    const { values, errors, handleChange, handleSubmit, setFieldValue } = useFormik({
      initialValues: { 
        id: 0,
        title: '', 
        description: ''
    },
      validationSchema: EditTodoSchema,
      onSubmit: () => {
        dispatch(editTodo(values));
        dispatch(closeEditModal());
        toast.success('To-Do Edited');
      }
    })

    useEffect(() => {
        const { id, title, description } = editModal;

        setFieldValue('id', id || 0);
        setFieldValue('title', title || '');
        setFieldValue('description', description || '');
    }, [editModal, setFieldValue])
    
    return (
        <>  
          <MDBModal tabIndex='-1' open={editModal.id} onClose={() => dispatch(closeEditModal())}>
            <MDBModalDialog centered>
              <MDBModalContent>
                <form autoComplete='off' onSubmit={handleSubmit}>
                  <MDBModalHeader>
                    <MDBModalTitle>Edit To-Do</MDBModalTitle>
                    <MDBBtn type='button' className='btn-close' color='none' onClick={() => dispatch(closeEditModal())}></MDBBtn>
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
                    <MDBBtn type='button' color='secondary' onClick={() => dispatch(closeEditModal())}>
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

export default EditModal