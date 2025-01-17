import * as yup from 'yup';

export const AddTodoSchema = yup.object().shape({
    title: yup.string().required('Title is required!!'),
    description: yup.string()
});

export const EditTodoSchema = yup.object().shape({
    id: yup.number().required(),
    title: yup.string().required('Title is required!!'),
    description: yup.string()
})