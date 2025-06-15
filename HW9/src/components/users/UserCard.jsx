export default function UserCard({ name, email, phone, website, loading = false }) {
  return (
    <div className="card col-md-5 mx-auto my-1 shadow" aria-hidden={loading}>
      <div className={`card-body ${loading ? 'placeholder-glow' : ''}`}>
        <h5 className="card-title">
          {loading ? <span className="placeholder col-6"></span> : name}
        </h5>
        <p className="card-text">
          {loading ? (
            <>
              <span className="placeholder col-5"></span>
              <span className="placeholder col-10"></span>
              <span className="placeholder col-7"></span>
            </>
          ) : (
            <>
              {email}
              <br />
              {phone}
              <br />
              {website}
            </>
          )}
        </p>
      </div>
    </div>
  );
}
