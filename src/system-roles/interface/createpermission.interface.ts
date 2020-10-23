import { permission } from "../enum/permission.enum";

export interface CreatePermission {
    moduleId: string | number;
    access: permission[]
}