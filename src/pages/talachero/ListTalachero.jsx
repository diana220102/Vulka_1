import { DataGrid } from '@mui/x-data-grid';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from "../../components/sidebar/Sidebar";
import { db } from '../../firebase';
import "./list.scss";

const List = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        // LISTEN (REALTIME)
        const unsub = onSnapshot(
            collection(db, "talacheros"),
            (snapShot) => {
                let list = [];
                snapShot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                setData(list);
            },
            (error) => {
                console.log(error);
            }
        );

        return () => {
            unsub();
        };
    }, []);

    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        {
            field: "name",
            headerName: "name",
            width: 230,
        },
        {
            field: "phone",
            headerName: "Phone",
            width: 230,
        },

        {
            field: "address",
            headerName: "Address",
            width: 100,
        },
    ];

    const handleDelete = async (id) => {
        try {
          await deleteDoc(doc(db, "talacheros", id));
          setData(data.filter((item) => item.id !== id));
        } catch (err) {
          console.log(err);
        }
      };

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to="/users/test" style={{ textDecoration: "none" }}>
                            <div className="viewButton">View</div>
                        </Link>
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row.id)}
                        >
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <div className="datatable">
                    <div className="datatableTitle">
                        Add New Talachero
                        <Link to="/talacheros/new" className="link">
                            Add New
                        </Link>
                    </div>
                    <DataGrid
                        rows={data}
                        columns={columns.concat(actionColumn)}
                        className="datagrid"
                        pageSize={25}
                        rowsPerPageOptions={[25]}
                    />
                </div>
            </div>
        </div>
    );
}

export default List