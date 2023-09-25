type Env = 'dev' | 'sit' | 'uat' | 'gz-uat' | 'wh-uat' | 'prod' | 'gz-prod' | 'wh-prod';
declare const useEnv: () => Env;
export default useEnv;
