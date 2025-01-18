import React, { useCallback } from 'react';
import {
    MDBListGroup,
    MDBListGroupItem,
    MDBCheckbox,
    MDBTooltip,
    MDBIcon
} from 'mdb-react-ui-kit';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { deleteTodo, togglePending } from './redux/features/todoSlice';
import toast from 'react-hot-toast';
import { openEditModal } from './redux/features/editModalSlice';

const TodoCard = ({ id, title, description, pending }) => {
    const dispatch = useDispatch();

    const checkboxClickHandler = useCallback(() => {
        dispatch(togglePending({ id }));
    }, [dispatch, togglePending]);
    
    const deleteTodoHandler = useCallback(() => {
        dispatch(deleteTodo({ id }));
        toast.success('To-Do Deleted');
    }, [dispatch, deleteTodo]);

    const editModalOpener = useCallback(() => {
      dispatch(openEditModal({ id, title, description }));
    }, [dispatch, id, title, description, openEditModal])

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
            title="Edit todo"
            >
            <MDBIcon
                fas
                icon="pencil-alt"
                className="me-3"
                color="info"
                onClick={editModalOpener}
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
    </>
  )
}

export default TodoCard