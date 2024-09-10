import classes from './style.module.scss';
import FilterRow from "@/components/molecules/FilterRow/FilterRow";
import Item, {TeamItem} from "@/components/molecules/OurTeam/Item/Item";
import cn from "classnames";
import { motion } from 'framer-motion';

export default function List({data}: {data: TeamItem[]}) {
    return <div className={cn('container')}>
        <FilterRow/>
            <div className={cn(classes.List)}>
                {data.map(item => <Item key={item.id} {...item} />)}
            </div>
    </div>
}
