import "./App.css";
import MaterialTable from "material-table";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState([]);

  let columns = [
    {
      title: "Name",
      field: "name",
      validate: (rowData) =>
        rowData.name === ""
          ? { isValid: false, helperText: "Name cannot be empty" }
          : true,
    },
    {
      title: "Username",
      field: "username",
      validate: (rowData) =>
        rowData.username === ""
          ? { isValid: false, helperText: "Username cannot be empty" }
          : true,
    },
    {
      title: "Email",
      field: "email",
      validate: (rowData) =>
        rowData.email === ""
          ? { isValid: false, helperText: "Email cannot be empty" }
          : true,
    },

    {
      title: "Phone",
      field: "phone",
      validate: (rowData) =>
        rowData.phone === ""
          ? { isValid: false, helperText: "Phone cannot be empty" }
          : true,
    },
    {
      title: "Website",
      field: "website",
      validate: (rowData) =>
        rowData.website === ""
          ? { isValid: false, helperText: "Website cannot be empty" }
          : true,
    },
  ];

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
      const users = res.data;
      setUser(users);
    });
  }, []);

  const rowAdd = async (newData, resolve) => {
    try {
      const { data } = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        newData
      );
      setUser([...user, data]);
      resolve();
    } catch (error) {
      console.log(error);
    }
  };

  const rowUpdate = async (newData, oldData, resolve) => {
    try {
      const { data } = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${newData.id}`,
        newData
      );
      const updateUser = [...user];
      // updating row data using the index of oldData
      updateUser[oldData.tableData.id] = newData;
      setUser([...updateUser]);
      resolve();
    } catch (error) {
      console.log(error);
    }
  };

  const rowDelete = async (oldData, resolve) => {
    try {
      const { data } = await axios.delete(
        `https://jsonplaceholder.typicode.com/users/${oldData.id}`
      );
      const deleteUser = [...user];
      // deleting on user from the array
      deleteUser.splice(oldData.tableData.id, 1);
      setUser([...deleteUser]);
      resolve();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <MaterialTable
      className="table"
        title="User Details"
        columns={columns}
        data={user}
        options={{
          actionsColumnIndex: -1,
          addRowPosition: "first",
          showFirstLastPageButtons: false,
          exportButton: true,
          exportAllData: true,
        }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              rowUpdate(newData, oldData, resolve);
            }),
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              rowAdd(newData, resolve);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              rowDelete(oldData, resolve);
            }),
        }}
      />
    </div>
  );
}

export default App;
