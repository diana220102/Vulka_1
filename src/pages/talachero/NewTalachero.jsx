import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import { db } from "../../firebase";
import "./new.scss";

const NewTalachero = ({ inputs, title }) => {

  const [data, setData] = useState({});
  const navigate = useNavigate()


  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "talacheros"), data);
      navigate(-1)
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>Nuevo Talachero</h1>
        </div>
        <div className="bottom">
          <div className="left">
          </div>
          <div className="right">
            <form  onSubmit={handleAdd}>
              <div className="formInput">
                <label>Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Nombre"
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label>Phone</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Telefono"
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label>Address</label>
                <input
                  id="address"
                  type="text"
                  placeholder="Address"
                  onChange={handleInput}
                />
              </div>
              <button type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTalachero;
