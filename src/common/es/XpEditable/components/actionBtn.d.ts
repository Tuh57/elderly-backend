import React from 'react';
interface Props {
    id: string;
    linkText?: string;
    isAdd?: boolean;
}
/**
 * 几个默认按钮
 */
declare const EditBtn: ({ id, linkText }: Props) => React.JSX.Element;
declare const DeleteBtn: ({ id, linkText }: Props) => React.JSX.Element;
declare const SaveBtn: ({ id, linkText, isAdd }: Props) => React.JSX.Element;
declare const CancelBtn: ({ id, linkText, isAdd }: Props) => React.JSX.Element;
export { EditBtn, DeleteBtn, SaveBtn, CancelBtn };
