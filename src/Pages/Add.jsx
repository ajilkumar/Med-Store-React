import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../Context/userContext';

function Add() {
  const {isLoggedIn} = useContext(UserContext)
  const [medicineData, setMedicineData] = useState({
    name:'',
    company: '',
    expiry_date: ''
  })
  const navigate = useNavigate()
  
  const token = isLoggedIn

  useEffect(() => {
    if (!token){
      navigate('/')
    } else{
      handleSubmit()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, navigate])

  const handleSubmit = async(event) => {
    event.preventDefault()
    console.log(medicineData);
    try{
      const res = await axios.post('https://medicalstore.mashupstack.com/api/medicine', medicineData,{
        headers: { Authorization: `Bearer ${isLoggedIn}`},
      })
      console.log(res.data);
      if (res.status === 200) {
        navigate("/home");
        console.log('Medicine added successfully!');
      }
    } catch (err) {
       console.log(err.message);
    }
    
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="w-50 border bg-white shadow p-5 rounded">
        <h1 className='text-center mb-4'>Add Medicine</h1>
        <form className="d-flex flex-column" onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="text" name="name" className="form-control" placeholder="Medicine Name" onChange={e => setMedicineData({...medicineData, name: e.target.value})} />
          </div>
          <div className="mb-3">
            <input type="text" name="company" className="form-control" placeholder="Company Name" onChange={e => setMedicineData({...medicineData, company: e.target.value})}/>
          </div>
          <div className="mb-3">
            <input type="date" name="expiry_date" className="form-control" placeholder="Expiry Date" onChange={e => setMedicineData({...medicineData, expiry_date: e.target.value})}/>
          </div>
          <div className="d-flex justify-content-between">
            <button className="btn btn-success">Submit</button>
            <Link to='/home' className='btn btn-primary'>Back</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Add;
