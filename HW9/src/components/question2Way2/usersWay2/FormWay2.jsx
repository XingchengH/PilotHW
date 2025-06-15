import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/Context";


export default function FormWay2() {
  const {formData2, handleChange2, handleSubmit2} = useContext(UserContext);

  const navigate = useNavigate();  

  async function onSubmit(e) {
    e.preventDefault();
    await handleSubmit2(e);
    navigate("/usersway2");
  }

  return (
    <form className="container mt-4" onSubmit={onSubmit}>
      <fieldset>
        <legend>Adding New User</legend>
        <div className="mb-3">
          <label htmlFor="name2" className="form-label">
            PLEASE ENTER NAME
          </label>
          <input
            type="text"
            id="name2"
            name="name"
            className="form-control"
            placeholder="name"
            value={formData2.name2}
            onChange={handleChange2}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email2" className="form-label">
            PLEASE ENTER EMAIL
          </label>
          <input
            type="email"
            id="email2"
            name="email"
            className="form-control"
            placeholder="email"
            value={formData2.email2}
            onChange={handleChange2}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone2" className="form-label">
            PLEASE ENTER PHONE
          </label>
          <input
            type="text"
            id="phone2"
            name="phone"
            className="form-control"
            placeholder="phone"
            value={formData2.phone2}
            onChange={handleChange2}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="website2" className="form-label">
            PLEASE ENTER WEBSITE
          </label>
          <input
            type="text"
            id="website2"
            name="website"
            className="form-control"
            placeholder="website"
            value={formData2.website2}
            onChange={handleChange2}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </fieldset>
    </form>
  );
}
