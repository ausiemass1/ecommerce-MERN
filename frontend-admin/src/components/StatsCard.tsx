
interface Props {
    title: string;
    value: string | number;
  }
  
  const StatsCard = ({ title, value }: Props) => {
    return (
      <div className="card blue-grey lighten-5">
        <div className="card-content center">
          <span className="card-title">{title}</span>
          <h5>{value}</h5>
        </div>
      </div>
    );
  };
  
  export default StatsCard;
  