export default function UserCardWay2({ name2, email2, phone2, website2, loading = false }) {
  return (
    <div className="card col-md-5 offset-md-1 mb-3" aria-hidden={loading}>
      <div className={`card-body ${loading ? 'placeholder-glow' : ''}`}>
        <h5 className="card-title">
          {loading ? <span className="placeholder col-6"></span> : name2}
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
              {email2}
              <br />
              {phone2}
              <br />
              {website2}
            </>
          )}
        </p>
      </div>
    </div>
  );
}
