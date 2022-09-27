import { RouteRecordRaw } from 'vue-router'

type breadcrumbType = {
    name: string;
    path?: string;
};

let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {

    const routes: RouteRecordRaw[] = []
    //    1.加载所有的路由

    const allRoutes: RouteRecordRaw[] = []
    const routeFiles = require.context('../router/main', true, /\.ts/)

    console.log(routeFiles.keys());

    routeFiles.keys().forEach((key) => {

        const routes = require('../router/main' + key.split('.')[1])

        allRoutes.push(routes.default)


    })
    //2.建立映射
    const recurse = (menu: any[]) => {
        for (let item of menu) {
            if (item.type == 2) {
                const route = allRoutes.find((obj) => item.url === obj.path)
                if (route) {
                    routes.push(route)
                }
                if (!firstMenu) {
                    firstMenu = item
                }
            } else {
                recurse(item.children)
            }

        }
    }

    recurse(userMenus)
    return routes

}

export function pathMaptoMenu(userMenus: any[], currentPath: string, breadcrumb?: Array<breadcrumbType>): any {
    for (const menu of userMenus) {

        if (menu.type === 1) {
            const findmenu = pathMaptoMenu(menu.children ?? [], currentPath)
            if (findmenu) {
                breadcrumb?.push({ name: menu.name })
                breadcrumb?.push({ name: findmenu.name })
                return findmenu
            }
        } else if (menu.type === 2 && menu.url == currentPath) {

            return menu
        }
    }
}


export function pathMapBreadcrumb(userMenus: any[], currentPath: string) {
    const breadcrumb: Array<breadcrumbType> = []
    pathMaptoMenu(userMenus, currentPath, breadcrumb)
    return breadcrumb

}

//获取权限
export function mapMenusToPermission(userMenus: any[]) {
    const permission: string[] = []

    const recurseGetpermission = (menus: any[]) => {
        for (const item of menus) {
            if (item.type == 1 || item.type == 2) {
                recurseGetpermission(item.children ?? [])
            } else if (item.type == 3) {
                permission.push(item.permission)
            }
        }
    }
    recurseGetpermission(userMenus)
    return permission
}


export function getMenucheck(menuList: any[]) {
    const leafKeys: any[] = []
    const recurseLeafKeys = (menuList:any[]) => {
        for (const item of menuList) {
           
            if (item.children) {
                recurseLeafKeys(item.children)
            } else {
                leafKeys.push(item.id)
            }
        }
    }
    recurseLeafKeys(menuList)
    return leafKeys
}

export { firstMenu }