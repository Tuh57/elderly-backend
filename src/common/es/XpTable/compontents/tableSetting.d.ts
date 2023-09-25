import React from 'react';
import type { XpTableColumnType } from '../index';
declare const TableSetting: ({ columns, setCustomColumns, onColumnChange }: {
    columns: XpTableColumnType[];
    setCustomColumns: (data: any) => void;
    onColumnChange?: ((columns: XpTableColumnType[]) => void) | undefined;
}) => React.JSX.Element;
export default TableSetting;
