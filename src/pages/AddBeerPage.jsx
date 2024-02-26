import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

function AddBeerPage() {
  // State variables to store the values of the form inputs. You can leave these as they are.
  const [newBeer, setNewBeer] = useState({
    name: "",
    tagline: "",
    description: "",
    imageUrl: "",
    firstBrewed: "",
    brewersTips: "",
    attenuationLevel: 0,
    contributedBy: ""
  });
  const [isLoading, setIsLoading] = useState(false)


  // Handler functions for the form inputs. You can leave these as they are.

  const handleFormChange = (e) => {
    setNewBeer({
      ...newBeer,
      [e.target.name]: e.target.value
    })
  }

  const navigate = useNavigate();

  // TASK:
  // 1. Create a function to handle the form submission and send the form data to the Beers API to create a new beer.
  // 2. Use axios to make a POST request to the Beers API.
  // 3. Once the beer is created, navigate the user to the page showing the list of all beers.

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setIsLoading(true)
      const postResponse = await axios.post("https://ih-beers-api2.herokuapp.com/beers/new", newBeer)
      console.log(postResponse);
      setIsLoading(false)

      navigate("/")

    } catch (error) {
      console.log(error);
      setIsLoading(true)
    }

    setNewBeer({
      name: "",
      tagline: "",
      description: "",
      imageUrl: "",
      firstBrewed: "",
      brewersTips: "",
      attenuationLevel: 0,
      contributedBy: ""
    })
  }



  if (isLoading) return <p>Loading...</p>

  // Structure and the content of the page showing the form for adding a new beer. You can leave this as it is.
  return (
    <>
      <div className="d-inline-flex flex-column w-100 p-4">
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            className="form-control mb-4"
            type="text"
            name="name"
            placeholder="Beer Name"
            value={newBeer.name}
            onChange={handleFormChange}
          />
          <label>Tagline</label>
          <input
            className="form-control mb-4"
            type="text"
            name="tagline"
            placeholder="Beer Tagline"
            value={newBeer.tagline}
            onChange={handleFormChange}
          />

          <label className="form-label">Description</label>
          <textarea
            className="form-control mb-4"
            type="text"
            name="description"
            placeholder="Description"
            rows="3"
            value={newBeer.description}
            onChange={handleFormChange}
          ></textarea>

          <label>Image</label>
          <input
            className="form-control mb-4"
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={newBeer.imageUrl}
            onChange={handleFormChange}
          />

          <label>First Brewed</label>
          <input
            className="form-control mb-4"
            type="text"
            name="firstBrewed"
            placeholder="Date - MM/YYYY"
            value={newBeer.firstBrewed}
            onChange={handleFormChange}
          />

          <label>Brewer Tips</label>
          <input
            className="form-control mb-4"
            type="text"
            name="brewersTips"
            placeholder="..."
            value={newBeer.brewersTips}
            onChange={handleFormChange}
          />

          <label>Attenuation Level</label>
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                %
              </span>
            </div>
            <input
              className="form-control mb-4"
              type="number"
              name="attenuationLevel"
              value={newBeer.attenuationLevel}
              onChange={handleFormChange}
              min={0}
              max={100}
            />
          </div>

          <label>Contributed By</label>
          <input
            className="form-control mb-4"
            type="text"
            name="contributedBy"
            placeholder="Contributed by"
            value={newBeer.contributedBy}
            onChange={handleFormChange}
          />
          <button className="btn btn-primary btn-round">Add Beer</button>
        </form>
      </div>
    </>
  );
}

export default AddBeerPage;
