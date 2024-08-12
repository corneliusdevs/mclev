export const inDevEnvironment = !!process && process.env.NODE_ENV === 'development';
export const isRunningInKubernates = !!process && process.env.NEXT_PUBLIC_IS_RUNNING_IN_KUBERNATES === 'true';