const Status = ({ title, color }) => (
  <div className="d-flex align-items-center">
    <div
      style={{
        height: "10px",
        width: "10px",
        borderRadius: "50%",
        backgroundColor: color,
        marginRight: "10px",
      }}
    />
    <p style={{ margin: 0, marginRight: "20px" }}>{title}</p>
  </div>
);

export default Status;
