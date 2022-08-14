import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';

function SelectDeveloper() {

const [selected, setSelected] = useState({});
const [developers, setDevelopers] = useState([]);

useEffect(() => {
  fetchDevelopers()
}, [])

const fetchDevelopers = async () => {
  const baseUrl = "http://localhost:3001"
  try {
    const response = await fetch(baseUrl + "/users/developers", {
      method: "GET",
      headers: { 
        "authorization": localStorage.getItem("MyToken"),
      }})
    if (response.status !== 200 && response.status !== 201) {
      // const data = await response.json();
      console.log({status:response.status, message:response.message});
      return {error:"Error in fetching developers", isLoading:false};
    }
    else {
      const data = await response.json();
      console.log(data)
      setDevelopers(data.developers)
    }
  } catch (error) {
    console.log(error);
    return {error:"Could not fetch developers", isLoading:false}
  }
}


  return (
    <Form.Select aria-label="Default select example">
      <option>Select developer</option>
      {developers.map((developer) => 
        <option key={developer.id} value={developer._id} >{developer.name+" "+developer.surname}</option> 
      )}
    </Form.Select>
  );
}

export default SelectDeveloper;
