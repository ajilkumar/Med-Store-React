import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Context/userContext";


const Update = () => {
  const [medicineData, setMedicineData] = useState({
    name: "",
    company: "",
    expiry_date: "",
  });
  const { medicineId } = useParams();
  const { isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const token = isLoggedIn;

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      //console.log("Medicine ID:", medicineId);
      const getMedicineData = async () => {
        try {
          const response = await axios.get(
            `https://medicalstore.mashupstack.com/api/medicine/${medicineId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          //console.log("Fetched medicine data:", response.data);
          setMedicineData(response.data);
        } catch (err) {
          console.log(err);
        }
      };

      getMedicineData();
    }
  }, [medicineId, token, navigate]);

  const handleInputChange = (e) => {
    setMedicineData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(medicineData);
    try {
      const res = await axios.post(
        `https://medicalstore.mashupstack.com/api/medicine/${medicineId}`,
        medicineData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(res.data);
      if (res.status === 200) {
        navigate("/home");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="w-50 border bg-white shadow p-5 rounded">
        <h1 className="text-center mb-4">Update Medicine Details</h1>
        <form className="d-flex flex-column" onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Medicine Name"
              value={medicineData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="company"
              className="form-control"
              placeholder="Company Name"
              value={medicineData.company}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="date"
              name="expiry_date"
              className="form-control"
              placeholder="Expiry Date"
              value={medicineData.expiry_date}
              onChange={handleInputChange}
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
            <Link to="/home" className="btn btn-primary">
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Update;
