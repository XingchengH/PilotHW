export default function UserProfile() {
  return (
    <div>
      <h2>Edit Profile</h2>
      <form>
        <input className="form-control mb-2" placeholder="Username" />
        <input className="form-control mb-2" placeholder="Email" />
        <input
          className="form-control mb-2"
          type="password"
          placeholder="Password"
        />
        <button className="btn btn-success">Save</button>
      </form>
    </div>
  );
}
