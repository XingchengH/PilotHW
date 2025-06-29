export default function UserProfile() {
  return (
    <div className="container mt-5">
      <h2 className="text-center py-2">Edit Profile</h2>
      <form className="w-50 mx-auto">
        <input className="form-control mb-2" placeholder="Username" />
        <input className="form-control mb-2" placeholder="Email" />
        <input
          className="form-control mb-2"
          type="password"
          placeholder="Password"
        />
        <div className="d-grid">
          <button className="btn btn-success">Save</button>
        </div>
      </form>
    </div>
  );
}
