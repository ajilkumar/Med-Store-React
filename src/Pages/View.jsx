import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Context/userContext";

function View() {

  const [medicineData, setMedicineData] = useState({
    name: "",
    company: "",
    expiry_date: "",
  });
  const { medicineId } = useParams();
  const { isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate()

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


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="w-50 border bg-white shadow p-5 rounded">
        <h1 className="text-center mb-4">View Medicine Details</h1>
        <form className="d-flex flex-column">
          <div className="mb-3">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Medicine Name"
              value={medicineData.name}
              readOnly
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="company"
              className="form-control"
              placeholder="Company Name"
              value={medicineData.company}
              readOnly
            />
          </div>
          <div className="mb-3">
            <input
              type="date"
              name="expiry_date"
              className="form-control"
              placeholder="Expiry Date"
              value={medicineData.expiry_date}
              readOnly
            />
          </div>
          <div className="d-flex justify-content-center">
            <Link to="/home" className="btn btn-primary">
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default View