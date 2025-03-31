import classes from './style.module.scss';

interface HistoryItem {
  id: number;
  name: string;
  date: string;
  price: string;
}

interface ProjectHistoryProps {
  history: HistoryItem[];
}

export default function ProjectHistory({ history }: ProjectHistoryProps) {
  return (
    <div className={classes.projectHistory}>
      <h2 className={classes.projectHistory__title}>History</h2>
      
      <div className={classes.projectHistory__table}>
        <div className={classes.projectHistory__header}>
          <div className={classes.projectHistory__headerCell}>Name</div>
          <div className={classes.projectHistory__headerCell}>Date</div>
          <div className={classes.projectHistory__headerCell}>Price</div>
        </div>
        
        {history.map((item, index) => (
          <div key={item.id} className={classes.projectHistory__row}>
            <div className={classes.projectHistory__cell}>
              <span className={classes.projectHistory__index}>{index + 1}.</span>
              {item.name}
            </div>
            <div className={classes.projectHistory__cell}>{item.date}</div>
            <div className={classes.projectHistory__cell}>{item.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}