import React from 'react';
interface Props {
    dataSource: any[];
    dragConfig?: {
        dragSortKey: string;
        onDragSortEnd: ({ oldIndex, newIndex }: {
            oldIndex: number;
            newIndex: number;
        }) => void;
    };
}
declare const useDragTable: ({ dataSource, dragConfig }: Props) => {
    dragComponents?: undefined;
} | {
    dragComponents: {
        body: {
            wrapper: (props: any) => React.JSX.Element;
            row: ({ ...props }: any) => React.JSX.Element;
            cell: ({ onMouseEnter, onMouseLeave, ...restProps }: any) => React.JSX.Element;
        };
    };
};
export default useDragTable;
