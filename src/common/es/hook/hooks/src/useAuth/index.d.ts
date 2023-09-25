export type TResourceType = {
    id?: string;
    parentResourceId?: string | null | undefined;
    resourceType: string | number;
    path: string;
    name?: string;
    microApp?: string;
    isMenu: string;
    shouldTab: string;
    isSysResource: string | number;
    isHidden: boolean | number;
    isKeepAlive: string | number;
    appId?: string;
    permission: string | number;
    buttonList?: TResourceType[];
    children?: TResourceType[];
};
declare const useAuth: () => {
    auth: (permissionCode?: string) => boolean;
};
export default useAuth;
