# React + Vite
MDB, Redux, React Hot Toast, Formik, Yup

# Get the project up and running
Clone the repository, run "npm install" to install the dependencies
run "npm run dev" to start the project

# Redux Flow
The store is stored in the file src/redux/store.js
The slices are stored in the folder src/redux/features
The actions and reducers are exported from the file src/redux/features/todoSlice.jsx,
the store imports the reducers and the actions are imported wherever needed.

The state is pulled using the useSelector hook from react-redux,
and the actions are dispatched using the useDispatch hook from the same library
