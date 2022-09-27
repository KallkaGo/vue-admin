import { useStore } from "@/store";

/* 判断有没有权限 */
export function permission(pageName: string, handleName: string) {
    const store = useStore()
    const permission = store.state.login.permission
    const verifyPermission = `system:${pageName}:${handleName}`
    return !!permission.find((item) => item === verifyPermission)
}