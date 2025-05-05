import VerticalTitle from '@/components/atoms/VerticalTitle/VerticalTitle';
import ImageViewer360 from '@/components/atoms/ImageViewer360/ImageViewer360';
import classes from './style.module.scss';

export interface ITeam360SectionProps {
    title: string;
    imageUrl: string;
}

export default function Team360Section({ title, imageUrl }: ITeam360SectionProps) {
    return (
        <div className={classes.team360Section}>
            <div className={classes.team360Section__content}>
                <ImageViewer360 imageUrl={imageUrl} />
            </div>
            <VerticalTitle title={title} position="right" />
        </div>
    );
}