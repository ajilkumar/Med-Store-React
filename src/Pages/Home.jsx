import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from "../Context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import DeleteModal from '../Components/DeleteModal';
import Navbar from '../Components/Navbar';

function Home() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMedicineId, setSelectedMedicineId] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext);

  const token = isLoggedIn;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isLoggedIn) {
          console.log("User not authenticated. Redirecting to login page...");
          navigate("/");
        } else {
          const response = await axios.get('https://medicalstore.mashupstack.com/api/medicine', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          setData(response.data);
          console.log(response.data);
          console.log(search);
        }
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, navigate, token]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://medicalstore.mashupstack.com/api/medicine/${selectedMedicineId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData(prevData => prevData.filter(medicine => medicine.id !== selectedMedicineId));
      console.log(`Medicine with ID ${selectedMedicineId} deleted successfully.`);
    } catch (error) {
      console.log("Error deleting medicine:", error);
    }
    setShowModal(false);
  };

  const handleShowModal = (id) => {
    setSelectedMedicineId(id);
    setShowModal(true);
  };

  const onSearch = async (e) => {
    let text = e.target.value;
    setSearch(text);
    try {
      const response = await axios.get(
        `https://medicalstore.mashupstack.com/api/medicine/search?keyword=${text}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.error("Error searching for medicine:", error);
    }
  };

  return (
    <>
    <Navbar />
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
      <h1 className="text-center">Medicines</h1>
      <div className="w-75 rounded bg-white border shadow p-4">
        <div className="d-flex justify-content-between mb-2">
          <div>
            <input
              type="search"
              className="form-control"
              placeholder="Search medicine"
              aria-label="Search medicine"
              aria-describedby="search-medicine"
              onChange={onSearch}
            />
          </div>
          <Link to={'/add'} className="btn btn-success">Add Medicine</Link>
        </div>
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          {data.length === 0 ? (
            <p className="text-center">No data found</p>
          ) : (
            <table className="table table-striped">
              <thead className="text-center">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Expiry Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {data.map((d, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{d.name}</td>
                    <td>{d.company}</td>
                    <td>{d.expiry_date}</td>
                    <td>
                      <Link to={`/view/${d.id}`} className='btn btn-sm btn-warning mx-2'>View</Link>
                      <Link to={`/update/${d.id}`} className='btn btn-sm btn-info mx-2'>Edit</Link>
                      <Button variant="danger" className='btn btn-sm btn-danger' onClick={() => handleShowModal(d.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <DeleteModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleDelete={handleDelete}
      />
    </div>
    </>
  );
}

export default Home;
