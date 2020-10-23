import { CreatePermission } from "../interface/createpermission.interface";



export class createRoleDTO {

    code: string;
    description: string;
    permission: CreatePermission[]
}