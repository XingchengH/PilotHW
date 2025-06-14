export default function Form({formData, handleChange, handleSubmit}) {
  return (
    <form className="container mt-4">
      <fieldset>
        <legend>Adding New User</legend>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            PLEASE ENTER NAME
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            PLEASE ENTER EMAIL
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            PLEASE ENTER PHONE
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="form-control"
            placeholder="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="website" className="form-label">
            PLEASE ENTER WEBSITE
          </label>
          <input
            type="text"
            id="website"
            name="website"
            className="form-control"
            placeholder="website"
            value={formData.website}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </button>
      </fieldset>
    </form>
  );
}
