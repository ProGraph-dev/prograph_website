import classes from './style.module.scss';
import Item, {ITeamItem} from "@/components/molecules/OurTeam/Item/Item";
import cn from "classnames";

export default function List({data}: {data: ITeamItem[]}) {
    return <div className={cn('container', 'container_content')}>
            <div className={cn(classes.List)}>
                {data.map(item => <Item key={item.id} {...item} />)}
            </div>
    </div>
}
