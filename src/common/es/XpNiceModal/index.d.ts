import React from 'react';
import type { XpModalProps } from '../XpModal';
interface XpNiceModalProps extends XpModalProps {
    /**
     * @description nice-modal的id，确保全局唯一
     */
    id: string;
}
declare const _default: React.NamedExoticComponent<XpNiceModalProps & import("@ebay/nice-modal-react").NiceModalHocProps>;
export default _default;
export { useModal } from '@ebay/nice-modal-react';
