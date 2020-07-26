import routes from '../../../AppRouting.Module';
import { RouteList } from './routeInterface';


class RouteGenerator {
    private static routelist: Array<RouteList> = [];

    public static getRoute(): any {
        return this.generate(routes);
    }

    private static generate(primaryRouteList: Array<any>, initPath?: string): Array<RouteList> {

        primaryRouteList.forEach((route) => {
            if (route.children === undefined) {
                if (initPath == null) {
                    this.routelist.push(route)
                } else {
                    route.path = route.path !== '/' ? initPath + route.path : initPath
                    this.routelist.push(route);
                }
            }
            else {
                initPath !== undefined ? this.generate(route.children, initPath + route.path) :
                    this.generate(route.children, route.path);
            }
        })
        return this.routelist
    }
}
export default RouteGenerator