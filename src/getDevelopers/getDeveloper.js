
const allDevelopers = []

const fetchDevelopers = async () => {
  const baseUrl = "http://localhost:3001"
  try {
    const response = await fetch(baseUrl + "/users/developers", {
      method: "GET",
      headers: { 
        "authorization": localStorage.getItem("MyToken"),
      }})
    if (response.status !== 200) {
      // const data = await response.json();
      console.log({status:response.status, message:response.message});
      return {error:"Error in fetching developers", isLoading:false};
    }
    else {
      const data = await response.json();
      allDevelopers = data.developers;
    }
  } catch (error) {
    console.log(error);
    return {error:"Could not fetch developers", isLoading:false}
  }
}

export default allDevelopers;